/**
 * 给你一个链表的头节点 head ，判断链表中是否有环。
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
 * 如果链表中存在环 ，则返回 true 。 否则，返回 false 。
 */
{
  // 哈希
  const hasCycle = function (head) {
    if (head === null || head.next === null) {
      return false;
    }
    let pos = -1;
    const map = new Map();
    while (head !== null) {
      if (!map.has(head)) {
        map.set(head, ++pos);
      } else {
        return true;
      }
      head = head.next;
    }
    return false;
  };
}

{
  // 双指针（快慢指针）
  const hasCycle = function (head) {
    let fast = head;
    let slow = fast;
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
      if (fast === slow) {
        return true;
      }
    }
    return false;
  };
}

/**
 * 环形链表2，返回环的入口
 */
{
  // 哈希
  const detectCycle = function (head) {
    if (head == null || head.next == null) {
      return null;
    }
    let pos = -1;
    const map = new Map();
    while (head !== null) {
      if (!map.has(head)) {
        map.set(head, ++pos);
      } else {
        return head;
      }
      head = head.next;
    }
    return null;
  };
}

{
  // 双指针（快慢指针）
  const detectCycle = function (head) {
    let isLoop = false;
    let fast = head;
    let slow = fast;
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
      if (fast === slow) {
        isLoop = true;
        break;
      }
    }
    if (!isLoop) {
      return null;
    }
    let temp = head;
    while (temp !== fast) {
      temp = temp.next;
      fast = fast.next;
    }
    return fast;
  };
}
