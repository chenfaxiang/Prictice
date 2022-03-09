type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
}

interface Axios {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

interface RejectedFn {
  (error: any): any
}

export {
  Method,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
  AxiosInstance,
  Axios,
  AxiosInterceptorManager,
  ResolvedFn,
  RejectedFn
}
