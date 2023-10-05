/**
 * 输入两个数字，输出[1...n]中k个数字的所有组合
 */
function combine(n, k) {
  if (n <= 0 || k <= 0) {
    return [];
  }
  function backtrack(n, k, start, track, res) {
    if (k === track.length) {
      res.push([...track]);
      return;
    }
    for (let i = start; i <= n; i++) {
      track.push(i);
      backtrack(n, k, i + 1, track, res);
      track.pop();
    }
  }
  const res = [];
  const track = [];
  backtrack(n, k, 1, track, res);
  return res;
}

console.log(combine(4, 3));
