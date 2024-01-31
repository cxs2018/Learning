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

{
  /**
   * 升序，大顶堆（大根堆）
   * @param arr
   */
  function heapSort(arr) {
    function swap(arr, i, j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    function adjustHeap(arr, i, length) {
      let temp = arr[i]; // 先取出当前元素 i
      for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
        // 从左子节点开始遍历
        if (k + 1 < length && arr[k] < arr[k + 1]) {
          // 右子节点比左子节点更大
          k++;
        }
        if (arr[k] > temp) {
          // 子节点比当前节点大，要交换了
          arr[i] = arr[k]; // 将子节点的值赋值给当前节点
          i = k; // 将子节点作为当前节点，继续调整
        } else {
          break;
        }
      }
      arr[i] = temp; // 将最初的节点值赋值到子节点
    }
    // 建堆
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      // 从最后一个非叶子节点开始，从右到左，从下到上调整堆
      adjustHeap(arr, i, arr.length);
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      swap(arr, 0, i); // 交换堆顶元素和最后一个元素
      adjustHeap(arr, 0, i); // 调整堆
    }
  }
  const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  heapSort(arr);
  console.log("version2", arr);
}

{
  /**
   * 降序，小顶堆（小根堆）
   * @param arr
   */
  function heapSort(arr) {
    function swap(arr, i, j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    function adjustHeap(arr, i, length) {
      let temp = arr[i];
      for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
        if (k + 1 < length && arr[k] > arr[k + 1]) {
          k++;
        }
        if (temp < arr[k]) {
          break;
        } else {
          arr[i] = arr[k];
          i = k;
        }
      }
      arr[i] = temp;
    }
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      adjustHeap(arr, i, arr.length);
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      swap(arr, 0, i);
      adjustHeap(arr, 0, i);
    }
  }
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  heapSort(arr);
  console.log("降序", arr);
}
