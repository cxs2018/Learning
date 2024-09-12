// 泛型，把明确类型的工作推迟到创建对象或调用方法的时候才去明确的特殊的类型
function identity<T>(arg: T): T {
  return arg;
}
const userName = identity("name");
const id = identity<number>(1);
{
  function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
  createArray(3, "x");
}
{
  function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
  // createArray<string>(3, "x");
  createArray(3, "x");
}
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, "seven"]);
// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity(1);
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id]; // source as T 把 source 断言成 T 类型
  }
  return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}
let createMyArray: CreateArrayFunc<any>;
createMyArray = function <T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
createArray(3, 1); // ['x', 'x', 'x']
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
new GenericNumber<number>();
interface GenericInterface<U> {
  value: U;
  getIdentity: () => U;
}
class IdentityClass<T> implements GenericInterface<T> {
  constructor(value: T) {
    this.value = value;
  }
  getIdentity(): T {
    return this.value;
  }
  value: T;
}
const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity());
const myStringClass = new IdentityClass("HelloWorld");
console.log(myStringClass.getIdentity());

interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[]; // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person }; // string | number
