// 接口继承：继承自抽象基类，方法不涉及具体实现，只继承方法签名；实现继承继承实际的方法
// 原型链：通过原型继承多个引用类似的属性和方法
// 缺点：1. 原型的引用值会被所有实例共享 2. 子类型在实例化时不能给父类型的构造函数传参
// 盗用构造函数 constructor stealing 对象伪装 or 经典继承: 在子类构造函数中调用父类构造函数
function SuperType(name){
  this.name = name;
 }
 function SubType(name) {
  // 继承 SuperType 并传参
  SuperType.call(this, name);
  // 实例属性
  this.age = 29;
 }
 let instance = new SubType("cxs");
 console.log(instance.name); // "Nicholas";
 console.log(instance.age); // 29

 let instance2 = new SubType("cxs2");
 console.log(instance2.name); // "Nicholas";
 console.log(instance2.age); // 29
 // 组合继承 伪经典继承 综合了原型链和盗用经典继承：使用原型链继承原型上的属性和方法，使用盗用构造函数继承实例属性
 // 原型式继承 prototypal Inheritance
 function object(o) {
  function F() {}
  F.prototype = o;
  return new F()
 }
 // 适合场景：不需要单独创建构造函数，但仍需要在对象间共享信息的场合
 // 寄生式继承 parasitic inheritance，类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象
 // 寄生式组合继承，存在效率问题，父类构造函数始终会被调用两次，一次是在创建子类原型时调用，一次是在子类构造函数中调用，本质上，子类原型最终是要包含超类对象的所有实例属性
 // 寄生式组合继承通过盗用构造函数继承属性，但是使用混合式原型链继承方法，不通过调用父类构造函数给子类原型赋值