import { isFunction } from "./utils";
import { observer } from "./observer/index";

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
  // if (options.watch) {
  //   initWatch();
  // }
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
