package com.meshnetwork.meshnetworks.ext

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore

val Context.bssidDataStore: DataStore<Preferences> by preferencesDataStore(name = "bssids")

