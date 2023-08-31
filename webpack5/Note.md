##

1. Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'contentBase'. These properties are valid:

解决：
 Use static instead as contentBase is deprecated in latest Webpack v5

   devServer: {
    static: {
      directory: path.join(__dirname, "doc")
    },

    or

    static: './doc'

    会被 output: {
    path: resolve(__dirname, "doc"), // 输出文件夹的绝对路径
    filename: "main.js", // 输出的文件名
  } 影响，最终采用 outpath 的 path，但是这里制定的目录也会放到server上，如 /doc/1.js，访问 http://localhost:8080/1.js

  2. writeToDisk 不起作用，移到了     

  devMiddleware: {
      writeToDisk: true,
    },

3. 引入图片的方式

- 放在静态文件根目录，通过html的image标签引用
- 通过 require、import 引用
- css background-image url 引入 css-loader处理

4. https://juejin.cn/post/7061171808229621774

新版本css-loader中遇到的坑（6.XX版本）
由于要打包图片资源等，所以引入了file-loader或url-loader，这两个loader都可以对图片资源进行打包。
但是由于最新版本(6之后)中可以对css文件中的url进行解析打包，因此如果是在css文件中通过url（）引入了图片资源，css-loader是可以处理图片资源的。不需要引入其他的loader。
除了在css中使用图片资源，我们还会在js文件中使用图片资源，因此我们还是需要引入file-laoder或者是url-loader的。但是这里出问题了，这两个loader也会处理css中url()引入的图片资源，最终对同一张图片打包出了两张，并且引发了冲突，最终使用了css-loader打包出来的图片，但是由于冲突，导致图片异常，无法正常的在浏览器中显示。
解决方案：
使用webpack5中的asset module type 来处理资源文件，就可以解决问题了。
切记:使用css-loader（6.XX）就不要使用file-laoder和url-loader，只能使用webpack5为我们提供的asset module type。

5. html-loader 和静态资源访问 有冲突，暂时没找到解决方案
https://anran758.github.io/blog/2020/05/04/webpack-example/

6. 
```js
// loader.raw =ture 表示loader得到的是一个二进制的buffer，false 得到的是 utf-8 字符串
function loader(source) {
  // 1. 先生成文件名
  let filename = "hdhhshdhsdh.png"
  // 2. 写文件
  // 3. 返回一个js脚本
  return `module.exports = ${filename}`;
}
loader.raw = true
module.exports = loader
```