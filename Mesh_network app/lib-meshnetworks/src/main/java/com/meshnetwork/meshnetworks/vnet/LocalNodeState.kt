package com.meshnetwork.meshnetworks.vnet

import com.meshnetwork.meshnetworks.vnet.bluetooth.meshnetworksBluetoothState
import com.meshnetwork.meshnetworks.vnet.wifi.state.meshnetworksWifiState

data class LocalNodeState(
    val address: Int = 0,
    val wifiState: meshnetworksWifiState = meshnetworksWifiState(),
    val bluetoothState: meshnetworksBluetoothState = meshnetworksBluetoothState(deviceName = ""),
    val connectUri: String? = null,
    val originatorMessages: Map<Int, VirtualNode.LastOriginatorMessage> = emptyMap(),
) {
}
