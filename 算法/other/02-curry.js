/**
 * 函数柯里化
 * 
 * 原理：用闭包把参数保存起来，当参数的量足够执行函数了，就开始执行函数
 */

function curry(fn) {
  // 获取要执行方法的参数长度
  let paramsLen = fn.length;

  let args = Array.prototype.slice.call(arguments, 1) || [];

  return function() {
    // 保存参数
    for(let i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    // 参数不足时，递归调用 继续保存参数
    if(args.length < paramsLen) {
      return curry.call(this, fn, ...args);
    }

    // 参数足够，执行方法即可
    fn.apply(this, args);
  }
}

var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});
fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]
