package com.meshnetwork.meshnetworks.vnet.socket

import android.util.Log
import com.meshnetwork.meshnetworks.ext.prefixMatches
import com.meshnetwork.meshnetworks.log.MNetLogger
import com.meshnetwork.meshnetworks.vnet.VirtualRouter
import java.net.InetSocketAddress
import java.net.Socket
import java.net.SocketAddress

/**
 * This is a replacement for the no-args Socket constructor, where the destination is not known
 * when the socket is constructed.
 *
 * If the intended address is provided at the time of construction, we can't override the connect
 * function because connect gets called as part of the superclass initialization. At the time of
 * superclass initialization, child class variables (e.g. the virtual router) will not be initialized.
 *
 * It would be possible to use extension functions to adjust the call to super initialization, but
 * it would not be possible to determine if this was the final hop (or not).
 */
class ChainSocket(
    private val virtualRouter: VirtualRouter,
    private val logger: MNetLogger,
): Socket() {

    private val logPrefix = "[ChainSocket for ${virtualRouter.address}]"

    override fun connect(endpoint: SocketAddress, timeout: Int) {
        val endpointInetAddr = endpoint as? InetSocketAddress
        val address = endpointInetAddr?.address
        if(
            address?.prefixMatches(
                virtualRouter.networkPrefixLength, virtualRouter.address
            ) == true
        ) {
            val nextHop = virtualRouter.lookupNextHopForChainSocket(
                endpointInetAddr.address, endpoint.port
            )

            val network = nextHop.network
            if(network != null) {
                logger(Log.DEBUG, "$logPrefix binding socket to network $network to connect to $endpoint")
                network.bindSocket(this)
            }

            try {
                super.connect(InetSocketAddress(nextHop.address, nextHop.port))

                initializeChainIfNotFinalDest(
                    ChainSocketInitRequest(
                        virtualDestAddr = address,
                        virtualDestPort = endpointInetAddr.port,
                        fromAddr = virtualRouter.address
                    ),
                    nextHop
                )
                logger(
                    Log.INFO, "$logPrefix created socket to $address:$port " +
                        "nexthop = ${nextHop.address}:${nextHop.port}")
            }catch(e: Exception) {
                logger(Log.ERROR, "$logPrefix Exception connecting to $endpoint " +
                        "nexthop=${nextHop.address}:${nextHop.port} (finalDest=${nextHop.isFinalDest})", e)
                throw e
            }
        }else {
            super.connect(endpoint, timeout)
        }

    }
}
