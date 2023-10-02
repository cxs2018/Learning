/**
 * n皇后
 * n皇后问题是将n个皇后放置在n*n的棋盘上，皇后彼此之间不能相互攻击(任意两个皇后不能位于同一行，同一列，同一斜线)。
 * 给定一个整数n，返回所有不同的n皇后问题的解决方案。
 * 每个解决方案包含一个明确的n皇后放置布局，其中“Q”和“.”分别表示一个女王和一个空位置。
 */
/**
 * 格式化每种方案输出
 * @param arr
 * @returns {*[]}
 */
function getLayoutQueen(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(
      new Array(arr.length)
        .fill(".")
        .map((item, itemIndex) => {
          return arr[i] === itemIndex ? "Q" : item;
        })
        .join(""),
    );
  }
  return res;
}

function nQueen(n) {
  if (n === 1) {
    return [getLayoutQueen([0])];
  }
  if (n === 2) {
    return [];
  }
  if (n === 3) {
    return [];
  }
  /**
   * queens数组，第 i 个皇后放置在 queens[i] 列
   * @type {*[]}
   */
  const queens = [];
  const results = [];
  search(results, queens, n);
  return results;
}

/**
 * 搜索下一个皇后的放置位置
 * @param results
 * @param queens
 * @param n
 */
function search(results, queens, n) {
  // 一个方案生成了
  if (queens.length === n) {
    results.push(getLayoutQueen(queens));
    return;
  }
  // 每个皇后遍历一遍列，看和之前放置的皇后是否冲突，当前放到第几个皇后了，由 queens 的长度确定
  for (let colIndex = 0; colIndex < n; colIndex++) {
    // 根据 已经放置的皇后，确定 colIndex 列可不可以放
    if (!isValid(queens, colIndex)) {
      // 看下一列能否放置
      continue;
    }
    // 可以放置，放入第 queens.length 个皇后（从0开始）
    queens.push(colIndex);
    // 放置下一个皇后，queens数组加了一个皇后，下次搜索就是看下一个皇后放置在哪了
    search(results, queens, n);
    // 把放入的这个皇后再退出来，要回溯了
    queens.pop();
  }
}

/**
 * 放置一个皇后，看是否合法
 * @param queens 已经放好的皇后位置
 * @param nextQueenColumn 要放置的下一个皇后列位置
 */
function isValid(queens, nextQueenColumn) {
  // 把之前的皇后遍历一遍，看看新的皇后能否放置到 queens.length 行 nextQueenColumn 列上（行列都从0开始）
  for (let rowIndex = 0; rowIndex < queens.length; rowIndex++) {
    // 判断是否在一条斜线上，如果在两个皇后在一条斜线上，那它们的横坐标之差和纵坐标之差的绝对值是相等的
    // 当前遍历到的皇后的横坐标是 rowIndex，纵坐标是 queens[rowIndex]
    // 要放入的那个皇后的横坐标是 queens.length，纵坐标是 nextQueenColumn
    if (
      Math.abs(nextQueenColumn - queens[rowIndex]) ===
      Math.abs(queens.length - rowIndex)
    ) {
      return false;
    }
    // 看下是否在同一列
    if (queens[rowIndex] === nextQueenColumn) {
      return false;
    }
    // 放入的时候是一行一行放的，所以所有的皇后在行上都不会和别的皇后冲突
  }
  return true;
}

console.log(nQueen(1));
