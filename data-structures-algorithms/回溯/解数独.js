function isValid(board, r, c, n) {
  for (let i = 0; i < 9; i++) {
    // 判断列是否重复
    if (board[i][c] === n) return false;
    // 判断行是否重复
    if (board[r][i] === n) return false;
    // 判断 3 * 3 方框内是否存在重复
    if (
      board[Math.floor(r / 3) * 3 + Math.floor(i / 3)][
        Math.floor(c / 3) * 3 + (i % 3)
      ] === n
    )
      return false;
  }
  return true;
}

function backtrack(board, i, j) {
  let m = 9,
    n = 9;
  // 穷举到最后一列的话就换到下一行重新开始
  if (j === n) {
    return backtrack(board, i + 1, 0);
  }
  if (i === m) {
    return true;
  }
  // 如果该位置是预设的数字，跳过
  if (board[i][j] !== ".") {
    return backtrack(board, i, j + 1);
  }
  for (let num = 1; num <= 9; num++) {
    // 遇到不合法的数字，跳过
    if (!isValid(board, i, j, num)) {
      continue;
    }
    // 做选择
    board[i][j] = num;
    if (backtrack(board, i, j + 1)) return true;
    board[i][j] = ".";
  }
  return false;
}

const board = new Array(9).fill(0).map(() => new Array(9).fill("."));
console.log(backtrack(board, 0, 0));
console.log(board);
