## JS高级

### 防抖与节流

WHAT？
本质上是优化高频率执行代码的一种手段，如浏览器的 resize、scroll、keypress、mousemove 等事件在触发时，
会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能。对此我们可以采用防抖和节流的方式来限制调用次数，降低调用频率。

防抖：当事件触发n秒后执行函数，如果在n秒内再次触发，重新计时
节流：当多次执行某一动作，每隔一段时间，只执行一次函数

为什么叫防抖？防止抖动，以免把一次事件误认为是多次。单位时间内事件触发会被重置，避免事件被误伤触发多次。代码实现重在清零 clearTimeout。防抖可以比做等电梯，只要有一个人进来，就需要再
等一会儿。业务场景有：
1. 登录、发短信等按钮避免用户点击太快，以至于发送了多次请求，需要防抖；
2. 调整浏览器窗口大小时，避免resize事件处理函数执行次数过于频繁引起业务卡顿（如函数处理函数有比较重的计算逻辑）；
3. 文本编辑器实时保存，当无任何更改操作一秒后进行保存。

为什么叫节流？控制流量、节省流量、限制流量，即控制事件发生的频率，如1s内只执行一次。业务场景有：
1. 浏览器 scroll 事件，每隔一秒重新计算一次位置信息；
2. 视频播放事件，每一秒计算一次进度信息；
3. input款实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求（也可做防抖）。

HOW？
```js
/**
 * 节流
 * @param fn 要节流的函数
 * @param threshold 节流频率
 * @param leading 是否要立即执行
 * @returns {(function(): void)|*}
 */
function throttle(fn, threshold= 200, leading) {
  let timer;
  let start = new Date();
  return function () {
    const current = new Date();
    timer ? clearTimeout(timer) : leading ? fn.call(this, ...arguments) : null;
    if (current - start >= threshold) {
      fn.call(this, ...arguments);
      start = current;
    } else {
      timer = setTimeout(fn.bind(this), threshold, ...arguments);
    }
  }
}

/**
 * 防抖
 * @param fn 要防抖的函数
 * @param delay 延迟的事件
 * @param leading 是否要立即执行
 * @returns {(function(): void)|*}
 */
function debounce(fn, delay = 200, leading) {
  let timer;
  return function () {
    timer ? clearTimeout(timer) : leading ? fn.call(this, ...arguments) : null;
    timer = setTimeout(fn.bind(this), delay, ...arguments);
  }
}
```

### 变量、作用域、垃圾回收

https://fz0byxwkki.feishu.cn/docx/Ly6BdRgdIoyMeOxlQfSctLpMnIh

ECMAScript 中所有函数的参数都是按值传递的。变量有按值和按引用访问，而传参只有按值传递。

函数参数传递的两种方式：
按值传递：值会被复制到一个局部变量（即一个命名参数，或者用 ECMAScript 的话说，就是 arguments 对象中的一个槽位）。
按引用传递：值在内存中的位置会被保存在一个局部变量中，这意味着对本地变量的修改会反映到函数外部。

执行上下文：变量或函数的执行上下文决定了它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的变量对象（variable object）VO，而这个上下文中定义的所有变量和函数都存在于这个对象上。
全局上下文：浏览器 window
上下文栈：每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文会被推到一个上下文栈上。在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。

Let声明到底会不会被提升？https://juejin.cn/post/7054205477571264549

垃圾回收：

### JS的各种数据类型

### Map和WeakMap

### 数组的方法

### 异步相关、事件循环

Promise

async/await

宏任务、微任务

setTimeout

一个有 Promise 和 setTimeout 和 await/async，写输出顺序的题目

### ES6的新特性，用过哪些？

### 深浅拷贝

### 网络请求竞态问题

同一个请求发送多次，如何保证获取的是最后一次的结果？

### JS 0.1 + 0.2 !== 0.3 为什么？单双精度

### Object.defineProperty Proxy