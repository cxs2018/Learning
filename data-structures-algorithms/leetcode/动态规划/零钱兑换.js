function coinChange(coins, amount) {
    // 备忘录数组初始化为特殊值
    var memo = new Array(amount+1).fill(-666);
    function dp(coins, amount) {
        if (amount === 0) return 0;
        if (amount < 0) return -1;
        // 查备忘录，防止重复计算
        if (memo[amount] !== -666) {
            return memo[amount];
        }
        var res = Infinity;
        for (var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            // 计算子问题的结果
            var subProblem = dp(coins, amount - coin);
            // 子问题无解则跳过
            if (subProblem === -1) continue;
            // 在子问题中选择最优解，然后加一
            res = Math.min(res, subProblem + 1);
        }
        memo[amount] = res === Infinity ? -1 : res;
        return memo[amount];
    }
    return dp(coins, amount);
}