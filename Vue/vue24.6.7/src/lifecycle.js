import { patch } from "./vdom/patch";
import Watcher from "./observer/watcher";
import { nextTick } from "./utils";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
  Vue.prototype.$nextTick = nextTick;
}

export function mountComponent(vm, el) {
  let updateComponent = () => {
    vm._update(vm._render());
  };
  // 观察者模式，属性是被观察者，渲染是观察者
  // updateComponent();
  new Watcher(
    vm,
    updateComponent,
    () => {
      console.log("更新视图了");
    },
    {}, // 渲染watcher
  );
}
