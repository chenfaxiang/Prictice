console.log('-- watcher.js');

let uId = 0;
class Watcher {
  constructor(vm, key, cb) {
    this._vm = vm;
    this._key = key;
    this._cb = cb;

    this._uid = uId;
    uId++;

    Target = this;
    // 这里的 vm[key] 触发 getter，在 getter 中添加观察者到目标中
    this._value = vm[key];
    Target = null;
  }

  update() {
    let value = this._vm[this._key];
    if (value !== this._value) {
      this._value = value;
      this._cb.call(this._vm, value);
    }
  }
}