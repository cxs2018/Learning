import { isFunction } from "./utils";
import { observer } from "./observer/index";
import Watcher from "./observer/watcher";

export function initState(vm) {
  const options = vm.$options;
  // if (options.props) {
  //   initProps();
  // }
  if (options.data) {
    initData(vm);
  }
  // if (options.computed) {
  //   initComputed();
  // }
  // 初始化 watch
  if (options.watch) {
    initWatch(vm, options.watch);
  }
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(v) {
      vm[source][key] = v;
    },
  });
}

function initData(vm) {
  let data = vm.$options.data;
  // vue2中会讲data中的所有数据进行数据劫持 Object.defineProperty
  data = vm._data = isFunction(data) ? data.call(vm) : data;

  for (const key in data) {
    proxy(vm, "_data", key);
  }
  observer(data);
}

function initWatch(vm, watch) {
  for (const key in watch) {
    let handler = watch[key];
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, key, handler) {
  return vm.$watch(key, handler);
}

export function stateMixin(Vue) {
  Vue.prototype.$watch = function (key, handler, options = {}) {
    options.user = true; // 是一个用户自己写的watch，与渲染watch区分
    new Watcher(this, key, handler, options);
  };
}
