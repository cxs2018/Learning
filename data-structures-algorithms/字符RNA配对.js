/**
 * 给定一个字符B=b1b2…bn，其中bi∈{A,C,G,U}。B上的二级结构是一组字符对集合S={(bi,bj)}，其中i,j∈{1,2,…,n}，并满足以下四个条件：
（1）S中的每对字符是(A,U),(U,A),(C,G),(G,C)四种组合之一；
（2）S中的每对字符之间至少有四个字符将其隔开，即i<j−4；
（3）B（原题疑似有误，原为S）中的每一个字符（记为bk）的配对存在两种情况：bk不参与任何配对；bk和bt配对，其中t<k−4；
（4）（不交叉原则）若(bi,bj)和(bk,bl)是S种的两个字符对，且i<k，则i<k<j<l不成立。
B的具有最大可能字符对数的二级结构S被称为最优配对方案，求解最优配对方案中的字符对数的方法如下：
假设用C(i,j)表示字符序列 bibi+1…bj 的最优配对方案（即二级结构S）中的字符对数，则C(i,j)可以递归定义为：
C(i,j)={max(C(i,j−1),max(C(i,t−1)+1+C(t+1,j−1)))【bt和bj匹配且i<j−4】,0【否则】}
 */
/**
 * 判断两个字符是否匹配
 * @param a
 * @param b
 * @returns {boolean}
 */
function isMatch(a, b) {
  if ((a === "A" && b === "U") || (a === "U" && b === "A")) {
    return true;
  }
  if ((a === "C" && b === "G") || (a === "G" && b === "C")) {
    return true;
  }
  return false;
}

function RNA_2(B, n) {
  let i, j, k, t;
  let max = -Infinity;
  let C = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));

  // i,j 是一组，k是两个字符之间的间距，不能小于5
  for (k = 5; k <= n; k++) {
    // k 从 第5个到最后一个 n-1
    for (i = 0; i < n - k; i++) {
      j = i + k; // 找到 j 的位置
      max = C[i][j - 1]; // 假设 j 这个位置的字符不配对，那 j 位置的配对数就和 j-1 一样
      for (t = i; t <= j - 5; t++) {
        if (isMatch(B[t], B[j]) && max < C[i][t - 1] + 1 + C[t + 1][j - 1]) {
          max = C[i][t - 1] + 1 + C[t + 1][j - 1];
        }
      }
      C[i][j] = max;
      console.log(`C[${i}][${j}]`, C[i][j]);
    }
  }
  return C[0][7];
}

const str = "ACCGGUAGU";
console.log(RNA_2(str, 9));
