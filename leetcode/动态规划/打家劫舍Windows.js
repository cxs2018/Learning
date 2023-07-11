// 相邻的房子的钱不能被同时取出
// 1. 状态：每个房子的钱 2. 选择：对于每间房子，是取还不是不取
// dp(nums, start) = x 表示，从nums[start]开始做选择，可以获得的最多的金额为x
function rob(nums) {
  function dp(nums, start) {
    if (start >= nums.length) {
      return 0;
    }
    var res = Math.max(dp(nums, start + 1), nums[start] + dp(nums, start + 2));
    return res;
  }
  return dp(nums, 0);
}

function robMemo(nums) {
  var memo = new Map();
  function dp(nums, start) {
    if (memo.get(start)) {
      return memo.get(start);
    }
    if (start >= nums.length) {
      return 0;
    }
    var res = Math.max(dp(nums, start + 1), nums[start] + dp(nums, start + 2));
    memo.set(start, res);
    return res;
  }
  return dp(nums, 0);
}

function robFromBottomToTop(nums) {
  var n = nums.length;
  var dp = new Array(n + 2).fill(0);
  for (var i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
  }
  return dp[0];
}

function robFromBottomToTopStateReduction(nums) {
  var n = nums.length;
  var dp_i_0;
  var dp_i_1 = 0,
    dp_i_2 = 0;
  for (var i = n - 1; i >= 0; i--) {
    dp_i_0 = Math.max(dp_i_1, nums[i] + dp_i_2);
    dp_i_2 = dp_i_1;
    dp_i_1 = dp_i_0;
  }
  return dp_i_0;
}

function robFromBottomToTopStateReductionRange(nums, start, end) {
  var dp_i_0;
  var dp_i_1 = 0,
    dp_i_2 = 0;
  for (var i = end; i >= start; i--) {
    dp_i_0 = Math.max(dp_i_1, nums[i] + dp_i_2);
    dp_i_2 = dp_i_1;
    dp_i_1 = dp_i_0;
  }
  return dp_i_0;
}

function robCircle(nums) {
  var n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  return Math.max(
    robFromBottomToTopStateReductionRange(nums, 0, n - 2),
    robFromBottomToTopStateReductionRange(nums, 1, n - 1)
  );
}

var memoTree = new Map();

function robTree(root) {
  if (root === null) return 0;
  if (memoTree.get(root)) {
    return memoTree.get(root);
  }
  var do_it =
    root.val +
    (root.left == null ? 0 : rob(root.left.left) + rob(root.left.right)) +
    (root.right === null ? 0 : rob(root.right.left) + rob(root.right.right));
  var not_do_it = rob(root.left) + rob(root.right);
  var res = Math.max(do_it, not_do_it);
  memoTree.set(root, res);
  return res;
}
