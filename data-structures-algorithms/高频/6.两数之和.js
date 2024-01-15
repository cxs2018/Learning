/**
 * https://leetcode.cn/problems/two-sum/description/
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 暴力
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

var twoSum = function (nums, target) {
  let memo = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (memo.has(target - nums[i])) {
      return [memo.get(target - nums[i]), i];
    }
    memo.set(nums[i], i);
  }
};

{
  /**
   * https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/
   * 数组是有序的，非递减
   */
  /**
   * @param {number[]} numbers
   * @param {number} target
   * @return {number[]}
   */
  var twoSum = function (numbers, target) {
    function binary(arr, left, right, target) {
      if (left > right) {
        return -1;
      }
      const middle = left + Math.floor((right - left) / 2);
      if (arr[middle] < target) {
        return binary(arr, middle + 1, right, target);
      } else if (arr[middle] > target) {
        return binary(arr, left, middle - 1, target);
      } else {
        return middle;
      }
    }
    for (let i = 0; i < numbers.length; i++) {
      const index = binary(
        numbers,
        i + 1,
        numbers.length - 1,
        target - numbers[i],
      );
      if (index !== -1) {
        return [i + 1, index + 1];
      }
    }
  };
}

{
  // 有序数数组 迭代版本
  var twoSum = function (numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
      let left = i + 1;
      let right = numbers.length;
      while (left < right) {
        const middle = left + ((right - left) >> 1);
        if (numbers[middle] === target - numbers[i]) {
          return [i + 1, middle + 1];
        } else if (numbers[middle] < target - numbers[i]) {
          left = middle + 1;
        } else {
          right = middle;
        }
      }
    }
    return [-1, -1];
  };
}

// function binary(arr, left, right, target) {
//   if (left > right) {
//     return -1;
//   }
//   const middle = left + Math.floor((right - left) / 2);
//   if (arr[middle] < target) {
//     return binary(arr, middle + 1, right, target);
//   } else if (arr[middle] > target) {
//     return binary(arr, left, middle - 1, target);
//   } else {
//     return middle;
//   }
// }
//
// const arr = [1, 3, 4, 4, 6, 9, 9, 10];
// console.log(binary(arr, 0, arr.length - 1, 4));
