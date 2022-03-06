import { isPlainObject } from './utils'
import { HEADERS_CONFIG } from '../config'

/**
 * 格式化 header 参数信息，例如标准的 Content-Type 是这样，但是使用者很可能在 headers 中传入的是这种 content-type key 值，因此需要进行标准化处理
 * 即全小写(content-type)或者其它形式(content-Type等)的值进行标准化处理
 * @param headers 使用者传入的 headers 参数信息
 * @param normalizeName 标准的 headers 参数名，例如 Content-Type
 * @returns
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, HEADERS_CONFIG.CONTENT_TYPE)

  if (isPlainObject(data)) {
    if (headers && !headers[HEADERS_CONFIG.CONTENT_TYPE]) {
      headers[HEADERS_CONFIG.CONTENT_TYPE] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 * 解析 XMLHttpRequest 请求返回的数据中字符串 headers 为 对象数据
 * 未解析前的数据如下：
 * "connection: keep-alive\r\ncontent-length: 17\r\ncontent-type: application/json; charset=utf-8\r\ndate: Sun, 06 Mar 2022 07:59:19 GMT\r\n"
 * @param headers
 * @returns
 */
function parseHeaders(headers: string): any {
  const parsedHeaders = Object.create(null)
  if (!headers) {
    return parsedHeaders
  }

  headers.split('\r\n').forEach(line => {
    const [key, val] = line.split(':')
    const lowerKey = key.trim().toLowerCase()
    if (!lowerKey) {
      // 当前的 key 为全空值，直接跳过当前的值处理下一个
      return
    }
    parsedHeaders[lowerKey] = val.trim()
  })

  return parsedHeaders
}

export { processHeaders, parseHeaders }
