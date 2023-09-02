// let title = require("./result.txt");

// import "./index.css"
// import "./less.less"
// import "./sass.scss"

// console.log(title.default)

// window.addEventListener("DOMContentLoaded", () => {
//   document.body.append(`<h2>${title.default}</h2>`)

//   // require 插入 image
//   let logo = require("./images/image1.png")
//   let image = new Image()
//   // image.src = logo.default
//   image.src = logo // esModule 为false
//   document.body.appendChild(image)
// })

// let sum = (a, b) => a + b

// import React from 'react'
// import ReactDOM from 'react-dom'

// class TestComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 1
//     }
//   }

//   handleClick = () => {
//     this.setState((state) => {
//       return {
//         count: state.count + 1
//       }
//     })
//   }

//   render() {
//     return <div>
//       <h2>{this.state.count}</h2>
//       <button onClick={this.handleClick}>+</button>
//     </div>
//   }
// }

// function readonly(target, key, descriptor) {
//   descriptor.writable = false
// }

// class Person {
//   @readonly PI = 3.14
// }

// let p = new Person()

// p.PI = 3.15

// ReactDOM.render(<div>hello cxs happy everyday<TestComponent /></div>, document.getElementById("root"))

// require("@babel/polyfill")
// 如何按需加载？只用 promise 就引 promise

// var promise = new Promise((resolve, reject) => {
//   resolve(1)
// });
// promise.then((res) => {
//   console.log(res)
// })

// import _ from 'lodash'
// require("lodash") // 如何不打包，走cdn的

// alert(_.join(['a', 'b', 'c'], '_'))
// console.log("cxs nihao happy everyday")

console.log(
  "module index.js",
  DEVELOPMENT,
  EXPRESSION,
  typeof EXPRESSION,
  process.env.NODE_ENV
);
if (DEVELOPMENT) {
  console.log("你好，开发环境");
}
console.log("业务逻辑");
