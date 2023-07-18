// static 为派生（子）类设定 Symbol.species getter（规范内称为@@species）。如果当任何父类方法需要构造一个新实例，但不想使用子类的构造器本身时，
// 这个功能使得子类可以通知父类应该使用哪个构造器
class MyCoolArray extends Array {
  // 强制 species 为父构造器
  static get [Symbol.species]() {
    return Array
  }
}

var a = new MyCoolArray(1, 2, 3), b = a.map(function (v) {
  return v * 2;
})

console.log(a instanceof MyCoolArray)
console.log(a instanceof Array)
console.log(b instanceof MyCoolArray); // false
console.log(b instanceof Array, "\n"); // true

// 父类方法如何使用子类 species 声明
class Foo {
  // 推迟species为子构造器
  static get [Symbol.species]() {
    return this;
  }
  spawn() {
    return new this.constructor[Symbol.species]()
  }
}

class Bar extends Foo {
  // 强制species为父构造器
  static get [Symbol.species]() {
    return Foo;
  }
  selfInstance() {
    return new this.constructor()
  }
}

var a = new Foo()
var b = a.spawn()
console.log(b instanceof Foo)

var x = new Bar()
var y = x.spawn()
console.log(y instanceof Bar)
console.log(y instanceof Foo)

var bar  = new Bar()
var bar2 = bar.selfInstance()
console.log(bar instanceof Bar)
console.log(bar instanceof Foo)
console.log(bar2 instanceof Bar)
console.log(bar2 instanceof Foo)