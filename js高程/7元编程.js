// 元编程: 操作目标是程序本身的行为特性的编程
// 内省 introspection
// 宏 -> 代码在编译时修改自身
// for..in循环枚举对象的键、检查一个对象是否是某个“类构造器”的实例
// 代码查看自身、代码修改自身、代码修改默认语言特性 -> 影响其他代码
// 元编程的目标：利用语言自身的内省能力使代码的其余部分更具描述性、表达性和灵活性 meta
var abc = function baz() {
 };
console.log(abc.name)
// 元属性 -> 以属性访问的形式提供特殊的其他方法无法获取的元信息
// 从构造器调用内部确定最初new的目标是什么，用于内省（检查类型/结构）或者静态属性访问
// Well-Known Symbol WKS 公开符号
// @@iterator
var arr = [4,5,6,7,8,9]
for (const v of arr) {
  console.log(v)
}

// 定义一个只在奇数索引值产生值的迭代器
arr[Symbol.iterator] = function *() {
  var idx = 1;
  do {
    yield this[idx];
  } while((idx += 2) < this.length);
}
for (const v of arr) {
  console.log(v)
}

function Foo(greeting) {
  this.greeting = greeting
}

Foo.prototype[Symbol.toStringTag] = "Foo"

Object.defineProperty(Foo, Symbol.hasInstance, {
  value: function(inst) {
    return inst.greeting = "hello"
  }
})

var a = new Foo("hello")
var b = new Foo("world")

b[Symbol.toStringTag] = "cool"

console.log(a.toString())
console.log(String(b))
console.log(a instanceof Foo)
console.log(b instanceof Foo)

// Symbol.species -> 生成实例时，类的内置方法使用哪一个构造器
class Cool {
  // 把@@species推迟到子类
  static get [Symbol.species]() {
    return this
  }
  again() {
    return new this.constructor[Symbol.species]()
  }
}

class Fun extends Cool {}

class Awesome extends Cool {
  // 强制指定@@species为父构造器
  static get [Symbol.species]() {
    return Cool;
  }
}

var a = new Fun(), b = new Awesome(), c = a.again(), d = b.again()

console.log(c instanceof Fun)
console.log(d instanceof Awesome)
console.log(d instanceof Cool)

// 抽象类型转换运算 ToPrimitive -> 对象为了某个操作（比如比较==或者相加+）必须被强制转换为一个原生类型值的时候
var arr = [1,2,3,4,5]
console.log(arr + 10)

arr[Symbol.toPrimitive] = function(hint) {
  if (hint == "default" || hint == "number") {
    return this.reduce(function(acc, curr) {
      return acc + curr;
    }, 0)
  }
}
console.log(arr + 10)

// Symbol.isConcatSpreadable
// Symbol.unscopables -> 用来指示使用with语句时哪些属性可以或不可以暴露为词法变量