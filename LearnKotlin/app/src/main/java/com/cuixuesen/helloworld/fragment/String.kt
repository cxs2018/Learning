package com.cuixuesen.helloworld.fragment

//operator fun String.times(n: Int): String {
//    val builder = StringBuilder()
//    kotlin.repeat(n) {
//        builder.append(this)
//    }
//    return builder.toString()
//}

operator fun String.times(n: Int) = repeat(n)