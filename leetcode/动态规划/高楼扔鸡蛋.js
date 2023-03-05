// 当前状态为 K 个鸡蛋，面对 N 层楼
// 返回这个状态下的最优结果
var res = Infinity;
var memo = new Map();
function dp(K, N) {
  if (K === 1) {
    return N;
  }
  if (N === 0) {
    return 0;
  }
  var key = K + "_" + N;
  if (memo.get(key)) {
    return memo.get(key);
  }
  for (var i = 1; i <= N; i++) {
    res = Math.min(res, Math.max(dp(K - 1, i - 1), dp(K, N - i)) + 1);
  }
  memo.set(key, res);
  return res;
}

console.log(dp(2, 100));

// 原始动态规划的思路：
// 1. 暴力穷举尝试在所有楼层1<=i<=N扔鸡蛋，每次选择尝试次数最少的那一层
// 2. 每次扔鸡蛋有两种可能，要么碎，要么不碎
// 3. 如果鸡蛋碎了，F应该在第i层下面，否则，F应该在第i层上面
// 4. 鸡蛋是碎了还是没碎，取决于哪种情况下尝试次数更多，因为我们想求的是最坏情况下的结果
function superEggDrop(K, N) {
  var memo = new Map();
  function dp(K, N) {
    if (K === 1) {
      return N;
    }
    if (N === 0) {
      return 0;
    }
    var key = K + "_" + N;
    if (memo.get(key)) {
      return memo.get(key);
    }
    var res = Infinity;
    var lo = 1,
      hi = N;
    while (lo <= hi) {
      var mid = Math.floor((lo + hi) / 2);
      var broken = dp(K - 1, mid - 1); // 没碎
      var not_broken = dp(K, N - mid); // 没碎
      if (broken > not_broken) {
        hi = mid - 1;
        res = Math.min(res, broken + 1);
      } else {
        lo = mid + 1;
        res = Math.min(res, not_broken + 1);
      }
      memo.set(key, res);
    }
    return res;
  }
  return dp(K, N);
}

console.log(superEggDrop(2, 100));

// 递归算法的时间复杂度=子问题的个数*函数本身的复杂度

function superEggDropV2(K, N) {
  // dp[k][m] = n; 当前有k个鸡蛋，最多可以尝试扔m次，在这个状态下，最坏情况下最多能确切测试一栋n层的楼
  var dp = new Array(K + 1).fill(0).map(() => new Array(N + 1).fill(0));
  var m = 0;
  while (dp[K][m] < N) {
    m++;
    for (var k = 1; k <= K; k++) {
      dp[k][m] = dp[k][m - 1] + dp[k - 1][m - 1] + 1;
    }
  }
  return m;
}

console.log(superEggDropV2(2, 100));
