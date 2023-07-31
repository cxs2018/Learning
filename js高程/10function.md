内存管理优化 -> js 引擎可以重用栈帧 -> 尾调用: 外部函数的返回值是一个内部函数的返回值

闭包: 指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的
closeure

作用域链

```js
function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    let value1 = object1[propertyName];
    let value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}
```

call a function -> create context、scope link
arguments 和其他命名参数来初始化这个函数的活动对象
外部函数的活动对象是内部函数作用域链上的第二个对象，这个作用域链一直向外串起了所有包含函数的活动对象，直到全局执行上下文终止

IIFE Immediately Invoked Function Expression 立即调用的函数表达式

函数执行完毕 -> 其作用域链销毁

特权方法 privileged method: 能够访问函数私有变量（及私有函数）的公共方法
