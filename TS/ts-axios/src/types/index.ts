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
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

interface AxiosPromise extends Promise<AxiosResponse> {}

interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
}

export { Method, AxiosRequestConfig, AxiosResponse, AxiosPromise, AxiosError }
