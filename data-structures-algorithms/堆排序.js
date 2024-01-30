/**
 * 一篇图文并茂的文章 https://www.cnblogs.com/chengxiao/p/6129630.html
 * 知识点：
 * 1. 什么是大根堆、小根堆？
 * 2. 什么是满二叉树、完全二叉树？
 * 3. 什么是不稳定排序？
 */

/**
 * 下沉，迭代方式
 * 以 start 索引节点为根节点，调整为大顶堆
 * @param arr 堆数组
 * @param start 要下沉的元素索引
 * @param end 最后一个元素的索引
 */
function maxHeapify(arr, start, end) {
  let dad = start; // 父节点
  let son = dad * 2 + 1; // 左子节点
  while (son <= end) {
    if (son + 1 <= end && arr[son] < arr[son + 1]) {
      son++; // 右子节点大
    }
    if (arr[dad] > arr[son]) {
      // 父节点大于左右子节点，退出
      return;
    } else {
      // 交换父子节点的值
      let temp = arr[dad];
      arr[dad] = arr[son];
      arr[son] = temp;
      // 下一层
      dad = son;
      son = dad * 2 + 1;
    }
  }
}

/**
 * 下沉，递归方式
 * @param arr
 * @param start
 * @param end
 */
function maxHeapifyRecursively(arr, start, end) {
  let dad = start;
  let son = dad * 2 + 1;
  if (son > end) {
    // 递归结束条件，孩子的索引超过了最大索引
    return;
  }
  if (son + 1 <= end && arr[son] < arr[son + 1]) {
    son++;
  }
  if (arr[dad] < arr[son]) {
    // 交换父子节点的值
    let temp = arr[dad];
    arr[dad] = arr[son];
    arr[son] = temp;
    maxHeapifyRecursively(arr, son, end);
  }
}

function heapSort(arr) {
  let len = arr.length;
  // 建堆，i 从最后一个父节点开始调整
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    maxHeapifyRecursively(arr, i, len - 1);
  }
  // 先将第一个元素和已经排好的元素前一位做交换，再调整堆
  for (let i = len - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    maxHeapify(arr, 0, i - 1);
  }
}

const a = [
  3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7,
  4, 0, 2, 6,
];
heapSort(a);
console.log(a);
