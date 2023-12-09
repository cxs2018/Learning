## 计算机基础

### HTTP缓存 强缓存、协商缓存

### HTTP与HTTPS区别

### TCP的三次握手和四次挥手

### TCP和UDP区别

### 浏览器输入 URL 到渲染页面的过程

https://segmentfault.com/a/1190000013662126

骨干知识：
1. 从浏览器接收url到开启网络请求线程（这一部分可以展开浏览器的机制以及进程与线程之间的关系）

2. 开启网络线程到发出一个完整的http请求（这一部分涉及到dns查询，tcp/ip请求，五层因特网协议栈等知识）

3. 从服务器接收到请求到对应后台接收到请求（这一部分可能涉及到负载均衡，安全拦截以及后台内部的处理等等）

4. 后台和前台的http交互（这一部分包括http头部、响应码、报文结构、cookie等知识，可以提下静态资源的cookie优化，以及编码解码，如gzip压缩等）

5. 单独拎出来的缓存问题，http的缓存（这部分包括http缓存头部，etag，cache-control等）

6. 浏览器接收到http数据包后的解析流程（解析html-词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、复合图层的合成、GPU绘制、外链资源的处理、loaded和domcontentloaded等）

7. CSS的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC等概念）

8. JS引擎解析过程（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，AO，作用域链、回收机制、闭包等等）

9. 其它（可以拓展不同的知识模块，如跨域，web安全，hybrid模式等等内容）

### CORS 跨域

### HTTP1.0 1.1 2 3 队头阻塞

MDN的介绍：
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP

Head-of-Line blocking 
HOL blocking
队头阻塞：当单个（慢）对象阻止其他/后续的对象前进时

队头阻塞的介绍 https://zhuanlan.zhihu.com/p/330300133

### 垃圾回收