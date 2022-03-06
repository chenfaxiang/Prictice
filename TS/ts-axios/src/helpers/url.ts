import { isDate, isPlainObject } from './utils'

function encode(val: string): string {
  return (
    encodeURIComponent(val)
      .replace(/%40/g, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      // %20 是一个空格，约定转义成 +
      .replace(/%2B/gi, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  )
}

function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  let parts: string[] = []

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === null || typeof value === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else {
      values = [value]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += `${url.indexOf('?') === -1 ? '?' : '&'}${serializedParams}`
  }

  return url
}

export { buildURL }
