interface OnFulfilled<V> {
  (value: V): V | Promise<V>;
}

interface OnRejected {
  (error: any): any;
}

export interface Interceptor<V> {
  onFulfilled: OnFulfilled<V>;
  onRejected?: OnRejected;
}

// export interface AxiosInterceptorManager<V> {
//   use(
//     onFulfilled?: (value: V) => V | Promise<V>,
//     onRejected?: (error: any) => any,
//   ): number;
//   eject(id: number): void;
// }

export default class AxiosInterceptorsManager<V> {
  public interceptors: Array<Interceptor<V> | null> = [];
  use(onFulfilled: OnFulfilled<V>, onRejected?: OnRejected) {
    this.interceptors.push({
      onFulfilled,
      onRejected,
    });
    return this.interceptors.length - 1;
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
