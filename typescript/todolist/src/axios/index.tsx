import Axios from "./Axios";
import { AxiosInstance } from "./types";

// 可以创建一个 axios 的实例，它其实就是一个函数
function createInstance(): AxiosInstance {
  let context: Axios = new Axios();
  let instance: AxiosInstance = Axios.prototype.request.bind(context);
  Object.assign(instance, Axios.prototype, context);
  return instance;
}

let axios = createInstance();

export default axios;

export * from "./types";
