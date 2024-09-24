package com.meshnetwork.meshnetworks.vnet.wifi.state

import com.meshnetwork.meshnetworks.vnet.WifiRole
import com.meshnetwork.meshnetworks.vnet.wifi.WifiConnectConfig
import com.meshnetwork.meshnetworks.vnet.wifi.HotspotStatus
import com.meshnetwork.meshnetworks.vnet.wifi.HotspotType


data class meshnetworksWifiState(
    val wifiRole: WifiRole = WifiRole.NONE,
    val wifiDirectState: WifiDirectState = WifiDirectState(),
    val wifiStationState: WifiStationState = WifiStationState(),
    val localOnlyHotspotState: LocalOnlyHotspotState = LocalOnlyHotspotState(),
    val errorCode: Int = 0,
    val concurrentApStationSupported: Boolean = false,
) {

    /**
     * The configuration that another device should use to connect to this device (if any)
     */
    val connectConfig: WifiConnectConfig?
        get() = wifiDirectState.config ?: localOnlyHotspotState.config

    val hotspotIsStarting: Boolean
        get() = wifiDirectState.hotspotStatus == HotspotStatus.STARTING
                || localOnlyHotspotState.status == HotspotStatus.STARTING

    val hotspotIsStarted: Boolean
        get() = wifiDirectState.hotspotStatus == HotspotStatus.STARTED
                || localOnlyHotspotState.status == HotspotStatus.STARTED

    fun hotspotError(hotspotType: HotspotType) : Int {
        return when(hotspotType) {
            HotspotType.LOCALONLY_HOTSPOT -> localOnlyHotspotState.error
            HotspotType.WIFIDIRECT_GROUP -> wifiDirectState.error
            HotspotType.AUTO -> 0
        }
    }


    /**
     * Determine the type of hotspot that should be created if a request is made to start one.
     * Currently only WifiDirect group is supported.
     */
    val hotspotTypeToCreate: HotspotType?
        get() {
            return if(connectConfig != null)
                //Hotspot already available- nothing to create
                null
            else if(
                //WifiDirect Group or Local Only hotspot already being created, do nothing
                hotspotIsStarting
            ) {
                null
            } else if(concurrentApStationSupported){
                HotspotType.LOCALONLY_HOTSPOT
            }else {
                HotspotType.WIFIDIRECT_GROUP
            }

        }

}
