import { patch } from "./vdom/patch";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    patch(vm.$el, vnode);
  };
}

export function mountComponent(vm, el) {
  let updateComponent = () => {
    vm._update(vm._render());
  };
  updateComponent();
}
