function myNew(constructor, ...args) {
  let obj = {}
  obj.__proto__ = constructor.prototype;
  let result = constructor.apply(obj, args)
  return result instanceof Object ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

//执行createNew()看一下它的返回结果
let createNew1 = myNew(Person, 'yy', 18)
console.log(createNew1)//Person {name: "yy", age: 18}
//使用new直接操作Person()看一下它的结果
let person = new Person('yy', 18)
console.log(person)//Person {name: "yy", age: 18}

/**
 * 1. 创建一个空对象
 * 2. 将 {}.__proto__ 指向构造函数.prototype
 * 3. 指向构造函数，this 指定为这个新创建的对象
 * 4. 如果构造函数没有返回值或返回值是基本数据类型，则将这个新创建的对象返回，如果构造函数的返回值是引用数据类型，则直接返回这个结果
 */
