// nums=[1,2,3,-1,3,4,5];
// dp[i] 为以 nums[i] 结尾的最大子数组的和
// 已知dp[i-1]，如何推导dp[i]
// 有两种选择，1. 跟在后面，形成更大的子数组，2. 自己成一个数组

function maxSubArray(nums) {
  var n = nums.length;
  if (n === 0) {
    return 0;
  }
  var dp = new Array(n);
  dp[0] = nums[0];
  for (var i = 1; i < n; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
  }
  var res = Infinity;
  for (var i = 0; i < n; i++) {
    res = Math.max(res, dp[i]);
  }
  return res;
}

// 空间复杂度优化 dp[i]只跟dp[i-1]有关
function maxSubArrayOptimize(nums) {
  var n = nums.length;
  if (n === 0) {
    return 0;
  }
  var dpLast = 0,
    dpCur = 0,
    res = -Infinity;
  for (var i = 1; i < n; i++) {
    dpCur = Math.max(nums[i], dpLast + nums[i]);
    dpLast = dpCur;
    res = Math.max(res, dpCur);
  }
  return res;
}
