// 回溯思路 求最值 =》穷举所有可能结果，然后对比得出最值
// 1. 如何穷举出所有可能的结果？回溯、动态规划 暴力穷举，根据状态转移方程推导状态

function maxCoins(nums) {
  var n = nums.length;
  var points = new Array(n + 2);
  // 两端加入两个虚拟气球
  points[0] = points[n + 1] = 1;
  for (var i = 1; i <= n; i++) {
    points[i] = nums[i - 1];
  }
  // base case 已经都初始化为0
  var dp = new Array(n + 2).fill(0).map(() => new Array(n + 2).fill(0));
  // 开始状态转移
  // i 应该从上到下
  for (i = n; i >= 0; i--) {
    // j应该从左到右
    for (j = i + 1; j < n + 2; j++) {
      // 最后戳破的气球是哪个？
      for (k = i + 1; k < j; k++) {
        // 择优做选择
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + points[i] * points[k] * points[j]
        );
      }
    }
  }
  return dp[0][n + 1];
}
