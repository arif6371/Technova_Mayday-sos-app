package com.meshnetwork.meshnetworks.vnet

import com.meshnetwork.meshnetworks.ext.addressToDotNotation
import com.meshnetwork.meshnetworks.vnet.bluetooth.meshnetworksBluetoothState
import com.meshnetwork.meshnetworks.vnet.wifi.WifiConnectConfig
import kotlinx.serialization.json.Json
import java.net.InetAddress
import java.net.URLDecoder
import com.meshnetwork.meshnetworks.ext.requireAddressAsInt
import java.net.URLEncoder

/**
 *
 */
data class meshnetworksConnectLink(
    val uri: String,
    val virtualAddress: Int,
    val hotspotConfig: WifiConnectConfig?,
    val bluetoothConfig: meshnetworksBluetoothState?
) {

    companion object {

        const val PROTO = "meshnetworks"

        private const val PROTO_PREFIX = "${PROTO}://"

        fun fromComponents(
            nodeAddr: Int,
            port: Int,
            hotspotConfig: WifiConnectConfig?,
            bluetoothConfig: meshnetworksBluetoothState?,
            json: Json,
        ) : meshnetworksConnectLink {
            val uri = buildString {
                append("$PROTO_PREFIX${nodeAddr.addressToDotNotation()}:$port/?")
                if(hotspotConfig != null) {
                    append("hotspot=")
                    append(
                        URLEncoder.encode(json.encodeToString(
                            WifiConnectConfig.serializer(), hotspotConfig
                        ), "UTF-8")
                    )
                }
                if(hotspotConfig != null && bluetoothConfig != null) {
                    append("&")
                }
                if(bluetoothConfig != null) {
                    append("bluetooth=")
                    append(
                        URLEncoder.encode(json.encodeToString(
                            meshnetworksBluetoothState.serializer(), bluetoothConfig
                        ), "UTF-8")
                    )
                }
            }

            return meshnetworksConnectLink(
                uri = uri,
                virtualAddress = nodeAddr,
                hotspotConfig = hotspotConfig,
                bluetoothConfig = bluetoothConfig,
            )
        }

        fun parseUri(
            uri: String,
            json: Json = Json,
        ): meshnetworksConnectLink {
            val uriLowerCase = uri.lowercase()
            if(!uriLowerCase.startsWith(PROTO_PREFIX))
                throw IllegalArgumentException("meshnetworks connect url must start with $PROTO://")

            val addr = uri.substringAfter(PROTO_PREFIX).substringBefore(":")
            val inetAddr = InetAddress.getByName(addr)

            val searchStr = uri.substringAfter("?")
            val searchComponents = searchStr.split('&').map { param ->
                param.split("=", limit = 2).let {
                    Pair(URLDecoder.decode(it[0], "UTF-8"), URLDecoder.decode(it[1], "UTF-8"))
                }
            }.toMap()
            val hotspotConfig = searchComponents["hotspot"]?.let {
                json.decodeFromString(WifiConnectConfig.serializer(), it)
            }

            val bluetoothConfig = searchComponents["bluetooth"]?.let {
                json.decodeFromString(meshnetworksBluetoothState.serializer(), it)
            }

            return meshnetworksConnectLink(
                uri = uri,
                virtualAddress = inetAddr.requireAddressAsInt(),
                hotspotConfig = hotspotConfig,
                bluetoothConfig = bluetoothConfig,
            )
        }

    }

}