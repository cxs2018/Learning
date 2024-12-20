// 接口的兼容性
export {};
interface Animal {
  name: string;
  age: number;
}
interface Person {
  name: string;
  age: number;
  gender: number;
}
function getName(a: Animal): string {
  return a.name;
}
let a: Animal = {
  name: "cxs",
  age: 25,
};
getName(a);
let p: Person = {
  name: "",
  age: 10,
  gender: 0,
};
getName(p);
// 基本数据类型的兼容性
let num: string | number;
let str: string = "zhufeng";
num = str;
let num2: {
  toString(): string;
};
let str2: string = "111";
num2 = str2;
// str2 = num2;
// 类的兼容性
namespace ab {
  class Animal {
    name: string;
  }
  class Bird extends Animal {
    age: number;
  }
  let a: Animal = { name: "1" };
  let b: Bird;
  a = b;
  // b = a;
}
// 函数的兼容性，比较参数，比较返回值
// 协变与逆变
namespace c {
  class Animal {}
  class Dog extends Animal {
    public name: string = "1";
  }
  class BlackDog extends Dog {
    public age: number = 10;
  }
  class WhiteDog extends Dog {
    public home: string = "beijing";
  }
  let animal: Animal;
  let dog: Dog;
  let blackDog: BlackDog;
  let whiteDog: WhiteDog;
  type Callback = (dog: Dog) => Dog;
  let callback: Callback = (blackDog: BlackDog) => blackDog;
  function exec(callback: Callback) {
    callback(whiteDog);
  }
  type ChildToChild = (blackDog: BlackDog) => BlackDog;
  let ChildToChild: Callback;
  exec(ChildToChild);
  type ChildToParent = (blackDog: BlackDog) => Animal;
  let ChildToParent: ChildToParent;
  exec(ChildToParent);
  type ParentToParent = (animal: Animal) => Animal;
  let ParentToParent: ParentToParent;
  exec(ParentToParent);
  type ParentToChild = (animal: Animal) => BlackDog;
  let ParentToChild: ParentToChild;
  exec(ParentToChild);
}
namespace c {
  // 类型保护
  interface Bird {
    name: string;
  }
  interface Person {
    age: number;
  }
  type BirdPerson = Bird | Person;
  type MyPartial<T> = {
    [key in keyof T]?: T[key];
  };
  // 条件分发
  type Diff<T, U> = T extends U ? never : T;
  type Filter<T, U> = T extends U ? T : never;
  type a = Filter<"a" | "b", "a" | "b" | "c">;
}
namespace d {
  type Exclude<T, U> = T extends U ? never : T;
  type Extract<T, U> = T extends U ? T : never;
  type NonNullable<T> = T extends null | undefined ? never : T;
  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;
  type Parameters<T> = T extends (...args: infer P) => any ? P : never;
  type ConstructorParameters<T> = T extends new (...args: infer P) => any
    ? P
    : never;
  type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
  type ElementOf<T> = T extends Array<infer E> ? E : never;
  type Ttuple = [string, number, boolean];
  type TupleToUnion = ElementOf<Ttuple>;
  type T1 = { name: string };
  type T2 = { age: number };
  type ToIntersection<T> = T extends {
    a: (x: infer U) => void;
    b: (x: infer U) => void;
  }
    ? U
    : never;
  type T3 = ToIntersection<{ a: (x: T1) => void; b: (x: T2) => void }>;
  let t3: T3 = {
    name: "1",
    age: 10,
  };
  // ts 函数是双向协变的，协变传子类，逆变传父类，协变更严谨，逆变更宽松
  type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
  };
  type Pick<T, K extends keyof T> = {
    [p in K]: T[p];
  };
  /**
   * Construct a type with a set of properties K of type T
   */
  type Record<K extends keyof any, T> = {
    [P in K]: T;
  };
  function mapObject<K extends string | number, T, U>(
    obj: Record<K, T>,
    map: (x: T) => U,
  ): Record<K, U> {
    let result: Record<K, U> = <Record<K, U>>{};
    for (const objKey in obj) {
      result[objKey] = map(obj[objKey]);
    }
    return result;
  }
  let names = { 0: "hello", 1: "world" };
  let lengths = mapObject<string | number, string, number>(
    names,
    (s: string) => s.length,
  );
  console.log(lengths);
  type Point = "x" | "y";
  type PointList = Record<Point, { value: number }>;
  const cars: PointList = {
    x: { value: 10 },
    y: { value: 20 },
  };
}
namespace e {
  // 条件类型 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
  // 1. 定义条件类型
  interface Fish {
    name: string;
  }
  interface Water {
    name: string;
  }
  interface Bird {
    name: string;
  }
  interface Sky {
    name: string;
  }
  type Condition<T> = T extends Fish ? Water : Sky;
  let condition: Condition<Fish> = { name: "水" };
  // 2. 条件类型的分发 分布式有条件类型 naked type parameter
  type a = string | number | boolean;
  type b = number;
  // 联合类型，少的是子类型，多的是父类型，子类型范围更窄
  type c = b extends a ? true : false;
  let d: c = true;
  type e = {
    name: string;
  };
  type f = {
    name: string;
    age: number;
  };
  // 对象属性越多，是子类型，相当于范围越窄
  type g = e extends f ? true : false;
  let i: g = true;
  type Ta = string | number;
  type Tb = number | boolean;
  type Tc = Ta & Tb;
  function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map((n) => o[n]);
  }
  let user = { id: 1, name: "zhufeng" };
  type User = typeof user;
  const res = pick<User, keyof User>(user, ["id", "name"]);
  console.log(res);
}
namespace f {
  interface Animal {
    name: string;
    age: number;
  }

  interface Person {
    name: string;
    age: number;
    gender: number;
  }
  // 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
  function getName(animal: Animal): string {
    return animal.name;
  }

  let p = {
    name: "zhufeng",
    age: 10,
    gender: 0,
  };

  getName(p);
  //只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
  let a: Animal = {
    name: "zhufeng",
    age: 10,
    gender: 0,
  };
  //接口内容为空没用到泛型的时候是可以的
  //1.接口内容为空没用到泛型的时候是可以的
  interface Empty<T> {}
  let x!: Empty<string>;
  let y!: Empty<number>;
  x = y;

  //2.接口内容不为空的时候不可以
  interface NotEmpty<T> {
    data: T;
  }
  let x1!: NotEmpty<string>;
  let y1!: NotEmpty<number>;
  x1 = y1;
}
