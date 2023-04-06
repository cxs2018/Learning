// 打家劫舍1
function rob(nums) {
	function dp(nums, start) {
		if (start >= nums.length) {
			return 0;
		}
		var res = Math.max(
			// 不抢，去下家
			dp(nums, start + 1),
			// 抢，去下下家
			nums[start] + dp(nums, start + 2))
		return res;
	}
	return dp(nums, 0)
}
// 打家劫舍1-备忘录
function robMemo(nums) {
	// 初始化备忘录
	var memo = new Array(nums.length).fill(-1);
	// 返回 dp[start...] 能抢到的最大值
	function dp(nums, start) {
		if (start >= nums.length) {
			return 0;
		}
		// 避免重复计算
		if (memo[start] !== -1) {
			return memo[start];
		}
		var res = Math.max(dp(nums, start + 1), nums[start] + dp(nums, start + 2));
		// 记入备忘录
		memo[start] = res;
		return res;
	}
	return dp(nums, 0);
}
// 打家劫舍1-自底向上
function robFromBottomToUp(nums) {
	var n = nums.length;
	// dp[i] = x 表示：从第 i 间（从0开始）房子开始抢劫，最多能抢到的钱为 x，base case: dp[n] = 0;
	var dp = new Array(n + 2).fill(0);
	for (var i = n - 1; i >= 0; i--) {
		dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
	}
	return dp[0];
}
// 打家劫舍1-自底向上空间优化
function robFromBottomToUpSpaceOptimize(nums) {
	var n = nums.length;
	var dp_i_1 = 0, dp_i_2 = 0;
	var dp_i_0 = 0;
	for (var i = n - 1; i >= 0; i--) {
		dp_i_0 = Math.max(dp_i_1, nums[i] + dp_i_2);
		dp_i_2 = dp_i_1;
		dp_i_1 = dp_i_0;
	}
	return dp_i_0;
}
// 打家劫舍2
function rob2(nums) {
	var n = nums.length;
	if (n === 1) return nums[0];
	function robRange(nums, start, end) {
		var n = nums.length;
		var dp_i_1 = 0, dp_i_2 = 0;
		var dp_i_0 = 0;
		for (var i = end; i >= start; i--) {
			dp_i_0 = Math.max(dp_i_1, nums[i] + dp_i_2);
			dp_i_2 = dp_i_1;
			dp_i_1 = dp_i_0;
		}
		return dp_i_0;
	}
	return Math.max(robRange(nums, 0, n-2), robRange(nums, 1, n-1));
}
// 打家劫舍3
var memo = new Map();
function rob3(root) {
	if (root === null) {
		return 0;
	}
	// 利用备忘录消除重叠子问题
	if (memo.get(root)) {
		return memo.get(root);
	}
	// 抢，然后去下下家
	var do_it = root.val + (root.left === null ? 0 : rob3(root.left.left) + rob3(root.left.right)) + (root.right === null ? 0 : rob3(root.right.left) + rob3(root.right.right));
	// 不抢，然后去下家
	var not_do = rob3(root.left) + rob3(root.right);

	var res = Math.max(do_it, not_do);
	memo.set(root, res);
	return res;
}
function rob3Optimize(root) {
	/**
	 * 返回一个大小为2的数组 arr，arr[0]表示不抢root的话，得到的最大钱数，arr[1]表示抢root的话，得到的最大钱数
	 */
	function dp(root) {
		if (root === null) {
			return [0, 0];
		}
		var left = dp(root.left);
		var right = dp(root.right);
		// 抢，下家就不能抢了
		var rob = root.val + left[0] + right[0];
		// 不抢，下家可抢可不抢，取决于收益大小
		var not_rob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
		return [not_rob, rob];
	}
	var res = dp(root);
	return Math.max(res[0], res[1]);
}