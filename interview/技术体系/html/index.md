1. async 和 defer 的区别
   https://juejin.cn/post/7111693402579664932
- 浏览器在遇到 script 标签时，会中断 HTML 的解析，转而去执行 script 脚步，如果是 src 指定的外部脚本，会先下载然后执行
- defer 不会暂停 HTML 的解析，而在后台下载脚本，下载完成后在 DOMContentLoaded 事件之前按脚本放置顺序依次执行
- async 会在后台下载脚本，此阶段不会暂停 HTML 的解析，但下载完后会立刻执行，与其他脚本顺序无执行顺序关系，执行完成后再继续 HTML 的解析
- type="module" 等同于开启了 defer