// k = 1
function maxProfit_k_1(prices) {
	var n = prices.length;
	var dp = new Array(n).fill(0).map(() => new Array(2));
	for (var i = 0; i < n; i++) {
		if (i - 1 === -1) {
			// base case
			dp[i][0] = 0;
			dp[i][1] = -prices[i];
			continue;
		}
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
		dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
	}
	return dp[n - 1][0];
}
// k = 1 状态压缩
function maxProfit_k_1_spaceOptimize(prices) {
	var n = prices.length;
	var dp_i_0 = 0, dp_i_1 = -Infinity;
	for (var i = 0; i < n; i++) {
		dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
		dp_i_1 = Math.max(dp_i_1, -prices[i]);
	}
	return dp_i_0;
}
// K = +Infinity
function maxProfit_k_inf(prices) {
	var n = prices.length;
	var dp = new Array(n).fill(0).map(() => new Array(2));
	for (var i = 0; i < n; i++) {
		if (i - 1 === -1) {
			// base case
			dp[i][0] = 0;
			dp[i][1] = -prices[i];
			continue;
		}
		// dp[i][0] 今天没有持有股票，有两种可能：dp[i-1][0] 昨天就没有持有股票； dp[i-1][1] + prices[i] 昨天持有股票，但今天卖了
		dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
		// dp[i][1] 今天持有股票，有两种可能：dp[i-1][1] 昨天就持有股票；dp[i-1][0] - price[i] 昨天没有持有股票，今天买入了
		dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i]);
	}
	return dp[n-1][0];
}
// K = +Infinity 状态压缩
function maxProfit_k_inf_spaceOptimize(prices) {
	var n = prices.length;
	var dp_i_0 = 0, dp_i_1 = -Infinity;
	for (var i = 0; i < n; i++) {
		// 当前状态只跟前一个状态有关，可以将空间复杂度降低
		dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
		dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i]);
	}
	return dp_i_0;
}