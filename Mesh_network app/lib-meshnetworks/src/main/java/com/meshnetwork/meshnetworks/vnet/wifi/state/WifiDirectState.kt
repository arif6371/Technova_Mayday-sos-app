package com.meshnetwork.meshnetworks.vnet.wifi.state

import com.meshnetwork.meshnetworks.vnet.wifi.WifiConnectConfig
import com.meshnetwork.meshnetworks.vnet.wifi.HotspotStatus

data class WifiDirectState(
    val hotspotStatus: HotspotStatus = HotspotStatus.STOPPED,
    val error: Int = 0,
    val config: WifiConnectConfig? = null,
) {
}