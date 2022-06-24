/**
 * compose —— 组合函数
 * 组合函数是指将多个函数按顺序执行，前一个函数的返回值作为下一个函数的参数，最终返回结果。
 * 好处：可以将复杂任务分割成多个子任务，然后通过组合函数再组合成复杂任务。
 * 
 * 形如：
 * function fn1(num) {
 *    return num + 1;
 * }
 * function fn2(num) {
 *    return num + 2;
 * }
 * function fn3(num) {
 *    return num + 3;
 * }
 * 
 * 调用：
 * const fn = compose(fn1, fn2, fn3)
 * fn(1) => 得到累加后的结果 7
 */

/**
 * 情况一
 * 
 * 第一个函数执行时接收的参数固定且只有一个
 * const fn = compose(fn1, fn2, fn3)
 * fn(1)
 */
function compose(...fns) {
  // compose 没有函数时，返回一个函数，接收传入的参数并返回结果即可
  if(!fns) return (v) => v;
  // compose 执行只有一个参数时，返回当前参数数据，供后续执行即可
  if(fns.length === 1) return fns[0];

  // 其他情况则需要返回一个函数，利用 reduce 进行函数的组合操作
  return (param) => {
    // accumulator 是累加器的初始值
    // currentVal 是当前执行 reduce 操作的数组值，即某一个 function
    // 因此，currentVal(accumulator) 相当于 函数执行并传入前一个函数的返回作为参数
    return fns.reduce((accumulator, currentVal) => currentVal(accumulator), param);
  }
}
function fn1(num) {
  return num + 1;
}
function fn2(num) {
  return num + 2;
}
function fn3(num) {
  return num + 3;
}
const fn = compose(fn1, fn2, fn3)
console.log(fn(1)); // 1 + 1 + 2 + 3 = 7


/**
 * 情况二
 * 
 * 第一个函数执行时接收的参数不固定
 * const fn = compose(fn1, fn2, fn3)
 * fn(1,2,3)
 */
function compose1(...fns) {
  if(!fns) return (v) => v;
  if(fns.length === 1) return fns[0];

  return function(...args) {
    const [first, ...rest] = fns;
    // 第一个函数执行时接收多个参数
    const initialVal = first.apply(this, args);

    // 获取到第一个函数的返回参数后，继续执行后续的其他函数，initialVal 作为初始值传入 reduce
    return rest.reduce((accumulator, currentVal) => currentVal(accumulator), initialVal);
  }
}
function fn4(num1, num2, num3) {
  return num1 + num2 + num3 + 1;
}
function fn5(num) {
  return num + 2;
}
function fn6(num) {
  return num + 3;
}
const fn7 = compose1(fn4, fn5, fn6)
console.log(fn7(1, 2, 3)); // 输出 1 + 2 + 3 + 1 + 2 + 3 = 12

