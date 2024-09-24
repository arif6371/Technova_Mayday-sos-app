package com.meshnetwork.meshnetworks.test

import com.meshnetwork.meshnetworks.writeRandomData
import org.junit.rules.TemporaryFolder
import java.io.File

fun TemporaryFolder.newFileWithRandomData(size: Int, name: String? = null): File {
    val file = if(name != null){
        newFile(name)
    }else {
        newFile()
    }

    file.writeRandomData(size)

    return file
}