/**
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
 * 121
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 暴力破解，超时
  let max = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const diff = prices[j] - prices[i];
      if (diff > 0 && diff > max) {
        max = diff;
      }
    }
  }
  return max;
};
{
  var maxProfit = function (prices) {
    let minPrice = Infinity;
    let max = 0;
    for (let i = 0; i < prices.length; i++) {
      if (prices[i] < minPrice) {
        minPrice = prices[i];
      } else if (prices[i] - minPrice > max) {
        max = prices[i] - minPrice;
      }
    }
    return max;
  };
}
