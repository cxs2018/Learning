// 状态就是i和j两个指针的位置，选择就是p[j]选择匹配几个字符
// dp(s,i,p,j) true，表示s[i..]可以匹配p[j..]，反之不匹配
function isMatch(s, p) {
  var m = s.length,
    n = p.length;
  var memo = new Map();
  function dp(s, i, p, j) {
    // 如果j走到末尾了，看i是否也走到了末尾
    if (j === n) {
      return i === m;
    }
    // 如果i走到了末尾
    if (i === m) {
      // 如果能匹配空串，那字符和*一定是成对出现的，如 s="a", p="ab*c*"
      if ((n - j) % 2 === 1) {
        return false;
      }
      // 检查是否为 x*y*z* 这种形式
      for (; j + 1 < n; j += 2) {
        if (p[j + 1] !== "*") {
          return false;
        }
      }
      return true;
    }
    var key = i + "_" + j;
    if (memo.get(key)) {
      return memo.get(key);
    }
    let res = false;
    if (s[i] === p[j] || p[j] === ".") {
      if (j < p.length - 1 && p[j + 1] === "*") {
        // 通配符匹配0次或多次
        res = dp(s, i, p, j + 2) || dp(s, i + 1, p, j);
      } else {
        // 常规匹配1次
        res = dp(s, i + 1, p, j + 1);
      }
    } else {
      if (j < p.length - 1 && p[j + 1] === "*") {
        // 通配符只匹配0次
        res = dp(s, i, p, j + 2);
      } else {
        res = false;
      }
    }
    memo.set(key, res);

    return res;
  }

  return dp(s, 0, p, 0);
}

console.log(isMatch("abcd", "aba*cd"));
