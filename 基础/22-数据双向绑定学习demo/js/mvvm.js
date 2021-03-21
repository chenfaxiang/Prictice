console.log('-- mvvm.js');

class MVVM {
  constructor(options) {
    this._options = options;
    let data = this._data = options.data();

    Object.keys(data).forEach(key => {
      this._proxy(this, key);
    });

    // 将数据的键值进行数据劫持，设置 get,set
    observer(data);

    // 编译模板数据
    let dom = document.getElementById(options.el);
    new Compile(dom, this);
  }

  // 将 this.data.key 处理成 this.key 也能访问
  _proxy(vm, key, val) {
    // 把 key 值绑定到 vm 上并返回
    // 即通过 this.data.key 和 this.key 都能访问到对应的数据
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;

      }
    })
  }
}