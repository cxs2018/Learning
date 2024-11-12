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
