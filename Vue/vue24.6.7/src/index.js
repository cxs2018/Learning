import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import { stateMixin } from "./state";

function Vue(options) {
  // options 为用户传入的选项; // 初始化操作
  this._init(options);
}

// 扩展原型
initMixin(Vue);
renderMixin(Vue);
lifecycleMixin(Vue);
stateMixin(Vue);

export default Vue;
