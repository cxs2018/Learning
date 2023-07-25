package com.cuixuesen.helloworld.ui

//interface Result
//class Success(val msg: String): com.cuixuesen.helloworld.ui.Result
//class Failure(val error: java.lang.Exception): com.cuixuesen.helloworld.ui.Result
//
//fun getResultMsg(result: Result) = when(result) {
//    is Success -> result.msg
//    is Failure -> result.error.message
//    else -> throw IllegalArgumentException()
//}

sealed class Result2
class Success2(val msg: String): com.cuixuesen.helloworld.ui.Result2()
class Failure2(val error: java.lang.Exception): com.cuixuesen.helloworld.ui.Result2()

fun getResultMsg2(result: com.cuixuesen.helloworld.ui.Result2) = when(result) {
    is Success2 -> result.msg
    is Failure2 -> "Error is ${result.error.message}"
}
// 当在when语句中传入一个密封类变量作为条件时，kotlin编译器会自动检查该密封类有哪些子类，并强制要求你将每一个子类对应的条件全部处理
// 密封类及其子类只能定义在同一个文件的顶层位置，不能嵌套在其他类中，这是被密封类底层的实现机制所限制的