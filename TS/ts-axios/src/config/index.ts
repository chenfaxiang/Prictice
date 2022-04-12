const HEADERS_CONFIG = {
  CONTENT_TYPE: 'Content-Type'
}

const API_REQUEST_CODE = {
  // 200 <= x < 300 类型的都是成功的状态码
  SUCCESS_CODE: 200,
  // 网路错误或者请求错误的状态码
  NETWORK_ERROR: 0,
  // 300 类型的都是重定向
  REDIRECT_CODE: 300
}

export { HEADERS_CONFIG, API_REQUEST_CODE }
