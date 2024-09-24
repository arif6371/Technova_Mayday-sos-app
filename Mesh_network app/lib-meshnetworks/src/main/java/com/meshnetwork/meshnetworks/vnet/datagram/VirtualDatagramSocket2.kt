package com.meshnetwork.meshnetworks.vnet.datagram

import com.meshnetwork.meshnetworks.log.MNetLogger
import com.meshnetwork.meshnetworks.vnet.VirtualRouter
import java.net.DatagramSocket

/**
 * Thin wrapper required so that we can access the protected constructor specifying the impl class
 */
class VirtualDatagramSocket2(
    router: VirtualRouter,
    localVirtualAddress: Int,
    logger: MNetLogger,
): DatagramSocket(VirtualDatagramSocketImpl(
    router = router,
    localVirtualAddress = localVirtualAddress,
    logger = logger,
))

