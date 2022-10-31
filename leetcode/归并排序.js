// 315. 计算右侧小于当前元素的个数
var countSmaller = function (nums) {
  var n = nums.length;

  function Pair(val, id) {
    // 记录元素的元素值
    this.val = val;
    // 记录元素在数组中的原始索引
    this.id = id;
  }

  var temp = new Array(n);
  var count = new Array(n).fill(0);
  var arr = new Array(n);
  // 记录元素原始的索引位置，以便在count数组中更新结果
  for (var i = 0; i < n; i++) {
    arr[i] = new Pair(nums[i], i);
  }

  // 合并两个有序数组
  function merge(list, low, mid, high) {
    for (var i = low; i <= high; i++) {
      temp[i] = list[i];
    }

    var i = low,
      j = mid + 1;
    for (var k = low; k <= high; k++) {
      if (i === mid + 1) {
        list[k] = temp[j++];
      } else if (j === high + 1) {
        list[k] = temp[i++];
        count[list[k].id] += j - mid - 1;
      } else if (temp[i].val > temp[j].val) {
        list[k] = temp[j++];
      } else {
        list[k] = temp[i++];
        count[list[k].id] += j - mid - 1;
      }
    }
  }

  // 归并排序
  function sort(list, low, high) {
    if (low === high) {
      return;
    }
    var mid = Math.floor(low + (high - low) / 2);
    sort(list, low, mid);
    sort(list, mid + 1, high);
    merge(list, low, mid, high);
  }

  sort(arr, 0, n - 1);

  return count;
};

console.log(countSmaller([5, 2, 6, 1]));

// 493. 翻转对
var reversePairs = function (nums) {
  var n = nums.length;

  var temp = new Array(n);
  var count = 0;

  // 合并两个有序数组
  function merge(list, low, mid, high) {
    for (var i = low; i <= high; i++) {
      temp[i] = list[i];
    }

    var end = mid + 1;
    for (var i = low; i <= mid; i++) {
      while (end <= high && list[i] > list[end] * 2) {
        end++;
      }
      count += end - mid - 1;
    }

    var i = low,
      j = mid + 1;
    for (var k = low; k <= high; k++) {
      if (i === mid + 1) {
        list[k] = temp[j++];
      } else if (j === high + 1) {
        list[k] = temp[i++];
      } else if (temp[i] > temp[j]) {
        list[k] = temp[j++];
      } else {
        list[k] = temp[i++];
      }
    }
  }

  // 归并排序
  function sort(list, low, high) {
    if (low === high) {
      return;
    }
    var mid = Math.floor(low + (high - low) / 2);
    sort(list, low, mid);
    sort(list, mid + 1, high);
    merge(list, low, mid, high);
  }

  sort(nums, 0, n - 1);

  return count;
};

// 327. 区间和的个数
var countRangeSum = function (nums, lower, upper) {
  var preSum = new Array(nums.length + 1);
  preSum[0] = 0;
  for (var i = 0; i < nums.length; i++) {
    preSum[i + 1] = nums[i] + preSum[i];
  }

  var temp = new Array(nums.length);

  var count = 0;

  function merge(list, low, mid, high) {
    for (var i = low; i <= high; i++) {
      temp[i] = list[i];
    }

    var start = mid + 1,
      end = mid + 1;
    for (var i = low; i <= mid; i++) {
      while (start <= high && list[start] - list[i] < lower) {
        start++;
      }
      while (end <= high && list[end] - list[i] <= upper) {
        end++;
      }
      count += end - start;
    }

    var i = low,
      j = mid + 1;
    for (var k = low; k <= high; k++) {
      if (i === mid + 1) {
        list[k] = temp[j++];
      } else if (j === high + 1) {
        list[k] = temp[i++];
      } else if (temp[i] > temp[j]) {
        list[k] = temp[j++];
      } else {
        list[k] = temp[i++];
      }
    }
  }

  function sort(list, low, high) {
    if (low === high) {
      return;
    }
    var mid = Math.floor(low + (high - low) / 2);
    sort(list, low, mid);
    sort(list, mid + 1, high);
    merge(list, low, mid, high);
  }

  sort(preSum, 0, preSum.length - 1);

  return count;
};
