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
