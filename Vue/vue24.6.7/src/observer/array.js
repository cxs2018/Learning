let oldArrayPrototype = Array.prototype;
export let arrayMethods = Object.create(Array.prototype);
// arrayMethods.__proto__ = Array.prototype 继承

let methods = ["push", "shift", "unshift", "pop", "reverse", "sort", "splice"];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    oldArrayPrototype[method].call(this, ...args);
    let inserted;
    let ob = this.__ob__; // 根据当前数组获取到 observer 实例
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    ob.dep.notify();
  };
});
