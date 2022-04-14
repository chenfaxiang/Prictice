/*
 * 题目：
 * 设计一个链表，实现如下功能：
 * 1. get(index) 获取链表第 index 个节点的数值
 * 2. addAtHead() 在链表的最前面插入一个节点
 * 3. addAtTail() 在链表的最后面插入一个节点
 * 4. addAtIndex() 在链表第 index 个节点前面插入一个节点
 * 5. deleteAtIndex() 删除链表的第 index 个节点
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

CustomLinkList.prototype.getNode = function(index) {}
CustomLinkList.prototype.get = function(index) {}
CustomLinkList.prototype.addAtHead = function(val) {}
CustomLinkList.prototype.addAtTail = function(val) {}
CustomLinkList.prototype.addAtIndex = function(val, index) {}
CustomLinkList.prototype.deleteAtIndex = function(index) {}
