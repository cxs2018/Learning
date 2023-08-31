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