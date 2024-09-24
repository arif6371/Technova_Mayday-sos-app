package com.meshnetwork.meshnetworks.vnet.wifi

import com.meshnetwork.meshnetworks.vnet.VirtualNodeDatagramSocket
import java.net.InetAddress

/**
 * Event triggered by the meshnetworksWifiManager when a new connection
 */
data class WifiConnectEvent(
    val neighborPort: Int,
    val neighborInetAddress: InetAddress,
    val socket: VirtualNodeDatagramSocket,
    val neighborVirtualAddress: Int,
)
