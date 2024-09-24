package com.meshnetwork.meshnetworks.vnet

import com.meshnetwork.meshnetworks.mmcp.MmcpPong

interface PongListener {

    fun onPongReceived(
        fromNode: Int,
        pong: MmcpPong,
    )

}