import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options; // 后面会对 options 进行扩展操作

    // 对数据进行初始化 watch computed props data
    initState(vm);
  };
}
