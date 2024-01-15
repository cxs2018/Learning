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

{
  // 双指针
  var twoSum = function (numbers, target) {
    let left = 0,
      right = numbers.length - 1;
    while (left <= right) {
      const curValue = numbers[left] + numbers[right];
      if (curValue === target) {
        return [left + 1, right + 1];
      } else if (curValue < target) {
        left++;
      } else {
        right--;
      }
    }
    return [-1, -1];
  };
}

/**
 * 初始时两个指针分别指向第一个元素位置和最后一个元素的位置。每次计算两个指针指向的两个元素之和，并和目标值比较。如果两个元素之和等于目标值，则发现了唯一解。如果两个元素之和小于目标值，则将左侧指针右移一位。如果两个元素之和大于目标值，则将右侧指针左移一位。移动指针之后，重复上述操作，直到找到答案。
 *
 * 使用双指针的实质是缩小查找范围。那么会不会把可能的解过滤掉？答案是不会。假设 numbers[i]+numbers[j]=target\textit{numbers}[i]+\textit{numbers}[j]=\textit{target}numbers[i]+numbers[j]=target 是唯一解，其中 0≤i<j≤numbers.length−10 \leq i<j \leq \textit{numbers}.\textit{length}-10≤i<j≤numbers.length−1。初始时两个指针分别指向下标 000 和下标 numbers.length−1\textit{numbers}.\textit{length}-1numbers.length−1，左指针指向的下标小于或等于 iii，右指针指向的下标大于或等于 jjj。除非初始时左指针和右指针已经位于下标 iii 和 jjj，否则一定是左指针先到达下标 iii 的位置或者右指针先到达下标 jjj 的位置。
 *
 * 如果左指针先到达下标 iii 的位置，此时右指针还在下标 jjj 的右侧，sum>target\textit{sum}>\textit{target}sum>target，因此一定是右指针左移，左指针不可能移到 iii 的右侧。
 *
 * 如果右指针先到达下标 jjj 的位置，此时左指针还在下标 iii 的左侧，sum<target\textit{sum}<\textit{target}sum<target，因此一定是左指针右移，右指针不可能移到 jjj 的左侧。
 *
 * 由此可见，在整个移动过程中，左指针不可能移到 iii 的右侧，右指针不可能移到 jjj 的左侧，因此不会把可能的解过滤掉。由于题目确保有唯一的答案，因此使用双指针一定可以找到答案。
 */
