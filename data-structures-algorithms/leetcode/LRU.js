// LRU 缓存淘汰算法 Least Recently Used 最近最少使用
// 1. cache中的元素必须有时序，以区分最近使用和久未使用的数据，当容量满了之后要删除最久未使用的那个元素腾位置
// 2. 要在cache中快速找到某个key是否存在并得到对应的val
// 3. 每次访问cache中的某个key，需要将这个元素变为最近使用的，也就是说cache要支持在任意位置快速插入和删除元素
// 哈希链表：LinkedHashMap 查找快、有序、插入删除快 双向链表+哈希表
// 为什么要用双向链表？删除的时候，需要访问待删除元素的前一个元素，单链表无法用O(1)的时间做到
// 为什么链表要存key、val，只存val可不可以？不行，删除最近最久未使用的元素时，也需要从map中删除，不存key的话不行
// 双向链表的元素节点
class Node {
  constructor(k, v) {
    this.key = k;
    this.val = v;
    this.next = null;
    this.prev = null;
  }
}

class DoubleList {
  constructor() {
    // 初始化双向链表的数据
    this.head = new Node("head", 0);
    this.tail = new Node("tail", 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  /**
   * 在链表尾部添加节点x，时间复杂度为O(1)
   * @param {Node} x 节点
   * last -> tail
   * last <- tail
   * x
   */
  addLast(x) {
    // 先把x给链上
    x.prev = this.tail.prev;
    x.next = this.tail;
    // 再把tail的原链子断了
    this.tail.prev.next = x;
    this.tail.prev = x;
    // 数目+1
    this.size++;
  }

  /**
   * 删除链表中的x节点（x一定存在）
   * @param {*} x
   * a -> x -> b
   * a <- x <- b
   */
  remove(x) {
    x.prev.next = x.next;
    x.next.prev = x.prev;
    // x仍有引用链表的地方，单链表上已无指向x的引用
    this.size--;
  }

  /**
   * 删除链表的第一个节点，并返回该节点，时间复杂度为O(1)
   */
  removeFirst() {
    if (this.head.next == this.tail) {
      return null;
    }
    var first = this.head.next;
    this.remove(first);
    return first;
  }
}

class LRUCache {
  constructor(capacity) {
    // 最大容量
    this.cap = capacity;
    // key -> Node(key, val)
    this.map = new Map();
    // Node(k1,v1) <-> Node(k2,v2)...
    this.cache = new DoubleList();
  }

  /**
   * 将某个key提升为最近使用的
   * @param {*} key
   */
  makeRecently(key) {
    var x = this.map.get(key);
    // 先从链表中删除这个节点
    this.cache.remove(x);
    // 重新插到队尾
    this.cache.addLast(x);
  }

  /**
   * 添加最近使用的元素
   * @param {*} key
   * @param {*} val
   */
  addRecently(key, val) {
    var x = new Node(key, val);
    // 链表尾部就是最近使用的元素
    this.cache.addLast(x);
    // 在map中添加key的映射
    this.map.set(key, x);
  }

  /**
   * 删除某一个key
   * @param {*} key
   */
  deleteKey(key) {
    var x = this.map.get(key);
    // 从链表中删除
    this.cache.remove(x);
    // 从map中删除
    this.map.delete(key);
  }

  /**
   * 删除最久未使用的元素
   */
  removeLeastRecently() {
    // 链表头部的第一个元素就是最久未使用的
    var deleteNode = this.cache.removeFirst();
    // 从map中删除key
    var deleteKey = deleteNode.key;
    this.map.delete(deleteKey);
  }

  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }
    // 将该数据提升为最近使用的
    this.makeRecently(key);
    return this.map.get(key).val;
  }

  put(key, val) {
    if (this.map.has(key)) {
      // 1. 删了，再加
      this.deleteKey(key);
      this.addRecently(key, val);
      // 2. 提升，改值
      // this.makeRecently(key);
      // this.map.get(key).val = val;
    } else {
      if (this.cache.size < this.cap) {
        // 容量没满，直接加
        this.addRecently(key, val);
      } else {
        // 容量满了，先淘汰，再加
        this.removeLeastRecently();
        this.addRecently(key, val);
      }
    }
  }
}

function printLink(x) {
  var i = x.head;
  var res = [];
  while (i.next) {
    if (i.next.key !== "tail") {
      res.push([i.next.key, i.next.val]);
    }
    i = i.next;
  }
  console.log(res);
}

var cache = new LRUCache(2);

cache.put(1, 1);

printLink(cache.cache);

cache.put(2, 2);

printLink(cache.cache);

cache.get(1);

printLink(cache.cache);

cache.put(3, 3);

printLink(cache.cache);

cache.get(2);

printLink(cache.cache);

cache.put(1, 4);

printLink(cache.cache);
