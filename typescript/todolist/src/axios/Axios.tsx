import { AxiosRequestConfig, AxiosResponse } from "./types";
import qs from "qs";
import parseHeaders from "parse-headers";
import AxiosInterceptorsManager, {
  Interceptor,
} from "./AxiosInterceptorsManager";

interface Interceptors {
  request: AxiosInterceptorsManager<AxiosRequestConfig>;
  response: AxiosInterceptorsManager<AxiosResponse>;
}

let defaults: AxiosRequestConfig = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      accept: "application/json",
    },
  },
  transformRequest: (data: any, headers: any) => {
    headers["common"]["content-type"] = "application/json";
    return JSON.stringify(data);
  },
  transformResponse: (response: any) => {
    return response.data;
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

export default class Axios {
  public defaults: AxiosRequestConfig = defaults;
  public interceptors: Interceptors = {
    request: new AxiosInterceptorsManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorsManager<AxiosResponse>(),
  };
  request<T>(
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    if (this.defaults.headers && config.headers) {
      config.headers = Object.assign(this.defaults.headers, config.headers);
    }
    if (config.transformRequest && config.data) {
      config.data = config.transformRequest(config.data, config.headers);
    }
    const chain: Interceptor[] = [
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
      const { onFulfilled, onRejected } = chain.shift()!;
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
            if (config.transformResponse) {
              response = config.transformResponse(response);
            }
            console.log("response.data", response.data);
            resolve(response);
          } else {
            reject("请求失败");
          }
        }
      };
      if (headers) {
        for (const key in headers) {
          if (key === "common" || allMethods.includes(key)) {
            if (key === config.method) {
              for (const key2 in headers[key]) {
                if (!(key2 in headers)) {
                  request.setRequestHeader(key2, headers[key][key2]);
                }
              }
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
      if (config.cancelToken) {
        config.cancelToken.then((message: string) => {
          request.abort();
          reject(message);
        });
      }
      request.send(body);
    });
  }
}
