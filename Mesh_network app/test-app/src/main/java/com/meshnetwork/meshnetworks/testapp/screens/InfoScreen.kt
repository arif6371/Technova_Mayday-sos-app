package com.meshnetwork.meshnetworks.testapp.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ListItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalSavedStateRegistryOwner
import androidx.lifecycle.viewmodel.compose.viewModel
import com.meshnetwork.meshnetworks.meshnetworksConstants
import com.meshnetwork.meshnetworks.log.MNetLogger
import com.meshnetwork.meshnetworks.testapp.MNetLoggerAndroid
import com.meshnetwork.meshnetworks.testapp.ViewModelFactory
import com.meshnetwork.meshnetworks.testapp.appstate.AppUiState
import com.meshnetwork.meshnetworks.testapp.meshnetworksDeviceInfoStr
import com.meshnetwork.meshnetworks.testapp.viewmodel.InfoUiState
import com.meshnetwork.meshnetworks.testapp.viewmodel.InfoViewModel
import org.kodein.di.compose.localDI
import org.kodein.di.instance


@Composable
fun InfoScreen(
    viewModel: InfoViewModel = viewModel(
        factory = ViewModelFactory(
            di = localDI(),
            owner = LocalSavedStateRegistryOwner.current,
            vmFactory = {
                InfoViewModel(it)
            },
            defaultArgs = null,
        )
    ),
    onSetAppUiState: (AppUiState) -> Unit,
    onClickLicenses: () -> Unit = { },
    onClickLogs: () -> Unit = { },
) {
    val uiState by viewModel.uiState.collectAsState(initial = InfoUiState())
    LaunchedEffect(uiState.appUiState) {
        onSetAppUiState(uiState.appUiState)
    }

    InfoScreen(uiState, onClickLicenses, onClickLogs)
}

@Composable
fun InfoScreen(
    uiState: InfoUiState,
    onClickLicenses: () -> Unit,
    onClickLogs: () -> Unit,
) {
    val context = LocalContext.current

    val deviceInfo = remember {
        context.meshnetworksDeviceInfoStr()
    }

    val localDi = localDI()
    val logger: MNetLogger by localDi.instance()
    val androidLogger = logger as MNetLoggerAndroid

    LazyColumn(
        modifier = Modifier.fillMaxSize()
    ) {
        item("copyright") {
            ListItem(
                headlineContent = {
                    Text(text = "meshnetworks - ${meshnetworksConstants.VERSION}")
                },
                supportingContent = {
                    Text("Copyright 2023 meshnetwork FZ-LLC. This software is free and open " +
                            "source, licensed under the LGPLv3.0 license " +
                            "as per https://www.gnu.org/licenses/lgpl-3.0.en.html")
                }
            )
        }

        item("opensourcelicenses") {
            ListItem(
                modifier = Modifier.clickable {
                    onClickLicenses()
                },
                headlineContent = {
                    Text("View open source component licenses")
                }
            )
        }

        item("deviceinfo") {
            ListItem(
                headlineContent = {
                    Text("Device Info")
                },
                supportingContent = {
                    Text(deviceInfo)
                }
            )
        }

        item("logheader") {
            ListItem(
                modifier = Modifier.clickable {
                      onClickLogs()
                },
                headlineContent = {
                    Text("Logs")
                },
            )
        }

        items(
            items = uiState.recentLogs,
            key = { it.lineId }
        ) {
            ListItem(
                headlineContent = {
                    Text(it.toString(androidLogger.epochTime))
                }
            )
        }
    }
}
