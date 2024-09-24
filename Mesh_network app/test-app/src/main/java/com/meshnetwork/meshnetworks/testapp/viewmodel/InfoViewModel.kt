package com.meshnetwork.meshnetworks.testapp.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.meshnetwork.meshnetworks.log.MNetLogger
import com.meshnetwork.meshnetworks.log.LogLine
import com.meshnetwork.meshnetworks.testapp.MNetLoggerAndroid
import com.meshnetwork.meshnetworks.testapp.appstate.AppUiState
import com.meshnetwork.meshnetworks.testapp.appstate.FabState
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.kodein.di.DI
import org.kodein.di.direct
import org.kodein.di.instance

data class InfoUiState(
    val recentLogs: List<LogLine> = emptyList(),
    val appUiState: AppUiState = AppUiState(),
)

class InfoViewModel(
    di: DI
) : ViewModel(){

    private val _uiState = MutableStateFlow(InfoUiState())

    val uiState: Flow<InfoUiState> = _uiState.asStateFlow()

    private val loggerAndroid: MNetLoggerAndroid = di.direct.instance<MNetLogger>() as MNetLoggerAndroid

    init {
        _uiState.update {prev ->
            prev.copy(
                appUiState = AppUiState(
                    title = "Info",
                    fabState = FabState(visible = false),
                )
            )
        }

        viewModelScope.launch {
            loggerAndroid.recentLogs.collect {
                _uiState.update { prev ->
                    prev.copy(
                        recentLogs = it
                    )
                }
            }
        }
    }

}