// LCS: Longest Common Subsequence
function longestCommonSubsequence(str1, str2) {
  var dp = function (i, j) {
    if (i === -1 || j === -1) {
      return 0;
    }
    if (str1[i] === str2[j]) {
      return dp(i - 1, j - 1) + 1;
    } else {
      return Math.max(dp(i - 1, j), dp(i, j - 1));
    }
  };
  return dp(str1.length - 1, str2.length - 1);
}

/**
 * DP Table 优化时间复杂度
 */
function longestCommonSubsequenceDpTable(str1, str2) {
  var m = str1.length;
  var n = str2.length;
  var dp = new Array(m + 1).fill(new Array(n + 1).fill(0));
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}
