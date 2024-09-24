package com.meshnetwork.meshnetworks.vnet

import com.meshnetwork.meshnetworks.ext.findLocalInetAddressForDestinationAddress
import com.meshnetwork.meshnetworks.ext.prefixMatches
import com.meshnetwork.meshnetworks.portforward.ReturnPathSocketFactory
import java.lang.IllegalArgumentException
import java.net.DatagramSocket
import java.net.InetAddress

/**
 * Implementation of return path socket factory that can create an IDatagramSocket for the real
 * network or a virtual datagram socket.
 *
 * If a destination is on the real network, then the created socket will be bound to the network
 * interface where the netmask matches the given destination address.
 */
class VirtualNodeReturnPathSocketFactory(
    private val node: VirtualNode,
): ReturnPathSocketFactory {


    override fun createSocket(destAddress: InetAddress, port: Int): DatagramSocket {
        return if(
            destAddress.address.prefixMatches(node.networkPrefixLength, node.address.address)
        ) {
            node.createBoundDatagramSocket(0)
        }else{
            val bindAddress = findLocalInetAddressForDestinationAddress(destAddress)

            return bindAddress?.let { DatagramSocket(0, it) }
                ?: throw IllegalArgumentException("Could not find network interface with subnet " +
                        "mask for dest address $destAddress")
        }
    }

}
