package com.meshnetwork.meshnetworks.vnet.wifi

import com.meshnetwork.meshnetworks.vnet.wifi.state.meshnetworksWifiState
import kotlinx.coroutines.flow.Flow


interface meshnetworksWifiManager {

    val state: Flow<meshnetworksWifiState>

    val is5GhzSupported: Boolean

    suspend fun requestHotspot(
        requestMessageId: Int,
        request: LocalHotspotRequest
    ): LocalHotspotResponse

    suspend fun deactivateHotspot()


    suspend fun connectToHotspot(
        config: WifiConnectConfig,
        timeout: Long = 90_000,
    )

}