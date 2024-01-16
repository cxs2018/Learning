/**
 * https://leetcode.cn/problems/climbing-stairs/
 */
/**
 * 递归
 * @param {number} n
 * @return {number}
 */
const map = new Map();
var climbStairs = function (n) {
  if (map.has(n)) {
    return map.get(n);
  }
  let res;
  if (n === 2 || n === 1) {
    res = n;
    map.set(n, n);
  } else {
    res = climbStairs(n - 1) + climbStairs(n - 2);
    map.set(n, res);
  }
  return res;
};

{
  // 迭代
  var climbStairs = function (n) {
    const list = [1, 1, 2];
    for (let i = 3; i <= n; i++) {
      list[i] = list[i - 1] + list[i - 2];
    }
    return list[n];
  };
}

{
  // 迭代-滚动数组优化空间复杂度
  var climbStairs = function (n) {
    let n1 = 0,
      n2 = 0,
      n0 = 1;
    for (let i = 1; i <= n; i++) {
      n2 = n1;
      n1 = n0;
      n0 = n1 + n2;
    }
    return n0;
  };
}
