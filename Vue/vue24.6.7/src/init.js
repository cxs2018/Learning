import { initState } from "./state";
import { compileToFunction } from "./compiler/index";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options; // 后面会对 options 进行扩展操作

    // 对数据进行初始化 watch computed props data
    initState(vm);

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
        let render = compileToFunction(template);
        options.render = render;
      }
    }
    // options.render 就是渲染函数
  };
}
