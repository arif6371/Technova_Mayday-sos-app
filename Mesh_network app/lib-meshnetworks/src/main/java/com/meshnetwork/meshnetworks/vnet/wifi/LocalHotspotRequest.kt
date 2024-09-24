package com.meshnetwork.meshnetworks.vnet.wifi

data class LocalHotspotRequest(
    val preferredBand: ConnectBand,
    val preferredType: HotspotType,
) {
}