/*
 * 题目：
 * 反转一个单链表
 * 
 * 示例：
 * 输入： 1->2->3->4->5->NULL 
 * 输出： 5->4->3->2->1->NULL
 * 
 * 题解：
 * 首先定义一个 cur 指针，指向头结点；再定义一个 prev 指针，初始化为 null。
 * 然后就要开始反转，首先要把 cur->next 节点用 tmp 指针保存一下，也就是保存一下这个节点，
 * 接下来改变 cur->next 的指向，将cur->next 指向 prev ，此时已经反转了第一个节点，
 * 然后，循环走该逻辑，继续移动 prev 和 cur 指针；最后，cur 指针已经指向了 null，循环结束，return prev 指针就可以了
 */

/**
 * 双指针
 */
function reverseList(head) {
  if(!head || !head.next) return head;

  // 用于保存下一个节点
  let tmp;
  // 当前节点
  let cur = head;
  // 最前面的空节点
  let prev = null;

  // 只要当前节点不为 null，即没走到未翻转前的链表最后一个节点，则持续反转操作
  while(cur) {
    // 保存当前节点的下一个节点
    tmp = cur.next;
    // 反转当前节点
    cur.next = prev;

    // 移动 prev 和 cur 节点
    prev = cur;
    cur = tmp;
  }

  // 循环执行完，prev 移动到了未翻转前的链表尾节点，且各节点 next 指针已更换方向
  // prev 变成了新的头节点，返回即可
  return prev;
}

/**
 * 递归
 */
function reverseList1(head) {
  if(!head || !head.next) return head;
  reverse(null, head);
}
function reverse(prev, cur) {
  if (cur === null) return;
  let tmp = cur.next;
  cur.next = prev;

  // 和双指针法对比，reverse 的形参等于如下两句赋值
  // prev = cur;
  // cur = tmp;

  reverse(cur, tmp);
}
