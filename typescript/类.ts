abstract class Animal {
  name: string;
  abstract speck(): void;
}

// 重写 override
// 重载 overload
class Cat extends Animal {
  speck(): void {}
}

interface Speakable {
  speak(): void;
  [key: string]: any;
}

class Person implements Speakable {
  speak(): void {}
}

// 接口继承
// 构造函数类型
namespace a {
  class Animal {
    constructor(public name: string) {}
  }
  interface WithNameClass {
    new (name: string): Animal;
  }
  function createAnimal(clazz: WithNameClass, name: string) {
    return new clazz(name);
  }
  let a = createAnimal(Animal, "cxs");
  console.log(a.name);
}

namespace b {
  interface Animal {
    name: string;
    age: number;
  }
  interface Person {
    name: string;
    age: number;
    gender: number;
  }
  function getName(animal: Animal): string {
    return animal.name;
  }
  let p = {
    name: "zhufeng",
    age: 10,
    gender: 0,
  };
  getName(p);
  let a: Animal = {
    name: "zhufeng",
    age: 10,
    gender: 0,
  };
  let num: string | number;
  let str: string = "cxs";
  num = str;
  let num2: {
    toString(): string;
  };
  let str2: string = "mxf";
  num2 = str2;
  class Animal2 {
    name: string;
  }
  class Bird {
    name: string;
    // swing: number;
  }
  let a1: Animal2;
  a1 = new Bird();
  let b: Bird;
  b = new Animal2();
}
namespace c {
  class Animal {}
  class Dog extends Animal {
    public name: string = "Dog";
  }
  class BlackDog extends Dog {
    public age: number = 10;
  }
  class WhiteDog extends Dog {
    public home: string = "北京";
  }
  let animal: Animal;
  let blackDog: BlackDog;
  let whiteDog: WhiteDog;
  type Callback = (dog: Dog) => Dog;
  function exec(callback: Callback): void {
    callback(whiteDog);
  }
  type ChildToChild = (blackDog: BlackDog) => BlackDog;
  const childToChild: ChildToChild = (blackDog: BlackDog): BlackDog => blackDog;
  exec(childToChild);

  // A <= B A是B的子类型
  // A -> B 以A为参数类型，以B为返回值类型的函数类型
  // x: A x的类型为A
  // T -> A T -> B
  // 参数可以宽松，返回值可以严谨 协变-严谨 逆变-宽松
  // 子类型的属性比父类型更多、更具体
  interface AnyObject {
    [prop: string]: any;
  }
  function mixin<T extends AnyObject, U extends AnyObject>(
    one: T,
    two: U,
  ): T & U {
    const result = <T & U>{};
    for (const key in one) {
      (<T>result)[key] = one[key];
    }
    for (const key in two) {
      (<U>result)[key] = two[key];
    }
    return result;
  }
  mixin({ name: "1" }, { age: "2" });
  interface Person {
    name: string;
    age: number;
    gender: "male" | "female";
  }
  type PersonKey = keyof Person;
  function getValueByKey(p: Person, key: PersonKey) {
    return p[key];
  }
  console.log(getValueByKey({ name: "1", age: 1, gender: "male" }, "name"));
  type PartPerson = {
    [Key in keyof Person]?: Person[Key];
  };
  let p1: PartPerson = {};
  type Part<T> = {
    [key in keyof T]?: T[key];
  };
  let p2: Part<Person> = {};
  function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map((n) => o[n]);
  }
  let user = { id: 1, name: "zhufeng" };
  type User = typeof user;
  const res = pick<User, keyof User>(user, ["id", "name"]);
}
namespace d {
  type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>;
  };
  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    return { ...data, ...methods } as D & M;
  }
  let obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
      moveBy(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
      },
    },
  });
  obj.x = 10;
  obj.y = 20;
  obj.moveBy(5, 5);
  type Constructor<T = {}> = new (...args: any[]) => T;
  function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      timestamp = Date.now();
    };
  }
  function Activatable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      isActivated = false;
      activate() {
        this.isActivated = true;
      }
      deactivate() {
        this.isActivated = false;
      }
    };
  }
  class User {
    name = "";
  }
  const TimestampUser = Timestamped(User);
  const TimestamapActivatableUser = Timestamped(Activatable(User));
}
