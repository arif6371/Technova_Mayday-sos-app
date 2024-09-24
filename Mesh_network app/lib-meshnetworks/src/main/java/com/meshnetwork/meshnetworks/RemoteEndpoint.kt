package com.meshnetwork.meshnetworks

import java.util.UUID

data class RemoteEndpoint(
    val remoteAddress: String,
    val remoteControlUuid: UUID,
)