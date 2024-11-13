/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let arrA = [];
  let arrB = [];
  // 找到非负数的第一个位置
  let zeroPosition = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= 0) {
      zeroPosition = i;
      break;
    }
  }
  if (zeroPosition !== -1) {
    // 没有负数
    let left = zeroPosition - 1;
    while (left >= 0) {
      arrA.push(nums[left] * nums[left]);
      left--;
    }
    let right = zeroPosition;
    while (right < nums.length) {
      arrB.push(nums[right] * nums[right]);
      right++;
    }
  } else {
    let i = nums.length - 1;
    while (i >= 0) {
      arrA.push(nums[i] * nums[i]);
      i--;
    }
  }
  // 合并两个有序数组
  let aIndex = 0;
  let bIndex = 0;
  const res = [];
  while (aIndex < arrA.length && bIndex < arrB.length) {
    if (arrA[aIndex] < arrB[bIndex]) {
      res.push(arrA[aIndex]);
      aIndex++;
    } else {
      res.push(arrB[bIndex]);
      bIndex++;
    }
  }
  while (aIndex < arrA.length) {
    res.push(arrA[aIndex]);
    aIndex++;
  }
  while (bIndex < arrB.length) {
    res.push(arrB[bIndex]);
    bIndex++;
  }
  return res;
};
function sortedSquares2(nums) {
  // 找到负数和非负数边界
  const n = nums.length;
  let negative = -1;
  for (let i = 0; i < n; i++) {
    if (nums[i] < 0) {
      negative = i;
    }
  }
  let i = negative,
    j = negative + 1;
  const res = [];
  while (i >= 0 || j < n) {
    if (i < 0) {
      res.push(nums[j] * nums[j]);
      j++;
    } else if (j >= n) {
      res.push(nums[i] * nums[i]);
      i--;
    } else if (nums[i] * nums[i] < nums[j] * nums[j]) {
      res.push(nums[i] * nums[i]);
      i--;
    } else {
      res.push(nums[j] * nums[j]);
      j++;
    }
  }
  return res;
}
function sortedSquares3(nums) {
  const n = nums.length;
  let i = 0,
    j = n - 1,
    pos = n - 1;
  const res = new Array(n);
  while (i <= j) {
    if (-nums[i] > nums[j]) {
      res[pos] = nums[i] * nums[i];
      i++;
    } else {
      res[pos] = nums[j] * nums[j];
      j--;
    }
    pos--;
  }
  return res;
}
console.log(sortedSquares3([-7, -3, 2, 3, 11]));
