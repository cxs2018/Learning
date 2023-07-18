package com.cuixuesen.helloworld

class Student : Person() {
    var sno = ""
    var grade = 0
}

class Student2(val sno: String, val garde: Int): Person() {

}

var student = Student2("a123", 25)

class Student3(val sno: String, val grade: Int): Person() {
    init {
        println("sno is " + sno)
        println("grade is " + grade)
    }
}

class Student4(val sno: String, val grade: Int, name: String, age: Int) : Person2(name, age) {
    constructor(name: String, age: Int) : this("", 0, name, age) {

    }

    constructor() : this("", 0)
}

class Student5(name: String, age: Int) : Person2(name, age), Study {
    override fun readBooks() {
        println(name + " is reading")
    }

    override fun doHomework() {
        println(name + " is doing homework")
    }

    override fun doHomework2() {
//        super.doHomework2()
    }
}

