package com.meshnetwork.meshnetworks.vnet

import android.net.Network
import android.util.Log
import com.meshnetwork.meshnetworks.log.MNetLogger
import com.meshnetwork.meshnetworks.ext.addressToDotNotation
import java.io.Closeable
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.InetAddress
import java.util.concurrent.ExecutorService
import java.util.concurrent.Future

/**
 *
 * VirtualNodeDatagramSocket listens on the real network interface. It uses the executor service
 * to run a thread that will receive all packets, convert them from a DatagramPacket into a
 * VirtualPacket, and then give them to the VirtualRouter.
 *
 * @param socket - the underlying DatagramSocket to use - this can be bound to a network, interface etc if required
 * neighbor connects.
 * @param boundNetwork The Network object that the DatagramSocket is/will be bound to, if any. This
 *                     is needed if/when we want to establish a TCP connection. Because the
 *                     VirtualNodeDatagramSocket reference is kept as part of the originator message,
 *                     and it is created at the time the network object is available, this is the
 *                     most convenient and logical place to keep this reference.
 */
class VirtualNodeDatagramSocket(
    private val socket: DatagramSocket,
    private val localNodeVirtualAddress: Int,
    ioExecutorService: ExecutorService,
    private val router: VirtualRouter,
    private val logger: MNetLogger,
    name: String? = null,
    val boundNetwork: Network? = null,
):  Runnable, Closeable {

    private val future: Future<*>

    private val logPrefix: String

    val localPort: Int = socket.localPort

    init {
        logPrefix = buildString {
            append("[VirtualNodeDatagramSocket for ${localNodeVirtualAddress.addressToDotNotation()} ")
            if(name != null)
                append("- $name")
            append("] ")
        }
        future = ioExecutorService.submit(this)
    }

    override fun run() {
        val buffer = ByteArray(VirtualPacket.MAX_PAYLOAD_SIZE)
        logger(Log.DEBUG, "$logPrefix Started on ${socket.localPort} waiting for first packet", null)

        while(!Thread.interrupted() && !socket.isClosed) {
            try {
                val rxPacket = DatagramPacket(buffer, 0, buffer.size)
                socket.receive(rxPacket)

                val rxVirtualPacket = VirtualPacket.fromDatagramPacket(rxPacket)
                router.route(
                    packet = rxVirtualPacket,
                    datagramPacket = rxPacket,
                    virtualNodeDatagramSocket = this,
                )
            }catch(e: Exception) {
                if(!socket.isClosed)
                    logger(Log.WARN, "$logPrefix : run : exception handling packet", e)
            }
        }
        logger(Log.DEBUG, "$logPrefix : run : finished")
    }


    /**
     *
     */
    fun send(
        nextHopAddress: InetAddress,
        nextHopPort: Int,
        virtualPacket: VirtualPacket
    ) {
        val datagramPacket = virtualPacket.toDatagramPacket()
        datagramPacket.address = nextHopAddress
        datagramPacket.port = nextHopPort
        socket.send(datagramPacket)
    }

    fun close(closeSocket: Boolean) {
        future.cancel(true)
        socket.takeIf { closeSocket }?.close()
    }

    override fun close() {
        close(false)
    }
}
