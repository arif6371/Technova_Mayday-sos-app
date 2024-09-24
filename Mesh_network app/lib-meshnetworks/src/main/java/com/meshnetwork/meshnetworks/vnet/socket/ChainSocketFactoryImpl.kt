package com.meshnetwork.meshnetworks.vnet.socket

import android.util.Log
import com.meshnetwork.meshnetworks.ext.prefixMatches
import com.meshnetwork.meshnetworks.log.MNetLogger
import com.meshnetwork.meshnetworks.vnet.VirtualRouter
import java.net.InetAddress
import java.net.Socket
import javax.net.SocketFactory

class ChainSocketFactoryImpl(
    internal val virtualRouter: VirtualRouter,
    private val systemSocketFactory: SocketFactory = getDefault(),
    private val logger: MNetLogger,
) : ChainSocketFactory() {

    private val logPrefix: String = "[ChainSocketFactoryImpl for ${virtualRouter.address}]"

    private fun createSocketForVirtualAddress(
        address: InetAddress,
        port: Int,
        localAddress: InetAddress? = null,
        localPort: Int? = null
    ) : ChainSocketResult {
        try {
            val nextHop = virtualRouter.lookupNextHopForChainSocket(address, port)
            val socketFactory = nextHop.network?.socketFactory ?: systemSocketFactory
            val socket = if(localAddress != null && localPort != null) {
                socketFactory.createSocket(nextHop.address, nextHop.port, localAddress, localPort)
            }else {
                socketFactory.createSocket(nextHop.address, nextHop.port)
            }

            socket.initializeChainIfNotFinalDest(
                ChainSocketInitRequest(
                    virtualDestAddr = address,
                    virtualDestPort = port,
                    fromAddr = virtualRouter.address
                ),
                nextHop
            )

            logger(Log.INFO, "$logPrefix created socket to $address:$port " +
                    "nexthop = ${nextHop.address}:${nextHop.port}")
            return ChainSocketResult(socket, nextHop)
        }catch(e: Exception) {
            logger(Log.ERROR, "$logPrefix exception creating socket", e)
            throw e
        }
    }

    private fun InetAddress.isVirtualAddress(): Boolean {
        return prefixMatches(virtualRouter.networkPrefixLength, virtualRouter.address)
    }

    override fun createSocket(host: String, port: Int): Socket {
        val address = InetAddress.getByName(host)
        return if(address.isVirtualAddress()) {
            createSocketForVirtualAddress(address, port).socket
        }else {
            systemSocketFactory.createSocket(host, port)
        }
    }

    override fun createSocket(host: String, port: Int, localAddress: InetAddress, localPort: Int): Socket {
        val address = InetAddress.getByName(host)
        return if(address.isVirtualAddress()) {
            createSocketForVirtualAddress(address, port, localAddress, localPort).socket
        }else {
            systemSocketFactory.createSocket(host, port, localAddress, localPort)
        }
    }

    override fun createSocket(address: InetAddress, port: Int): Socket {
        return if(address.isVirtualAddress()) {
            createSocketForVirtualAddress(address, port).socket
        }else {
            systemSocketFactory.createSocket(address, port)
        }
    }

    override fun createSocket(address: InetAddress, port: Int, localAddress: InetAddress, localPort: Int): Socket {
        return if(address.isVirtualAddress()) {
            createSocketForVirtualAddress(address, port, localAddress, localPort).socket
        }else {
            systemSocketFactory.createSocket(address, port, localAddress, localPort)
        }
    }

    override fun createSocket(): Socket {
        return ChainSocket(virtualRouter, logger)
    }

    override fun createChainSocket(address: InetAddress, port: Int): ChainSocketResult {
        return createSocketForVirtualAddress(address, port)
    }
}