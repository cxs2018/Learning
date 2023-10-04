/**
 * 给定一段长度为 n 英尺的钢条和一个价格表为 Pi(i=1,2,3,4,5,6,...,n),求切割钢条方案，使得销售收益
 *  rn最大（单位为元）。注意：如果长度为 n 英尺的钢条的价格 Pn 足够大，那么最优解就是不需要切割。
 */
/**
 * 自顶向下递归
 * @param p
 * @param n
 * @returns {number}
 */
function Top_Down_Cut_Rod(p, n) {
  let r = 0;
  if (n === 0) {
    return 0;
  }
  // i = n 时，就是不切，p[n] + Top_Down_Cut_Rod(0) = p[n]
  for (let i = 1; i <= n; i++) {
    let temp = p[i] + Top_Down_Cut_Rod(p, n - i);
    r = r >= temp ? r : temp;
  }
  return r;
}

/**
 * 自顶向下递归、带备忘录
 * @param p
 * @param n
 * @returns {*|number}
 */
function Top_Down_Cut_Rod_With_Memo(p, n) {
  function Top_Down_Cut_Rod(p, n, r) {
    if (r[n] >= 0) {
      return r[n];
    }
    let q = -Infinity;
    if (n === 0) {
      q = 0;
    }
    // i = n 时，就是不切，p[n] + Top_Down_Cut_Rod(0) = p[n]
    for (let i = 1; i <= n; i++) {
      let temp = p[i] + Top_Down_Cut_Rod(p, n - i, r);
      q = q >= temp ? q : temp;
    }
    r[n] = q;
    return q;
  }
  const r = new Array(n + 1).fill(-Infinity);
  return Top_Down_Cut_Rod(p, n, r);
}

/**
 * 自底向上
 * @param p
 * @param n
 * @returns {any}
 */
function Bottom_Up_Cut_Rod(p, n) {
  const r = new Array(n + 1).fill(0);
  for (let j = 1; j <= n; j++) {
    let q = -Infinity;
    for (let i = 1; i <= j; i++) {
      q = Math.max(q, p[i] + r[j - i]);
    }
    r[j] = q;
  }
  return r[n];
}

/**
 * 自底向上，输出切割位置
 * @param p
 * @param n
 * @returns {any}
 */
function Bottom_Up_Cut_Rod_With_Print(p, n) {
  const r = new Array(n + 1).fill(0);
  const s = new Array(n + 1).fill(0);
  for (let j = 1; j <= n; j++) {
    let q = -Infinity;
    for (let i = 1; i <= j; i++) {
      if (q < p[i] + r[j - i]) {
        q = p[i] + r[j - i];
        s[j] = i;
      }
    }
    r[j] = q;
  }
  return [r, s];
}

const p = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30, 32, 35, 36];
const [r, s] = Bottom_Up_Cut_Rod_With_Print(p, 13);

console.table(
  p.map((item, index) => {
    return {
      p: item,
      r: r[index],
      s: s[index],
    };
  }),
  ["p", "r", "s"],
);
