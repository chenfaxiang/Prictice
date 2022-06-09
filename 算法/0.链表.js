/**
 * 链表的节点
 * 1. 当前节点的元素
 * 2. 下一个节点指针
 */
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

/**
 * 链表
 * 1. 增加
 * 2. 删除
 * 3. 打印
 * ... 其它方法待添加
 */
class LinkList {
  constructor() {
    // 头节点
    this.head = null;
    // 链表的长度
    this.length = 0;
  }

  /**
   * 增加节点元素
   */
  append(element) {
    const node = new Node(element)

    // 链表是空时
    if (this.head === null) {
      this.head = node;
    } else {
      let cur = this.head;
      // 找到最后一个节点
      while(cur.next) {
        cur = cur.next;
      }
      // 将新节点拼接在最后一个节点上
      cur.next = node;
    }
    this.length += 1;
  }

  /**
   * 删除节点元素
   * 利用哨兵节点做头节点，在删除是即不用考虑头节点
   * 哨兵==>first==>seconed==>third==>fourth==>fifth
   */
  removeAt(index) {
    if (index < 0 || index > this.length - 1) {
      console.log('索引值越界，删除失败');
      return;
    }
    // 数组长度越界的问题没有考虑
    let ele = {
      next: this.head,
    }
    let cur = ele;
    let prev = null;
    let i = 0;

    // 由于增加了哨兵节点，因此需要对删除的 index + 1
    while(i < index + 1) {
      prev = cur;
      cur = cur.next;
      i++;
    }
    // 找到之后，将上一个的 next 指针指向下一个 node 节点，因此达到删除当前节点的目的
    prev.next = cur.next;
    // 进行内存释放
    cur.next = null;
    this.length -= 1;
    
    // 对重新进行赋值，完成去除 哨兵 节点的操作
    this.head = ele.next;

    // 最终返回删除操作结束后的所有数据
    return this.head;
  }

  /**
   * 打印链表
   */
  print() {
    let cur = this.head;
    let ret = [];
    while(cur) {
      ret.push(cur.element);
      cur = cur.next;
    }

    console.log(ret.join('==>'));
    return ret.join('==>');
  }
}

const linkList = new LinkList();
linkList.append('first');
linkList.append('seconed');
linkList.append('third');
linkList.append('fourth');
linkList.append('fifth');
linkList.print();
linkList.removeAt(0);
linkList.print();