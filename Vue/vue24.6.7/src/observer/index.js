import { isObject } from "../utils";
import { arrayMethods } from "./array";
import Dep from "./dep";

// 检查数据类型，类有类型 普通对象无类型（Object除外）
class Observer {
  constructor(data) {
    // 所有被劫持过的属性都有 __ob__
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false, // 不可枚举 Object.keys 枚举不到，避免死循环
    });
    if (Array.isArray(data)) {
      // 数组劫持 对数组原来的方法进行改写 切片编程 高阶函数
      data.__proto__ = arrayMethods;
      // 如果数组中的数据是对象类型，需要监控对象的变化
      this.observeArray(data);
    } else {
      // 对对象中的所有属性进行劫持
      this.walk(data);
    }
  }

  observeArray(data) {
    data.forEach((item) => {
      observer(item);
    });
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

// vue2会对对象进行遍历，将每个属性用 Object.defineProperty 重新定义 性能差
function defineReactive(data, key, value) {
  // 递归处理对象
  observer(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set(newV) {
      if (newV !== value) {
        observer(newV); // 如果用户赋值一个新对象，需要将这个对象进行劫持
        value = newV;
        dep.notify();
      }
    },
  });
}

export function observer(data) {
  // 如果是对象才观测
  if (!isObject(data)) {
    return;
  }
  // 如果某个对象已经被观测了，就不再重复观测了
  if (data.__ob__) {
    return;
  }
  return new Observer(data);
}
