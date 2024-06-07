import { initMixin } from "./init";

function Vue(options) {
  // options 为用户传入的选项; // 初始化操作
  this._init(options);
}

// 扩展原型
initMixin(Vue);

export default Vue;
