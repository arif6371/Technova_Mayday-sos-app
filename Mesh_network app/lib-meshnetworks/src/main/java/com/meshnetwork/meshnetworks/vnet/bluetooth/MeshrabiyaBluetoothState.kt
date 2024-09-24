package com.meshnetwork.meshnetworks.vnet.bluetooth

import kotlinx.serialization.Serializable

@Serializable
data class meshnetworksBluetoothState(
    val deviceName: String? = null,
) {
}