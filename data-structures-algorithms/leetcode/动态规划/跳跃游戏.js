function canJump(nums) {
	var n = nums.length;
	var farthest = 0;
	for (var i = 0; i < n - 1; i++) {
		// 不断计算能跳到的最远距离
		farthest = Math.max(farthest, i + nums[i]);
		// 可能碰到了0，卡住跳不动了
		if (farthest <= i) return false
	}
	return farthest >= n - 1;
}
// 跳跃游戏2
function jump(nums) {
	var n = nums.length;
	var memo = new Array(n).fill(n);
	// 定义：从索引p跳到最后一格，至少需要dp(nums, p)步
	function dp(nums, p) {
		// base case
		if (p >= n -1) {
			return 0;
		}
		// 子问题已经计算过
		if (memo[p] != n) {
			return memo[p]
		}
		var steps = nums[p];
		// 你可以选择跳1步、2步...
		for (var i = 1; i <= steps; i++) {
			// 穷举每一个选择
			// 计算每一个子问题的结果
			var subProblem = dp(nums, p+i);
			// 取其中最小的作为最终结果
			memo[p] = Math.min(memo[p], subProblem+1);
		}
		return memo[p]
	}
	return dp(nums, 0);
}
// 跳跃游戏2-贪心
function jumpGreedy(nums) {
	var n = nums.length;
	var end = 0, farthest = 0;
	var jumps = 0;
	for (var i = 0; i < n - 1; i++) {
		farthest = Math.max(nums[i] + i, farthest);
		if (end === i) {
			jumps++;
			end = farthest;
		}
	}
	return jumps;
}