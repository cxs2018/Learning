/**
 * https://leetcode.cn/problems/sort-an-array/
 * 912
 * 快排超时
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  // 什么是快速排序？二分，选个锚点
  function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  function partition(nums, left, right) {
    let r = Math.floor(Math.random() * (right - left + 1) + left);
    swap(nums, r, right);
    const pivot = nums[right];
    let i = left - 1;
    for (let j = left; j <= right - 1; j++) {
      if (nums[j] < pivot) {
        i++;
        swap(nums, i, j);
      }
    }
    swap(nums, i + 1, right);
    return i + 1;
  }
  function quickSort(nums, left, right) {
    if (left < right) {
      const pivot = partition(nums, left, right);
      quickSort(nums, left, pivot - 1);
      quickSort(nums, pivot + 1, right);
    }
  }
  quickSort(nums, 0, nums.length - 1);
  return nums;
};
