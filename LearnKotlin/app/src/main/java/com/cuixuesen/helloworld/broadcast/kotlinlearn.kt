package com.cuixuesen.helloworld.broadcast

fun main() {
    val num1 = 100
    val num2 = 80
    val result1 = num1AndNum2(num1, num2, ::plus)
    val result2 = num1AndNum2(num1, num2, ::minus)
    println("result1 is $result1")
    println("result2 is $result2")

    val result3 = num1AndNum2(num1, num2) { n1, n2 ->
        n1 + n2
    }
    println("result3 is $result3")
}

fun num1AndNum2(num1: Int, num2: Int, operation: (Int, Int) -> Int): Int {
    return operation(num1, num2);
}

fun plus(num1: Int, num2: Int): Int {
    return num1 + num2
}

fun minus(num1: Int, num2: Int): Int {
    return num1 - num2
}

fun StringBuilder.build(block: StringBuilder.() -> Unit): StringBuilder {
    block()
    return this
}