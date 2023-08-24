// 原始数据、引用数据 栈、堆，对象 地址，指向实际存储位置的指针 如 0xFFFFF
// Object.assign、slice、concat、Array.from、扩展运算符
// 深拷贝
// Symbol、对象、数组、日期、正则、循环引用
function deepClone(target, hash = new WeakMap()) { // 额外开辟一个存储空间WeakMap来存储当前对象
  if (target === null || target === undefined) return target // 如果是null就不进行拷贝操作
  if (target instanceof Date) return new Date(target) // 处理日期
  if (target instanceof RegExp) return new RegExp(target) // 处理正则
  if (target instanceof HTMLElement) return target // 处理DOM元素

  if (typeof target !== 'object') return target
}

// JSON.parse(JSON.stringify()) 拷贝内置对象、拷贝函数、循环引用会有问题
{
  function clone(target) {
    let cloneTarget = {}
    for (const key in target) {
      cloneTarget[key] = target[key]
    }
    return cloneTarget
  }
  // 浅拷贝，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性依次添加到新对象上，返回
}

{
  // 深拷贝，要拷贝的对象不知道是多少层深度，递归
  // 原始类型，无需继续拷贝，直接返回
  // 引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
  function clone(target) {
    if (typeof target === 'object') {
      let cloneTarget = new target.constructor()
      for (const key in target) {
        cloneTarget[key] = clone(target[key])
      }
      return cloneTarget
    } else {
      return target
    }
  }

  // const target = {
  //   field1: 1,
  //   field2: undefined,
  //   field3: 'ConardLi',
  //   field4: {
  //     child: 'child',
  //     child2: {
  //       child2: 'child2'
  //     }
  //   }
  // };
  const target = {
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child'
    },
    field4: [2, 4, 8]
  };
  // target.target = target; 没有处理循环引用

  // const res = clone(target)
  // console.log(res)

  // target[0].test1 = 2;

  // console.log(res, target)
}

{
  // 循环引用，额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系
  function clone(target, map = new Map()) {
    if (typeof target === 'object') {
      let cloneTarget = new target.constructor()
      if (map.get(target)) {
        return map.get(target)
      }
      map.set(target, cloneTarget);
      for (const key in target) {
        cloneTarget[key] = clone(target[key], map)
      }
      return cloneTarget
    } else {
      return target
    }
  }
  const target = {
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child'
    },
    field4: [2, 4, 8]
  };
  target.target = target;

  console.log(clone(target))

  // WeakMap key/value 弱引用，键必须是对象
  // 弱引用，不能确保其引用的对象不会被垃圾回收器回收的
}

{
  // 遍历的效率
  function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
      iteratee(array[index], index)
    }
    return array
  }

  function clone(target, map = new Map()) {
    if (typeof target === 'object') {
      let cloneTarget = new target.constructor()
      if (map.get(target)) {
        return map.get(target)
      }
      map.set(target, cloneTarget);

      const keys = Array.isArray(target) ? undefined : Object.keys(target)
      forEach(keys || target, (value, key) => {
        if (keys) {
          key = value;
        }
        cloneTarget = clone(target[key], map)
      })

      return cloneTarget
    } else {
      return target
    }
  }
}