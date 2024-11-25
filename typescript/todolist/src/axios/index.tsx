import Axios from "./Axios";
import { AxiosInstance, AxiosResponse } from "./types";
import { CancelToken, isCancel } from "./cancel";

// 可以创建一个 axios 的实例，它其实就是一个函数
function createInstance(): AxiosInstance {
  let context: Axios<AxiosResponse> = new Axios();
  let instance: AxiosInstance = Axios.prototype.request.bind(context) as any;
  Object.assign(instance, Axios.prototype, context);
  return instance;
}

let axios = createInstance();

axios.cancelToken = new CancelToken();
axios.isCancel = isCancel;

export default axios;

export * from "./types";
