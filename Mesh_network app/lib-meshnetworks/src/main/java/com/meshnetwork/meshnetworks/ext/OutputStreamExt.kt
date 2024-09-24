package com.meshnetwork.meshnetworks.ext

import com.meshnetwork.meshnetworks.vnet.VirtualPacket
import com.meshnetwork.meshnetworks.vnet.socket.ChainSocketInitRequest
import com.meshnetwork.meshnetworks.vnet.socket.ChainSocketInitResponse
import java.io.OutputStream
import java.nio.ByteBuffer

fun OutputStream.writeAddress(address: Int){
    val buffer = ByteBuffer.wrap(ByteArray(4))
    buffer.putInt(address)
    write(buffer.array())
}

/**
 * Write the given virtual packet to the receiver output stream
 */
fun OutputStream.writeVirtualPacket(packet: VirtualPacket) {
    write(packet.data, packet.dataOffset, packet.datagramPacketSize)
}

fun OutputStream.writeChainSocketInitRequest(request: ChainSocketInitRequest) {
    write(request.toBytes())
}

fun OutputStream.writeChainSocketInitResponse(response: ChainSocketInitResponse) {
    write(response.toBytes())
}
