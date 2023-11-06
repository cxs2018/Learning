/**
 *
 */
function generateMatrix(n) {
  // 首先确定有几圈循环，若n为奇数，如5，有两圈，中间补充一个，n为偶数，如6，则有三圈
  let loop = Math.floor(n / 2);
  let mid = Math.floor(n / 2);
  let offset = 1;
  let startX = 0,
    startY = 0;
  let count = 1;
  let i, j;
  const res = new Array(n).fill(0).map(() => new Array(n));
  while (loop--) {
    i = startX;
    j = startY;

    // 上行从左到右遍历，左闭右开
    for (j = startY; j < startY + n - offset; j++) {
      res[i][j] = count++;
    }

    // 右行从上到下遍历
    for (i = startX; i < startX + n - offset; i++) {
      res[i][j] = count++;
    }

    // 下行从右到左遍历
    for (; j > startY; j--) {
      res[i][j] = count++;
    }

    // 左行从下到上遍历
    for (; i > startX; i--) {
      res[i][j] = count++;
    }

    startX++;
    startY++;

    offset += 2;
  }
  if (n % 2) {
    res[mid][mid] = count;
  }
  return res;
}

console.log(generateMatrix(7));
