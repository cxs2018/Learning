import { AxiosRequestConfig, AxiosResponse } from "./types";
import qs from "qs";
import parseHeaders from "parse-headers";
import AxiosInterceptorsManager, {
  Interceptor,
} from "./AxiosInterceptorsManager";

let defaults: AxiosRequestConfig = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      accept: "application/json",
    },
  },
};
let getStyleMethods = ["get", "head", "delete", "options"];
getStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {};
});
let postStyleMethods = ["put", "post", "patch"];
postStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {
    "content-type": "application/json",
  };
});
let allMethods = [...getStyleMethods, ...postStyleMethods];

export default class Axios<T> {
  public defaults: AxiosRequestConfig = defaults;
  public interceptors = {
    request: new AxiosInterceptorsManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorsManager<AxiosResponse<T>>(),
  };
  request(
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    config.headers = Object.assign(this.defaults.headers, config.headers);
    const chain: Array<any> = [
      {
        onFulfilled: this.dispatchRequest,
        onRejected: (error: any) => error,
      },
    ];
    this.interceptors.request.interceptors.forEach(
      (interceptor: Interceptor<AxiosRequestConfig> | null) => {
        interceptor && chain.unshift(interceptor);
      },
    );
    this.interceptors.response.interceptors.forEach(
      (interceptor: Interceptor<AxiosResponse<T>> | null) => {
        interceptor && chain.push(interceptor);
      },
    );
    let promise: Promise<AxiosRequestConfig | AxiosResponse<T>> =
      Promise.resolve(config);
    while (chain.length) {
      const { onFulfilled, onRejected } = chain.shift();
      promise = promise.then(onFulfilled, onRejected);
    }
    return promise;
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let { method, url, params, headers, data, timeout } = config;
      let newParams;
      if (params && typeof params === "object") {
        newParams = qs.stringify(params);
        url += (url!.indexOf("?") !== -1 ? "&" : "?") + newParams;
      }
      request.open(method!, url!, true);
      request.responseType = "json";
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 0) {
          if (request.status >= 200 && request.status < 300) {
            let response: AxiosResponse<T> = {
              data: request.response || request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request,
            };
            resolve(response);
          } else {
            reject("请求失败");
          }
        }
      };
      if (headers) {
        for (const key in headers) {
          // request.setRequestHeader(key, headers[key]);
          if (key === "common" || key === config.method) {
            for (const key2 in headers[key]) {
              request.setRequestHeader(key2, headers[key][key2]);
            }
          } else {
            request.setRequestHeader(key, headers[key]);
          }
        }
      }
      let body: string | null = null;
      if (data) {
        body = JSON.stringify(data);
      }
      request.onerror = function () {
        reject("网络异常");
      };
      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = function () {
          reject("超时了");
        };
      }
      request.send(body);
    });
  }
}
