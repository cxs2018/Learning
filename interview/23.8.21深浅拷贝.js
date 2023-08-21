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