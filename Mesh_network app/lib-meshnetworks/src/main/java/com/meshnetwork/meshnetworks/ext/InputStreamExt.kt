package com.meshnetwork.meshnetworks.ext

import com.meshnetwork.meshnetworks.vnet.VirtualPacket
import com.meshnetwork.meshnetworks.vnet.VirtualPacketHeader
import com.meshnetwork.meshnetworks.vnet.socket.ChainSocketInitRequest
import com.meshnetwork.meshnetworks.vnet.socket.ChainSocketInitResponse
import java.io.IOException
import java.io.InputStream
import java.io.OutputStream
import java.nio.ByteBuffer

/**
 * Attempt to read exactly the given number of bytes. Read() may read zero to len bytes each time it
 * is invoked.
 *
 * This function will attempt to read exactly the given number of bytes. The number of bytes read
 * will only be less than len if the end of stream is reached
 */
fun InputStream.readExactly(b: ByteArray, offset: Int, len: Int): Int {
    var currentOffset = offset
    var lenRemaining = len

    var bytesRead = 0
    while(lenRemaining > 0 && read(b, currentOffset, lenRemaining).also { bytesRead = it } != -1) {
        currentOffset += bytesRead
        lenRemaining -= bytesRead
    }

    return bytesRead
}

/**
 * CopyTo with a progress function, returns the total number of bytes copied.
 */
fun InputStream.copyToWithProgressCallback(
    out: OutputStream,
    bufSize: Int = 8192,
    onProgress: ((Long) -> Unit)? = null,
): Long {
    val buf = ByteArray(bufSize)
    var bytesRead: Int
    var totalCopied = 0L
    while(read(buf).also { bytesRead = it } != -1) {
        out.write(buf, 0, bytesRead)
        totalCopied += bytesRead
        onProgress?.invoke(totalCopied)
    }

    return totalCopied
}
fun InputStream.readExactlyOrThrow(b: ByteArray, offset: Int, len: Int) {
    val bytesRead = readExactly(b, offset, len)
    if(bytesRead != len)
        throw IOException("Read only or throw: could not read $len bytes (read $bytesRead)")
}

fun InputStream.readByteArrayOfSize(size: Int): ByteArray? {
    val byteArray = ByteArray(size)
    val bytesRead = readExactly(byteArray, 0, size)
    return if(bytesRead == size)
        byteArray
    else
        null
}

fun InputStream.readyByteArrayOfSizeOrThrow(size: Int) : ByteArray{
    return readByteArrayOfSize(size) ?: throw IOException("Could not read requested $size bytes")
}

fun InputStream.readRemoteAddress() : Int{
    val addressArray = readByteArrayOfSize(4) ?: throw IOException("readRemoteAddress: Could not read 4 bytes")

    val byteBuffer = ByteBuffer.wrap(addressArray)
    val address = byteBuffer.getInt()
    return address
}

/**
 * Read a Virtual Packet from the receiver InputStream. Will read the packet data into the given
 * buffer, which will be returned as part of the virtualpacket.
 */
fun InputStream.readVirtualPacket(
    buffer: ByteArray,
    offset: Int,
) : VirtualPacket? {
    //Read header bytes into the buffer
    val headerBytesRead = readExactly(buffer, offset, VirtualPacketHeader.HEADER_SIZE)

    if(headerBytesRead != VirtualPacketHeader.HEADER_SIZE)
        return null

    val packetHeader = VirtualPacketHeader.fromBytes(buffer, offset)

    readExactlyOrThrow(
        b = buffer,
        offset = offset + VirtualPacketHeader.HEADER_SIZE,
        len = packetHeader.payloadSize
    )


    return VirtualPacket.fromHeaderAndPayloadData(
        header = packetHeader,
        data = buffer,
        payloadOffset = offset + VirtualPacketHeader.HEADER_SIZE,
        headerAlreadyInData = true,
    )
}

fun InputStream.readChainInitResponse() : ChainSocketInitResponse {
    return ChainSocketInitResponse.fromBytes(
        readyByteArrayOfSizeOrThrow(ChainSocketInitResponse.MESSAGE_SIZE), 0
    )
}

fun InputStream.readChainSocketInitRequest(): ChainSocketInitRequest {
    return ChainSocketInitRequest.fromBytes(
        readyByteArrayOfSizeOrThrow(ChainSocketInitRequest.MESSAGE_SIZE)
    )
}
