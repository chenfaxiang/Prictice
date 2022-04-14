/*
 * 题目：
 * 设计一个链表，实现如下功能：
 * 1. get(index)             —— 获取链表第 index 个节点的数值；如果索引无效，则返回 -1。
 * 2. addAtHead(val)         —— 在链表的最前面插入一个节点；插入后，新节点将成为链表的第一个节点。
 * 3. addAtTail(val)         —— 将值为 val 的节点追加到链表的最后一个元素；
 * 4. addAtIndex(val, index) —— 在链表第 index 个节点前面插入一个节点；如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果 index 小于 0，则在头部插入节点。
 * 5. deleteAtIndex(index)   —— 删除链表的第 index 个节点；
 */

function LinkNode(val, next) {
  this.val = val;
  this.next = next;
}

/**
 * 自定义单链表
 * 头尾节点、节点数量
 */
function CustomLinkList() {
  this._size = 0;
  this._head = null;
  this._tail = null;
}

CustomLinkList.prototype.getNode = function(index) {
  if (index < 0 || index >= this._size) return null;
  
  // 创建虚拟头节点，这样在删除头节点时不用其他逻辑，而是直接正常删除就行
  // 如果没创建虚拟头节点，则删除头节点时将头节点向后移动一位即可
  let dummyHead = new LinkNode(0, this._head);
  // 当前节点就是创建的虚拟头节点
  let cur = dummyHead;
  
  // 有了虚拟头节点，正常位置的节点即是当前节点的下一个节点
  while(index-- >= 0) {
    cur = cur.next;
  }

  return cur;
}
CustomLinkList.prototype.get = function(index) {
  // 小于 0 或者 大于等于链表长度的位置，都返回 -1
  if (index < 0 || index >= this._size) return -1;

  // 正常位置的链表节点，返回当前节点的值
  return this.getNode(index).val;
}
CustomLinkList.prototype.addAtHead = function(val) {
  // 创建一个新节点，val = 0, next = this._head
  const node = new LinkNode(0, this._head);
  // 头节点赋值为新创建的 node
  this._head = node;
  this._size++;
  if (!this._tail) {
    this._tail = node;
  }
}
CustomLinkList.prototype.addAtTail = function(val) {
  // 创建一个尾结点， next = null
  const node = new LinkNode(val, null);
  this._size++;
  if (this._tail) {
    // 尾结点的 next 从指向 null 改为指向新创建的尾节点 node
    this._tail.next = node;
    // 原来的尾结点值用新创建的尾节点覆盖
    this._tail = node;
    return;
  }
  // 没有尾结点时，直接赋值
  this._tail = node;
  // 没有尾结点即没有链表，在赋值尾节点的同时赋值头节点
  this._head = node;
}
CustomLinkList.prototype.addAtIndex = function(val, index) {
  // 超过尾节点，不做添加
  if (index > this._size) return;

  // 小于等于 0，直接添加头节点
  if (index <= 0) {
    this.addAtHead(val);
    return;
  }
  // 等于尾节点值，添加尾节点
  if (index === this._size) {
    this.addAtTail(val);
    return;
  }

  // 获取到当前节点的前一个节点
  let node = this.getNode(index - 1);
  // 前一个节点的 next 指向新创建的节点
  node.next = new LinkNode(val, node);
  // 链表的总长度自增 1
  this._size++;
}
CustomLinkList.prototype.deleteAtIndex = function(index) {
  // 删除的位置小于 0 或者大于等于链表总长度，直接返回
  if (index < 0 || index >= this._size) return;

  // 删除头节点
  if (index === 0) {
    this._head = this._head.next;
    // 如果也是尾节点，则处理尾节点
    if (index === this._size - 1) {
      this._tail = this._head;
    }
    // 链表总长度自减 1
    this._size--;
    return;
  }

  // 删除其他节点
  // 获取删除位置的前一个节点
  let node = this.getNode(index - 1);
  node.next = node.next.next;

  // 处理尾节点
  if (index === this._size - 1) {
    this._tail = node;
  }
  // 链表总长度自减 1
  this._size--;
}

/**
 * const obj = new CustomLinkList()
 * const param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index, val)
 * obj.deleteAtIndex(index)
 */