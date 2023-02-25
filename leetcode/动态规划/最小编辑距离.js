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

class SNode {
  constructor(val, choice) {
    this.val = val;
    this.choice = choice; // 0 跳过 1 插入 2 删除 3 替换
  }
}

function minNode(a, b, c) {
  var res = new SNode(a.val, 2);

  if (res.val > b.val) {
    res.val = b.val;
    res.choice = 1;
  }
  if (res.val > c.val) {
    res.val = c.val;
    res.choice = 3;
  }

  return res;
}

function printResult(dp, s1, s2) {
  var rows = dp.length;
  var cols = dp[0].length;
  var i = rows - 1,
    j = cols - 1;
  console.log("Change s1=" + s1 + " to s2=" + s2 + ":\n");
  while (i !== 0 && j !== 0) {
    var c1 = s1[i - 1],
      c2 = s2[j - 1];
    var choice = dp[i][j].choice;
    console.log("s1[" + (i - 1) + "]:");
    switch (choice) {
      case 0:
        // 跳过，两个指针同时前进
        console.log("skip '" + c1 + "'");
        i--;
        j--;
        break;
      case 1:
        // 将s2[j-1]插入s1[i-1]，s2指针前进
        console.log("insert '" + c2 + "'");
        j--;
        break;
      case 2:
        // 删除s1[i-1], s1指针前进
        console.log("delete '" + c1 + "'");
        i--;
        break;
      case 3:
        // 将s1[i-1]替换成s2[j-1]，两个指针同时前进
        console.log("replace '" + c1 + "'" + " with '" + c2 + "'");
        i--;
        j--;
        break;
      default:
        break;
    }
  }
  // 如果s1，还没有走完，则剩下的都是需要删除的
  while (i > 0) {
    console.log("s1[" + (i - 1) + "]:");
    console.log("delete '" + s1[i - 1] + "'");
    i--;
  }
  // 如果s2还没有走完，则剩下的都是需要插入s1的
  while (j > 0) {
    console.log("s1[0]:");
    console.log("insert '" + s2[j - 1] + "'");
    j--;
  }
}

function misDistanceRoute(s1, s2) {
  var m = s1.length,
    n = s2.length;
  var dp = Array.from(new Array(m + 1), () => new Array(n + 1));
  for (var i = 0; i <= m; i++) {
    dp[i][0] = new SNode(i, 2);
  }
  for (var i = 0; i <= n; i++) {
    dp[0][i] = new SNode(i, 1);
  }
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        var node = dp[i - 1][j - 1];
        dp[i][j] = new SNode(node.val, 0);
      } else {
        dp[i][j] = minNode(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        dp[i][j].val++;
      }
    }
  }
  printResult(dp, s1, s2);
  console.log("result: " + dp[m][n].val);
  return dp[m][n].val;
}

misDistanceRoute("intention", "execution");
