package com.meshnetwork.meshnetworks.vnet.wifi.state

import android.net.Network
import com.meshnetwork.meshnetworks.vnet.VirtualNodeDatagramSocket
import com.meshnetwork.meshnetworks.vnet.wifi.WifiConnectConfig

/**
 * The Wifi station state - e.g. the 'client' connection.
 *
 * @param status the current status of station mode as being used by the meshnetworks node
 * @param network the network object for the currently connected station network (if any)
 * @param config the config that we are connected or connecting to for station mode (if any)
 * @param stationBoundSocketsPort the port number for station bound sockets - see meshnetworksWifiManagerAndroid.stationBoundSockets
 */
data class WifiStationState(
    val status: Status = Status.INACTIVE,
    val network: Network? = null,
    val config: WifiConnectConfig? = null,
    val stationBoundSocketsPort: Int = -1,
    val stationBoundDatagramSocket: VirtualNodeDatagramSocket? = null,
) {

    enum class Status {
        INACTIVE, CONNECTING, AVAILABLE, UNAVAILABLE, LOST;

        companion object {

            val FAIL_STATES = listOf(UNAVAILABLE, LOST)
        }
    }



}