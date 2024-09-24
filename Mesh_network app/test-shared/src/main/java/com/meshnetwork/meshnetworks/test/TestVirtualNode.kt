package com.meshnetwork.meshnetworks.test

import com.meshnetwork.meshnetworks.ext.asInetAddress
import com.meshnetwork.meshnetworks.log.MNetLogger
import com.meshnetwork.meshnetworks.log.MNetLoggerStdout
import com.meshnetwork.meshnetworks.vnet.NodeConfig
import com.meshnetwork.meshnetworks.vnet.VirtualNode
import com.meshnetwork.meshnetworks.vnet.randomApipaAddr
import com.meshnetwork.meshnetworks.vnet.wifi.meshnetworksWifiManager
import kotlinx.serialization.json.Json
import org.mockito.kotlin.mock
import java.util.UUID


class TestVirtualNode(
    localNodeAddress: Int = randomApipaAddr(),
    port: Int = 0,
    logger: MNetLogger = MNetLoggerStdout(),
    override val meshnetworksWifiManager: meshnetworksWifiManager = mock { },
    json: Json,
    config: NodeConfig = NodeConfig(maxHops = 5),
) : VirtualNode(
    port = port,
    logger = logger,
    json = json,
    config = config,
    address = localNodeAddress.asInetAddress(),
)
