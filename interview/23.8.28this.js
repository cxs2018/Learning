if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this;
    var curried = [].slice.call(arguments, 1);
    var bound = function () {
      console.log("bound this", this)
      return fn.apply((!this || this == window) ? obj : this, curried.concat.apply(curried, arguments))
    }
    bound.prototype = Object.create(fn.prototype)
    return bound
  }
}
// 硬绑定可以把this强制绑定到指定的对象（除了new），防止函数调用应用默认绑定规则，但是，硬绑定会大大降低函数的灵活性，使用硬绑定
// 之后就无法使用隐式绑定或者显式绑定来修改this
// 如果给默认绑定指定一个全局对象和undefined以外的值，就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改this的能力
// 对指定的函数封装，首先检查调用时的this，如果this绑定到全局对象或者undefined，那就把指定的默认对象obj绑定到this，否则不会修改this


function foo(a, b) {
  console.log("name: " + this.name + a + b);
}
var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };
var fooOBJ = foo.softBind(obj, "123");
fooOBJ("456"); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看！！！
fooOBJ.call(obj3); // name: obj3 <---- 看！
setTimeout(obj2.foo, 10);
 // name: obj <---- 应用了软绑定