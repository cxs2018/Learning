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

function initData(vm) {
  let data = vm.$options.data;
  // vue2中会讲data中的所有数据进行数据劫持 Object.defineProperty
  data = vm._data = isFunction(data) ? data.call(vm) : data;
  observer(data);
}
