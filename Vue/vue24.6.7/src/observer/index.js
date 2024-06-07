import { isObject } from "../utils";

// 检查数据类型，类有类型 普通对象无类型（Object除外）
class Observer {
  constructor(data) {
    // 对对象中的所有属性进行劫持
    this.walk(data);
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
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newV) {
      observer(newV); // 如果用户赋值一个新对象，需要将这个对象进行劫持
      value = newV;
    },
  });
}

export function observer(data) {
  // 如果是对象才观测
  if (!isObject(data)) {
    return;
  }

  return new Observer(data);
}
