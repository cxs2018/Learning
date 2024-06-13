import Collapse from "./collapse.js";
import CollapseItem from "./collapse-item.js";

window.customElements.define("zf-collapse", Collapse);
window.customElements.define("zf-collapse-item", CollapseItem);

let defaultActive = ["1", "2"];

document
  .querySelector("zf-collapse")
  .setAttribute("active", JSON.stringify(defaultActive));

document.querySelector("zf-collapse").addEventListener("changeName", (e) => {
  let { isShow, name } = e.detail;
  if (isShow) {
    let index = defaultActive.indexOf(name);
    defaultActive.splice(index, 1);
  } else {
    defaultActive.push(name);
  }
  document
    .querySelector("zf-collapse")
    .setAttribute("active", JSON.stringify(defaultActive));
});

// shadowDOM 完全隔离
// 组件间通信 属性，事件
// customEvent -> web component 兼容性差，没有自动更新机制
