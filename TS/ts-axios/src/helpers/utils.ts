const toString = Object.prototype.toString

/**
 * 时间数据类型判断
 * @param val 待判断的参数信息
 * @returns boolean 值
 *
 * val is Date 这种写法叫类型谓词，类型谓词的作用是当代码在没法自动判断其类型时，我们自己能明确判断当前的类型
 * 这种情况就可以用类型谓词的形式给我们的返回值做一个具体的类型说明，最终在使用的地方就能够识别到对应的类型，进而使用
 * 该类型下的所有属性及方法
 */
function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断所有能返回 object 类型的数据
 * 该判断形式区别于 toString.call(val) === '[object Object]',这里会返回真正的 object 数据类型
 * 而通过 typeof val === 'object' 判断的数据包括 object/blob/formData 等
 * @param val 待判断的参数信息
 * @returns boolean 值
 */
function isObject(val: any): val is Object {
  // return toString.call(val) === '[object Object]';
  return val !== null && typeof val === 'object'
}

/**
 * 普通对象数据的判断
 * @param val 待判断的参数信息
 * @returns boolean 值
 */
function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * 将 from 的所有属性合并到 to 中，包括原型上的属性
 * @param to 待合入的数据
 * @param from 待被合入的数据
 * @returns
 */
function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export { isDate, isObject, isPlainObject, extend }
