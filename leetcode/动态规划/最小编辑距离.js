// s1: rad s2: apple 三种操作：删除、插入、替换，将 s1 变成 s2，最少需要几步
// dp[i][j]，为 s1[0,...,i-1] 和 s2[0,...,j-1] 的最小编辑距离

// 超时，存在大量重复路径
function minDistance(s1, s2) {
  function dp(i, j) {
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;
    if (s1[i] === s1[j]) {
      return dp(i - 1, j - 1);
    } else {
      return Math.min(dp(i, j - 1) + 1, dp(i - 1, j) + 1, dp(i - 1, j - 1) + 1);
    }
  }

  return dp(s1.length - 1, s2.length - 1);
}

// 备忘录 空间换时间
function minDistanceMemo(word1, word2) {
  var memo = new Map();
  function dp(i, j) {
    var key = i + "_" + j;
    if (memo.get(key)) {
      return memo.get(key);
    }
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;
    var res;
    if (word1[i] === word2[j]) {
      res = dp(i - 1, j - 1);
    } else {
      res = Math.min(dp(i, j - 1) + 1, dp(i - 1, j) + 1, dp(i - 1, j - 1) + 1);
    }
    memo.set(key, res);
    return res;
  }

  return dp(word1.length - 1, word2.length - 1);
}

// DP Table
function minDistanceDPTable(word1, word2) {
  var m = word1.length,
    n = word2.length;
  var dp = new Array(m + 1).fill(0).map(() => new Array(n + 1));
  for (var i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (var i = 0; i <= n; i++) {
    dp[0][i] = i;
  }
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // 跳过
      } else {
        dp[i][j] = Math.min(
          dp[i][j - 1] + 1, // 插入
          dp[i - 1][j] + 1, // 删除
          dp[i - 1][j - 1] + 1 // 替换
        );
      }
    }
  }

  return dp[m][n];
}
