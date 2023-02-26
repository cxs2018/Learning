// 回文串：正着读、反着读都一样的字符。判断回文串或者寻找最长回文串/子序列
// 回文问题一般都是从字符串的中间向两端扩散。
// 定义一个二维的dp数组，dp[i][j]的定义如下：对字符串s[i][j]，最少需要进行dp[i][j]次插入才能变成回文串
function minInsertions(s) {
  var n = s.length;
  var dp = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (var i = n - 2; i >= 0; i--) {
    for (var j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1;
      }
    }
  }

  return dp[0][n - 1];
}

// 状态压缩
function minInsetionsStateCompress(s) {
  var n = s.length;
  var dp = new Array(n).fill(0);

  var temp = 0;
  for (var i = n - 2; i >= 0; i--) {
    var pre = 0;
    for (var j = i + 1; j < n; j++) {
      temp = dp[j];
      if (s[i] === s[j]) {
        dp[j] = pre;
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1]) + 1;
      }
      pre = temp;
    }
  }

  return dp[n - 1];
}
