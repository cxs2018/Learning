function backtrack(left, right, track, res) {
  // 数量小于0不合法
  if (left < 0 || right < 0) return;
  // 左括号剩的多不合法
  if (right < left) return;
  // 左右括号用完了，表示一个合法的生成了
  if (left === 0 && right === 0) {
    res.push([...track]);
    return;
  }
  // 尝试添加一个左括号
  track.push("("); // 选择
  backtrack(left - 1, right, track, res);
  track.pop(); // 撤销选择
  // 尝试添加一个右括号
  track.push(")"); // 选择
  backtrack(left, right - 1, track, res);
  track.pop(); // 撤销选择
}

function generateParenthesis(n) {
  if (n === 0) return [];
  const res = [];
  const track = [];
  backtrack(n, n, track, res);
  return res;
}

console.log(generateParenthesis(3));
