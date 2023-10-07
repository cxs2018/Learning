/*
 * @Description:
 * @Author: cuixuesen
 * @Date: 2023-02-19 11:17:06
 * @LastEditTime: 2023-02-19 21:15:38
 * @LastEditors: your name
 */
// LIS: Longest Increasing Subsequence
function lengthOfLIS(nums) {
  // dp[i] 表示以nums[i]这个数结尾的最长递增子序列的长度
  var dp = new Array(nums.length).fill(1);
  for (var i = 0; i < nums.length; i++) {
    for (var j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  var res = -Infinity;
  for (var i = 0; i < dp.length; i++) {
    res = Math.max(dp[i], res);
  }
  return res;
}

// 二分搜索解法
function lengthOfLISBinarySearch(nums) {
  var top = new Array(nums.length);
  var piles = 0;
  for (var i = 0; i < nums.length; i++) {
    var poker = nums[i];

    var left = 0,
      right = piles;
    while (left < right) {
      // console.log(left, right);
      var mid = left + Math.floor((right - left) / 2);
      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === piles) {
      piles++;
    }
    top[left] = poker;
  }
  return piles;
}

// console.log(lengthOfLISBinarySearch([10, 9, 2, 5, 3, 7, 101, 18]));

// 信封嵌套问题：二维LIS
function maxEnvelopes(envelopes) {
  var n = envelopes.length;
  envelopes.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
  var height = new Array(n);
  for (var i = 0; i < n; i++) {
    height[i] = envelopes[i][1];
  }

  return lengthOfLISBinarySearch(height);
}

console.log(
  maxEnvelopes([
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3],
  ])
);
