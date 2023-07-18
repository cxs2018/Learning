package com.cuixuesen.helloworld

import kotlin.math.max

fun main1() {
//    println("Hello Kotlin!")
//    var a: Int = 10
//    a = a * 10
//    println("a = " + a)

    val a = 37
    val b = 40

    fun largerNumber(num1: Int, num2: Int): Int {
        return max(num1, num2)
    }

    fun largerNumberOneline(num1: Int, num2: Int): Int = max(num1, num2)

    fun largerNumberIf(num1: Int, num2: Int): Int {
        var value = 0;
        if (num1 > num2) {
            value = num1
        } else {
            value = num2
        }
        return value
    }

    fun largerNumberIfSimply(num1: Int, num2: Int): Int {
        val value = if (num1 > num2) {
            num1
        } else {
            num2
        }
        return value
    }

    fun largerNumberIfSimplyV2(num1: Int, num2: Int): Int {
        return if (num1 > num2) {
            num1
        } else {
            num2
        }
    }

    fun largerNumberIfSimplyV3(num1: Int, num2: Int): Int = if (num1 > num2) {
        num1
    } else {
        num2
    }

    fun largerNumberIfSimplyV4(num1: Int, num2: Int) = if (num1 > num2) num1 else num2

    val value = largerNumber(a, b)
    println("larger number is " + value)

    fun getScore(name: String) = when (name) {
        "Tom" -> 86
        "Jim" -> 77
        else -> 0
    }

    fun checkNumber(num: Number) {
        when (num) {
            is Int -> println("number is Int")
            is Double -> println("number is Double")
            else -> println("number not support")
        }
    }

    checkNumber(10)
    checkNumber(10.123)
    checkNumber(10L)

    fun getScoreV2(name: String) = when {
        name.startsWith("Tom") -> 86
        name == "Jim" -> 77
        else -> 0
    }

    // 创建两端闭区间
    val range = 0..10

    for (i in range) {
        println(i)
    }

    // 创建单端闭区间
    val range2 = 0 until 10

    for (i in range2) {
        println(i)
    }

    for (i in range2 step 2) {
        println(i)
    }

    val range3 = 10 downTo 1 step 3

    for (i in range3) {
        println(i)
    }
}

fun main() {
    val p = Person()
    p.name = "Jack"
    p.age = 19
    p.eat()

    val s = Student3("cuixuesen", 25)
    println(s)

    val student1 = Student4()

    val student2 = Student4("Jack", 19)

    val student3 = Student4("a123", 5, "Jack", 19)

    val student5 = Student5("cuixuesen", 25)

    // 面向接口编程，也叫多态
    fun doStudy(study: Study?) {
        study?.readBooks()
        study?.doHomework()
        study?.doHomework2()
    }

    doStudy(null)

    val cellphone1 = Cellphone("cuixuesen", 12.2)
    val cellphone2 = Cellphone("cuixuesen", 12.2)
    println(cellphone1)
    println("cellphone1 equals cellphone2 " + (cellphone1 == cellphone2))

    Singleton.singletonTest()

    val list = ArrayList<String>()
    list.add("123")

    val list2 = listOf("1", "2", 36, 4L)

    val list3 = mutableListOf("1")
    list3.add("2")

    for(i in list3) {
        println(i)
    }

    val set = setOf("1", "1", "2")

    val set2 = mutableSetOf("1", "2")
    set2.add("2")

    val map = HashMap<String, Int>()
    map.put("Apple", 1)
    map["a"] = 2

    val map2 = mapOf("apple" to 1, "banana" to 3)

    for ((fruit, number) in map) {
        println("fruit is " + fruit + ", number is " + number)
    }

    val list4 = listOf("Apple", "Banana", "Orange", "Pear", "Grape", "Watermelon")
    val newList = list4.filter { it.length <= 5 }.map { it.toUpperCase() }
    val maxLengthFruit = list4.maxBy { it.length }
    val maxLengthFruit2  = list4.maxBy { it.length }
    println("max length fruit is " + maxLengthFruit)

    val anyResult = list4.any { it.length <= 5 }
    val allResult = list4.all { it.length <= 5 }
    println("anyResult is " + anyResult + ", allResult is " + allResult)
    for(i in newList) {
        println(i)
    }

    list4.let { obj2 ->
        println("anyResult is " + anyResult + ", allResult is " + obj2)
     }
}