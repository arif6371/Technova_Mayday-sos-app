package com.meshnetwork.meshnetworks.mmcp

import com.meshnetwork.meshnetworks.vnet.VirtualPacketHeader

/**
 * Contains the MmcpMessage as received and the packet header (e.g. from/to values etc). The packet
 * header is immutable and therefor won't be affected by any other usage of the underlying data
 * buffer.
 */
data class MmcpMessageAndPacketHeader(
    val message: MmcpMessage,
    val packetHeader: VirtualPacketHeader,
)
