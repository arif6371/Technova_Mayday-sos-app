package com.meshnetwork.meshnetworks.vnet

import app.cash.turbine.test
import com.meshnetwork.meshnetworks.log.MNetLoggerStdout
import com.meshnetwork.meshnetworks.ext.addressToByteArray
import com.meshnetwork.meshnetworks.ext.addressToDotNotation
import com.meshnetwork.meshnetworks.ext.ip4AddressToInt
import com.meshnetwork.meshnetworks.ext.requireAsIpv6
import com.meshnetwork.meshnetworks.mmcp.MmcpHotspotRequest
import com.meshnetwork.meshnetworks.mmcp.MmcpHotspotResponse
import com.meshnetwork.meshnetworks.mmcp.MmcpMessage
import com.meshnetwork.meshnetworks.mmcp.MmcpPing
import com.meshnetwork.meshnetworks.mmcp.MmcpPong
import com.meshnetwork.meshnetworks.test.EchoDatagramServer
import com.meshnetwork.meshnetworks.test.TestVirtualNode
import com.meshnetwork.meshnetworks.test.assertByteArrayEquals
import com.meshnetwork.meshnetworks.test.connectTo
import com.meshnetwork.meshnetworks.vnet.VirtualPacket.Companion.ADDR_BROADCAST
import com.meshnetwork.meshnetworks.vnet.wifi.WifiConnectConfig
import com.meshnetwork.meshnetworks.vnet.wifi.HotspotType
import com.meshnetwork.meshnetworks.vnet.wifi.meshnetworksWifiManager
import com.meshnetwork.meshnetworks.vnet.wifi.LocalHotspotRequest
import com.meshnetwork.meshnetworks.vnet.wifi.LocalHotspotResponse
import com.meshnetwork.meshnetworks.vnet.wifi.state.meshnetworksWifiState
import com.meshnetwork.meshnetworks.vnet.wifi.HotspotStatus
import com.meshnetwork.meshnetworks.vnet.wifi.state.WifiDirectState
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import org.junit.Assert
import org.junit.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.mockito.kotlin.mock
import org.mockito.kotlin.timeout
import org.mockito.kotlin.verifyBlocking
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.Inet6Address
import java.net.InetAddress
import java.net.InetSocketAddress
import java.util.UUID
import java.util.concurrent.CountDownLatch
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicReference
import kotlin.random.Random
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.seconds

class VirtualNodeTest {


    private val logger = MNetLoggerStdout()

    private val json = Json {
        encodeDefaults = true
    }



}