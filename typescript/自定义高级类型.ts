export {};
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};
function proxify<T>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>;
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: (value: T[typeof key]) => (obj[key] = value),
    };
  }
  return result;
}
let props = {
  name: "zhufeng",
  age: 10,
};
let proxyProps = proxify(props);
console.log(proxyProps.name.get());
function unProxify<T>(t: Proxify<T>): T {
  let result = {} as T;
  for (const k in t) {
    result[k] = t[k].get();
  }
  return result;
}
let originProps = unProxify(proxyProps);
console.log(originProps.name);
originProps.name = "cxs";
console.log(originProps.name);
// Exclude：从 A 中排除可分配给 B 的元素
type Exclude<A, B> = A extends B ? never : A;
// Extract 从 T 可分配的类型中提取 U
type Extract<T, U> = T extends U ? T : never;
// SetDifference
type SetDifference<A, B> = A extends B ? never : A;
// Omit 忽略某些属性
type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;
// Diff 移除一些属性
type Diff<T extends object, U extends object> = Pick<
  T,
  SetDifference<keyof T, keyof U>
>;
// Intersection
type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;
type Props1 = { name: string; age: string; visible: boolean };
type Props2 = { age: number };
type Props3 = Intersection<Props1, Props2>;
type Props4 = Props1 & Props2;
// Overwrite
type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>,
> = Pick<I, keyof I>;
type Props5 = Overwrite<Props1, Props2>;
type O1 = {
  id: number;
  name: string;
};
type O2 = {
  id: number;
  age: number;
};
type Compute<A extends any> = A extends Function ? A : { [k in keyof A]: A[k] };
type Merge<O1 extends object, O2 extends object> = Compute<
  O1 & Omit<O2, keyof O1>
>;
type AnyType = any;
type KeyofAnyType = keyof any;
