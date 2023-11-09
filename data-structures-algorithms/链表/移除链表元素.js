/**
 * 在链表中删除指定的元素
 */
function removeElement(head, val) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let cur = dummyHead;
  while (cur.next !== null) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return dummyHead.next;
}
