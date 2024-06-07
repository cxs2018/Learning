import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.js",
  output: {
    format: "umd", // 支持 amd 和 commonjs 规范 window.Vue
    name: "Vue",
    file: "dist/vue.js",
    sourcemap: true, // es5 -> es6源代码
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
