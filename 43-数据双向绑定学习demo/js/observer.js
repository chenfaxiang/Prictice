console.log('-- observer.js');

let Target = null;

function observer(data) {
  // 不是传入的 object 数据或者在遍历到最后一个没有下层子数据的data时直接返回
  if (typeof data !== 'object') return false;

  Object.keys(data).forEach(key => {
    // 遍历data的所有键
    _defineReactive(data, key, data[key]);
  });
}

function _defineReactive(data, key, val) {
  observer(val);
  let dep = new Dep();
  // 将data里的键分别设置 get,set 进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      Target && dep.addSub(Target);
      return val;
    },
    set(newVal) {
      val = newVal;
      dep.notify();
    }
  })
}