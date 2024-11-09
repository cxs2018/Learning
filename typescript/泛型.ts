function createArray<T>(length: number, value: T): Array<T> {
  let results: T[] = [];
  for (let i = 0; i < length; i++) {
    results[i] = value;
  }
  return results;
}
let result = createArray<string>(3, "cxs");
console.log(result);

function sum() {
  let args: IArguments = arguments;
}

class MyArray<T> {
  private list: T[] = [];
  add(value: T) {
    this.list.push(value);
  }
  getMax(): T {
    return this.list[0];
  }
}
// 泛型与new
function factory<T>(type: { new (): T }): T {
  return new type();
}
// 泛型接口
interface Calculate {
  <T>(a: T, b: T): T;
}
let sum1: Calculate = function <T>(a: T, b: T): T {
  return a + b;
};
sum1(1, "1");
// 泛型约束
interface LengthWise {
  length: number;
}
function logger2<T extends LengthWise>(val: T) {
  console.log(val.length);
}
let obj = {
  length: 10,
  A: 2,
};
type Obj = typeof obj;
logger2(obj);

// 类型别名
type Cart<T> = { list: [] } | T[];
