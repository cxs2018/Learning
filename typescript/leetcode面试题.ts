interface Action<T> {
  payload?: T;
  type: string;
}
class EffectModule {
  count = 1;
  message = "Hello!";
  delay(input: Promise<number>): Promise<Action<string>> {
    return input.then((i) => ({
      payload: `hello ${i}`,
      type: "delay",
    }));
  }
  setMessage(action: Action<Date>): Action<number> {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message",
    };
  }
}

// 把 EffectModule 中的方法名取出来
type methodsPick<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;
type asyncMethodConnect<T, U> = (input: T) => Action<U>;
type syncMethod<T, U> = (action: Action<T>) => Action<U>;
type syncMethodConnect<T, U> = (action: T) => Action<U>;
type EffectModuleMethodsConnect<T> =
  T extends asyncMethod<infer U, infer V>
    ? asyncMethodConnect<U, V>
    : T extends syncMethod<infer U, infer V>
      ? syncMethodConnect<U, V>
      : never;
type EffectModuleMethods = methodsPick<EffectModule>;
type Connect = (module: EffectModule) => {
  [M in EffectModuleMethods]: EffectModuleMethodsConnect<EffectModule[M]>;
};

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};
const connect: Connect = (m: EffectModule): Connected => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello ${input}`,
  }),
  setMessage(action: Date): Action<number> {
    return {
      type: "set-Message",
      payload: action.getMilliseconds(),
    };
  },
});
export const connected: Connected = connect(new EffectModule());
