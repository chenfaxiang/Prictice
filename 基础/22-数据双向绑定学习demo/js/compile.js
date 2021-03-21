console.log('-- compile.js');

class Compile {
  constructor(dom, vm) {
    this._vm = vm;
    this._dom = dom;

    this._compileElement(dom);
  }

  _compileElement(dom) {
    let childNodes = dom.childNodes;
    Array.from(childNodes).forEach(node => {
      if (node.childNodes && node.childNodes.length) {
        this._compileElement(node);
      } else {
        this._compile(node);
      }
    });
  }

  _compile(node) {
    if (node.nodeType === 3) {
      // 文本节点
      let reg = /\{\{(.*)\}\}/;
      let text = node.textContent;
      if (reg.test(text)) {
        let key = RegExp.$1;
        node.textContent = this._vm[key];
        new Watcher(this._vm, key, val => {
          node.textContent = val;
        });
      }
    } else if (node.nodeType === 1) {
      // 元素节点
      let nodeAttr = node.attributes;
      Array.from(nodeAttr).forEach(attr => {
        if (attr.nodeName === 'v-model') {
          node.value = this._vm[attr.nodeValue];
          node.addEventListener('input', () => {
            this._vm[attr.nodeValue] = node.value;
          });
          new Watcher(this._vm, attr.nodeValue, val => {
            node.value = val;
          });
        }
      });
    }
  }
}