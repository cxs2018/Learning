// 给定不同面额的硬币coins和一个总金额amount，写一个函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个
// for 状态1 in 状态1的所有取值
//    for 状态2 in 状态2的所有取值
//        for...
//            dp[状态1][状态2][...] = 计算(选择1，选择2...)
// dp[i][j]: 若只使用前i个物品，当背包容量为j时，有dp[i][j]种方法可以装满背包
function change(amount, coins) {
  var n = coins.length;
  // n 为 0 时，表示没有硬币，什么也装不了
  var dp = new Array(n + 1).fill(0).map(() => new Array(amount + 1).fill(0));
  for (var i = 0; i <= n; i++) {
    // amount 为0时，只有一种装法，那就是什么也不装
    dp[i][0] = 1;
  }
  for (var i = 1; i <= n; i++) {
    for (var j = 1; j <= amount; j++) {
      if (j - coins[i - 1] >= 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n][amount];
}

function changeStateReduction(amount, coins) {
  var n = coins.length;
  var dp = new Array(amount + 1);
  dp[0] = 1;
  for (i = 0; i < n; i++) {
    for (var j = 1; j <= amount; j++) {
      if (j - coins[i] >= 0) {
        dp[j] = dp[j] + dp[j - coins[i]];
      }
    }
  }
  return dp[amount];
}
