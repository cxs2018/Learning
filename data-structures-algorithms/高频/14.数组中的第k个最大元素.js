/**
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/description/
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  function quickselect(nums, l, r, k) {
    if (l === r) {
      return nums[k];
    }
    let x = nums[l],
      i = l - 1,
      j = r + 1;
    while (i < j) {
      do {
        i++;
      } while (nums[i] < x);
      do {
        j--;
      } while (nums[j] > x);
      if (i < j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
    if (k <= j) {
      return quickselect(nums, l, j, k);
    } else {
      return quickselect(nums, j + 1, r, k);
    }
  }
  return quickselect(nums, 0, nums.length - 1, nums.length - k);
};
