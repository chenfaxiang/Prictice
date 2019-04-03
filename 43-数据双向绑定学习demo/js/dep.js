console.log('-- dep.js');

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(watcher) {
    let flag = true;
    for (let item of this.subs) {
      if (item._uid === watcher._uid) {
        flag = false;
        break;
      }
    }
    if (flag) this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}