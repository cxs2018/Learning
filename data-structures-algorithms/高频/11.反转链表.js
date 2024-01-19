/**
 * https://leetcode.cn/problems/reverse-linked-list/description/
 */
/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr != null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};

{
  // 递归版本
  function reverseList(head) {
    if (head == null || head.next == null) {
      return head;
    }
    const ret = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return ret;
  }

  const head = {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 4,
          next: {
            val: 5,
            next: null,
          },
        },
      },
    },
  };

  console.log(reverseList(head));
}
