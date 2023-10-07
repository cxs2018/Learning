// import _ from 'lodash'
// import "./style.css"
// /**
//  * 遇到 import Icon from './icon.png'，图片将被复制到 output 目录，并且，Icon 变量将包含该图像在处理后的最终 url
//  */
// import Icon from './icon.png'
// import Data from './data.xml';
// import Notes from './data.csv';
// import toml from './data.toml';
// import yaml from './data.yaml';
// import json from './data.json5';

// console.log(toml.title); // output `TOML Example`
// console.log(toml.owner.name); // output `Tom Preston-Werner`

// console.log(yaml.title); // output `YAML Example`
// console.log(yaml.owner.name); // output `Tom Preston-Werner`

// console.log(json.title); // output `JSON5 Example`
// console.log(json.owner.name); // output `Tom Preston-Werner`


// function component() {
//   const element = document.createElement("div")

//   element.innerHTML = _.join(["Hello", "webpack"], " ");
//   element.classList.add("hello")

//   const myIcon = new Image()
//   myIcon.src = Icon;

//   element.appendChild(myIcon)

//   console.log(Data);
//   console.log(Notes);

//   return element;
// }

// document.body.appendChild(component())

// 动态导入
// function getComponent() {
//   return import("lodash").then(({ default: _ }) => {
//     const element = document.createElement("div")

//     element.innerHTML = _.join(["Hello", "webpack"], " ");

//     return element
//   }).catch(error => "Error")
// }

// getComponent().then((component) => {
//   document.body.appendChild(component)
// })

// 缓存
import _ from 'lodash';
// import Print from './print';

function component() {
  const element = document.createElement('div');

  // lodash 现在使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.onclick = Print.bind(null, 'Hello webpack!');

  return element;
}

document.body.appendChild(component());