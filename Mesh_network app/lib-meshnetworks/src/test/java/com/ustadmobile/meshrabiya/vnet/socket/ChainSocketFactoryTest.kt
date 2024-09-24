package com.meshnetwork.meshnetworks.vnet.socket

import com.meshnetwork.meshnetworks.ext.addressToByteArray
import com.meshnetwork.meshnetworks.ext.readChainSocketInitRequest
import com.meshnetwork.meshnetworks.ext.writeChainSocketInitResponse
import com.meshnetwork.meshnetworks.log.MNetLoggerStdout
import com.meshnetwork.meshnetworks.test.FileEchoSocketServer
import com.meshnetwork.meshnetworks.test.assertFileContentsAreEqual
import com.meshnetwork.meshnetworks.vnet.VirtualRouter
import com.meshnetwork.meshnetworks.vnet.randomApipaAddr
import com.meshnetwork.meshnetworks.writeRandomData
import org.junit.Assert
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import org.mockito.kotlin.any
import org.mockito.kotlin.mock
import org.mockito.kotlin.stub
import java.io.File
import java.io.FileOutputStream
import java.net.InetAddress
import java.net.ServerSocket
import java.net.Socket
import java.util.concurrent.CompletableFuture

class ChainSocketFactoryTest {

    @JvmField
    @field:Rule
    val tmpFolder = TemporaryFolder()

    private val logger = MNetLoggerStdout()

    fun Socket.readToFile(file: File) {
        getInputStream().use {socketIn ->
            FileOutputStream(file).use { fileOut ->
                socketIn.copyTo(fileOut)
            }
        }
    }

    fun createMockVirtualRouter(
        localNodeAddr: Int = randomApipaAddr(),
        prefixLength: Int = 16,
    ): VirtualRouter {
        return mock {
            on { address }.thenReturn (
                InetAddress.getByAddress(localNodeAddr.addressToByteArray())
            )
            on { networkPrefixLength }.thenReturn(prefixLength)
        }
    }

    @Test
    fun givenNextHopIsFinalDest_whenCreateSocketCalled_thenSocketConnects() {
        val randomDat = tmpFolder.newFile()
        randomDat.writeRandomData(1024 * 1024) //1MB

        val serverSocket = FileEchoSocketServer(randomDat, 0)

        val router: VirtualRouter = createMockVirtualRouter()
        router.stub {
            on {
                lookupNextHopForChainSocket(any(), any())
            }.thenAnswer {
                val port = it.arguments[1] as Int
                ChainSocketNextHop(InetAddress.getByName("127.0.0.1"), port, true, null)
            }
        }

        val destAddr = InetAddress.getByAddress(randomApipaAddr().addressToByteArray())

        val chainSocketFactory = ChainSocketFactoryImpl(router, logger = logger)
        val clientSocket = chainSocketFactory.createSocket(
            destAddr, serverSocket.localPort
        )

        val savedFile = tmpFolder.newFile()
        clientSocket.readToFile(savedFile)
        assertFileContentsAreEqual(randomDat, savedFile)
    }

    @Test
    fun givenNextHopIsNotFinalDest_whenSocketCreated_thenWillConnectAndWriteInitRequest() {
        val initResponseSocketServer = ServerSocket(0)
        val router: VirtualRouter = createMockVirtualRouter()
        val destAddr = InetAddress.getByAddress(randomApipaAddr().addressToByteArray())

        router.stub {
            on {
                lookupNextHopForChainSocket(any(), any())
            }.thenAnswer {
                ChainSocketNextHop(
                    InetAddress.getByName("127.0.0.1"), initResponseSocketServer.localPort, false, null
                )
            }
        }

        val serverResponsePayload = "Hello World".encodeToByteArray()

        val initChainRequest = CompletableFuture<ChainSocketInitRequest>()
        Thread {
            val acceptedSocket = initResponseSocketServer.accept()
            val initRequest = acceptedSocket.getInputStream().readChainSocketInitRequest()
            acceptedSocket.getOutputStream().writeChainSocketInitResponse(ChainSocketInitResponse(200))
            acceptedSocket.getOutputStream().write(serverResponsePayload)
            acceptedSocket.close()
            initChainRequest.complete(initRequest)
        }.start()

        val socketFactory = ChainSocketFactoryImpl(router, logger = logger)
        val destPort = 1042
        val chainSocket = socketFactory.createSocket(
            destAddr, destPort
        )

        val chainResponse = chainSocket.getInputStream().readBytes()
        chainSocket.close()

        val initRequest = initChainRequest.get()

        Assert.assertEquals(destAddr, initRequest.virtualDestAddr)
        Assert.assertEquals(destPort, initRequest.virtualDestPort)
        Assert.assertArrayEquals(serverResponsePayload, chainResponse)
    }

}