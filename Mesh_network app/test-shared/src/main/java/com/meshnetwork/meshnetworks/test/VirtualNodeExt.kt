package com.meshnetwork.meshnetworks.test

import com.meshnetwork.meshnetworks.vnet.VirtualNode
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import java.net.InetAddress

fun VirtualNode.connectTo(other: VirtualNode, timeout: Long = 5000) {
    addNewNeighborConnection(
        address = InetAddress.getLoopbackAddress(),
        port = other.localDatagramPort,
        neighborNodeVirtualAddr = other.addressAsInt,
        socket = this.datagramSocket
    )

    //wait for connections to be ready
    runBlocking {
        withTimeout(timeout) {
            state.filter { it.originatorMessages.containsKey(other.addressAsInt) }
                .first()

            other.state.filter {
                it.originatorMessages.containsKey(addressAsInt)
            }.first()

        }
    }
}