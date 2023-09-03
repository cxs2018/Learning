##

1. Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.

- options has an unknown property 'contentBase'. These properties are valid:

解决：
Use static instead as contentBase is deprecated in latest Webpack v5

devServer: {
static: {
directory: path.join(\_\_dirname, "doc")
},

    or

    static: './doc'

    会被 output: {
    path: resolve(__dirname, "doc"), // 输出文件夹的绝对路径
    filename: "main.js", // 输出的文件名

} 影响，最终采用 outpath 的 path，但是这里制定的目录也会放到 server 上，如 /doc/1.js，访问 http://localhost:8080/1.js

2. writeToDisk 不起作用，移到了

devMiddleware: {
writeToDisk: true,
},

3. 引入图片的方式

- 放在静态文件根目录，通过 html 的 image 标签引用
- 通过 require、import 引用
- css background-image url 引入 css-loader 处理

4. https://juejin.cn/post/7061171808229621774

新版本 css-loader 中遇到的坑（6.XX 版本）
由于要打包图片资源等，所以引入了 file-loader 或 url-loader，这两个 loader 都可以对图片资源进行打包。
但是由于最新版本(6 之后)中可以对 css 文件中的 url 进行解析打包，因此如果是在 css 文件中通过 url（）引入了图片资源，css-loader 是可以处理图片资源的。不需要引入其他的 loader。
除了在 css 中使用图片资源，我们还会在 js 文件中使用图片资源，因此我们还是需要引入 file-laoder 或者是 url-loader 的。但是这里出问题了，这两个 loader 也会处理 css 中 url()引入的图片资源，最终对同一张图片打包出了两张，并且引发了冲突，最终使用了 css-loader 打包出来的图片，但是由于冲突，导致图片异常，无法正常的在浏览器中显示。
解决方案：
使用 webpack5 中的 asset module type 来处理资源文件，就可以解决问题了。
切记:使用 css-loader（6.XX）就不要使用 file-laoder 和 url-loader，只能使用 webpack5 为我们提供的 asset module type。

5. html-loader 和静态资源访问 有冲突，暂时没找到解决方案
   https://anran758.github.io/blog/2020/05/04/webpack-example/

6.

```js
// loader.raw =ture 表示loader得到的是一个二进制的buffer，false 得到的是 utf-8 字符串
function loader(source) {
  // 1. 先生成文件名
  let filename = "hdhhshdhsdh.png";
  // 2. 写文件
  // 3. 返回一个js脚本
  return `module.exports = ${filename}`;
}
loader.raw = true;
module.exports = loader;
```

7. https://stackoverflow.com/questions/65293577/uncaught-typeerror-is-not-a-function-in-core-js

Uncaught TypeError: $ is not a function in core-js

babel-loader 不要处理 core-js 的文件

```json
     test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          xxx
        }
      ]
```

8. set NODE_ENV=development&& webpack serve 不能加空格，否则变量会识别出 “development ”

可替换为 cross-env，就不用加 &&，也会忽略空格 cross-env NODE_ENV=development webpack serve

9. 环境变量配置
   模块内部使用的变量、node 环境中 webpack.config.js 使用的变量

命令追加 --env=development，会作为参数传给 webpack.config.js 导出的函数，{development: true}

命令追加 --mode=development，打包模式会变成开发模式，模块内会给 process.env.NODE_ENV 赋值 development，默认是 production，可以被自定义的 DefinePlugin 覆盖

cross-env NODE_ENV=development，会给 webpack node 环境赋值，process.env.NODE_ENV 为 development

10. Array.from

polyfill 原生 Array.prototype 加个方法 -- 适合业务代码使用，会污染全局变量
runtime 新构造一个 Array，包含 from 方法 -- 适合开发库使用，如 lodash、jquery，不会污染全局变量
