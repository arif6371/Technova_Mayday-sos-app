package com.meshnetwork.meshnetworks.vnet

import com.meshnetwork.meshnetworks.vnet.datagram.VirtualDatagramSocketImpl
import com.meshnetwork.meshnetworks.vnet.socket.ChainSocketNextHop
import java.net.DatagramPacket
import java.net.InetAddress

/**
 * Represents the netwrok
 */
interface VirtualRouter {

    val address: InetAddress

    val networkPrefixLength: Int

    /**
     * Route the given incoming packet.
     *
     * @param packet the packet received
     */
    fun route(
        packet: VirtualPacket,
        datagramPacket: DatagramPacket? = null,
        virtualNodeDatagramSocket: VirtualNodeDatagramSocket? = null,
    )

    /**
     * When using chain sockets this function will lookup the next hop for the given virtual
     * address.
     */
    fun lookupNextHopForChainSocket(
        address: InetAddress,
        port: Int,
    ): ChainSocketNextHop

    fun nextMmcpMessageId(): Int

    /**
     * The default datagram socket local port (not bound to any network). Used to send/receive
     * VirtualPackets over the real network.
     */
    val localDatagramPort: Int


    /**
     * Allocate a port on the virtual router
     */
    fun allocateUdpPortOrThrow(
        virtualDatagramSocketImpl: VirtualDatagramSocketImpl,
        portNum: Int
    ): Int

    fun deallocatePort(
        protocol: Protocol,
        portNum: Int
    )


    companion object {



    }

}
