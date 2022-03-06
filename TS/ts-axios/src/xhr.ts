import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { HEADERS_CONFIG, API_REQUEST_CODE } from './config'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    // open 之后可以设置 headers
    // 设置 headers 的值时，所有的属性在结尾都不应该有 ; 这种字符，它不合法，会导致返回的数据不正确
    // 比如设置 Content-Type 时的值只能是这种 'Content-Type': 'application/json;charset=utf-8' 或者 'Content-Type': ‘application/json'
    // 如果设置成 'application/json;charset=utf-8;' 或者 'application/json;' 就会导致返回值为空对象({})，原因就是最后多了一个 ;
    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === HEADERS_CONFIG.CONTENT_TYPE.toUpperCase()) {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    request.onreadystatechange = function handleLoad() {
      // XMLHttpRequest.DONE === 4
      if (request.readyState !== XMLHttpRequest.DONE) {
        return
      }

      // 网络错误或者请求错误时返回的状态码是 0
      if (request.status === API_REQUEST_CODE.NETWORK_ERROR) {
        return
      }

      const responseHeader = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request
      }
      handleResponse(response)
    }
    request.onerror = function handleError() {
      reject(createError('Network Error!', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }

    function handleResponse(resp: AxiosResponse): void {
      if (
        request.status >= API_REQUEST_CODE.SUCCESS_CODE &&
        request.status < API_REQUEST_CODE.REDIRECT_CODE
      ) {
        resolve(resp)
      } else {
        reject(
          createError(
            `Request failed with status code ${request.status}`,
            config,
            null,
            request,
            resp
          )
        )
      }
    }
  })
}
