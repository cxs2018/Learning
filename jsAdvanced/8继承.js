// 接口继承：只继承方法签名；实现继承：继承实际的方法
// 接口继承在 ECMAScript 中是不可能的，因为函数没有签名。实现继承是 ECMAScript 唯一支持的继承方式，而这主要是通过原型链实现的
function SuperType() {
  this.colors = ["red", "blue", "green"];
  this.color = "white"
 }
 function SubType() {}
 // 继承 SuperType
 SubType.prototype = new SuperType();
 let instance1 = new SubType();
 instance1.colors.push("black");
 console.log(instance1); // "red,blue,green,black"
 let instance2 = new SubType();
 console.log(instance2); // "red,blue,green,black"
 // 盗用构造函数，对象伪装、经典继承 在子类的构造函数中调用父类构造函数
 // 组合继承、伪经典继承：结合原型链和盗用构造函数
 function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
 }
 SuperType.prototype.sayName = function() {
  console.log(this.name);
 };
 function SubType(name, age){
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
 }
 // 继承方法
 SubType.prototype = new SuperType();
 SubType.prototype.sayAge = function() {
  console.log(this.age);
 };
 let instance1 = new SubType("Nicholas", 29);
 instance1.colors.push("black");
 console.log(instance1.colors); // "red,blue,green,black"
 instance1.sayName(); // "Nicholas";
 instance1.sayAge(); // 29
 let instance2 = new SubType("Greg", 27);
 console.log(instance2.colors); // "red,blue,green"
 instance2.sayName(); // "Greg";
 instance2.sayAge(); // 27

// 原型式继承，Prototypal Inheritance in JavaScript
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
 };
 let anotherPerson = Object.create(person, {
  name: {
  value: "Greg"
  }
 });
 console.log(anotherPerson.name); // "Greg" 

 // 寄生式继承
 // 寄生式组合继承：通过盗用构造函数继承属性，但使用混合式原型链继承方法
 function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 赋值对象
 } 