package com.meshnetwork.meshnetworks.vnet.datagram

import com.meshnetwork.meshnetworks.vnet.VirtualNode
import java.net.DatagramSocketImpl
import java.net.DatagramSocketImplFactory

class VirtualDatagramSocketImplFactory(
    private val node: VirtualNode,
): DatagramSocketImplFactory {

    override fun createDatagramSocketImpl(): DatagramSocketImpl {

        TODO("Not yet implemented")
    }

}