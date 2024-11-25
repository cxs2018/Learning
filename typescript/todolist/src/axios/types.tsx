import AxiosInterceptorsManager from "./AxiosInterceptorsManager";

export type Methods =
  | "get"
  | "GET"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "delete"
  | "DELETE"
  | "options"
  | "OPTIONS";

export interface AxiosRequestConfig {
  url?: string;
  method?: Methods;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  data?: Record<string, any>;
  timeout?: number;
  transformRequest?: (data: any, headers: any) => any;
  transformResponse?: (response: any) => any;
  cancelToken?: any;
  isCancel?: any;
}

export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  interceptors: {
    request: AxiosInterceptorsManager<AxiosRequestConfig>;
    response: AxiosInterceptorsManager<AxiosResponse>;
  };
  cancelToken: any;
  isCancel: any;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: Record<string, any>;
  config?: AxiosRequestConfig;
  request?: XMLHttpRequest;
}
