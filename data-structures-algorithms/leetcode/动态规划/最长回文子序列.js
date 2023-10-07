function longestPalindromeSubseq(s) {
  var n = s.length;
  var dp = Array.from(new Array(n), () => new Array(n).fill(0));
  for (var i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  for (var i = n - 2; i >= 0; i--) {
    for (var j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];
}
