/*
 * 移除链表元素
 * 题目：
 * 删除链表中等于给定值 val 的所有节点
 * 
 * 示例1：
 * 输入：head = [1, 2, 6, 3, 4, 5, 6], val = 6
 * 输出：[1, 2, 3, 4, 5]
 * 
 * 示例2：
 * 输入：head = [], val = 1
 * 输出：[]
 * 
 * 示例 3：
 * 输入：head = [7, 7, 7, 7], val = 7
 * 输出：[]
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === null ? null : next;
}

function removeElement(val, head) {
  // 初始化节点
  const ret = new ListNode(0, head);
  let cur = ret;

  // 一直循环，知道链表结尾
  while(cur.next) {
    // 当前节点的下一个节点的值和 val 相等，更改当前节点的 next 指向到 下一个节点的 next，即跳过当前节点的下一个节点
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    } else {
      // 当前节点移向下一个节点
      cur = cur.next;
    }
  }

  return ret.next;
}
