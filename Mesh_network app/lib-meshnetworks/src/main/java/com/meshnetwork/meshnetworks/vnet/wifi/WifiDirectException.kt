package com.meshnetwork.meshnetworks.vnet.wifi

class WifiDirectException(
    message: String,
    val wifiDirectFailReason: Int
): Exception(
    message + ": " + WifiDirectError(wifiDirectFailReason).toString()
)
