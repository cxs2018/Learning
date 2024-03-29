/**
 * https://leetcode.cn/problems/maximum-subarray/description/
 */
/**
 * 假设 nums 数组的长度是 n，下标从 0 到 n-1，f(i) 表示以第 i 个数结尾的【连续子数组的最大和】，max{f(i), 0<=i<=n-1}，
 * 如何求 f(i)，考虑 nums[i] 单独成为一段还是加入 f(i-1) 对应的那一段，这取决于 nums[i] 和 nums[i] + f(i-1) 的大小，也就是 f(i-1) 的正负，
 * 所以动态规划方程如下：f(i) = max{f{i-1} + nums[i], nums[i]}
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let pre = 0;
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i]);
    max = Math.max(max, pre);
  }
  return max;
};

{
  /**
   * 分治
   * get(a, l, r) 表示查询 a 序列 [l,r] 区间内的最大字段和，最终答案即为 get(nums, 0, nums.length - 1)。
   * 对于一个区间 [l,r]，我们取 m = (l+r)/2，对于区间 [l,m] 和 [m+1,r] 分治求解。当递归深入直到区间长度缩小为 1 的时候，递归开始回升。这时候我们
   * 考虑如何通过 [l,m] 、[m+1,r] 子区间的信息合并区间 [l,r] 的信息。
   */
  var maxSubArray = function (nums) {
    function Status(l, r, m, i) {
      this.lSum = l;
      this.rSum = r;
      this.mSum = m;
      this.iSum = i;
    }

    function pushUp(l, r) {
      const iSum = l.iSum + r.iSum;
      const lSum = Math.max(l.lSum, l.iSum + r.lSum);
      const rSum = Math.max(r.rSum, r.iSum + l.rSum);
      const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);
      return new Status(lSum, rSum, mSum, iSum);
    }

    function getInfo(a, l, r) {
      if (l === r) {
        return new Status(a[l], a[l], a[l], a[l]);
      }
      const m = (l + r) >> 1;
      const lSub = getInfo(a, l, m);
      const rSub = getInfo(a, m + 1, r);
      return pushUp(lSub, rSub);
    }

    return getInfo(nums, 0, nums.length - 1).mSum;
  };
}

// 扩展 LIS 最长上升子序列
/**
 * https://leetcode.cn/problems/longest-increasing-subsequence/description/
 */
/**
 * dp[i] 表示以第 i 个数字结尾的最长上升子序列的长度
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);
  let max = dp[0];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
};

{
  /**
   * 贪心+二分查找
   * 使上升序列尽可能地长 => 序列上升的尽可能慢 => 每次上升子序列最后加上的那个数尽可能小
   * d[i] 表示长度为 i 的最长上升子序列的末尾元素的最小值，用 len 记录目前最长子序列的长度，初始时 len 为 1，d[1] = nums[0]
   */
  var lengthOfLIS = function (nums) {
    const n = nums.length;
    const d = new Array(n + 1);
    let len = 1;
    d[len] = nums[0];
    for (let i = 0; i < n; i++) {
      if (nums[i] > d[len]) {
        d[++len] = nums[i];
      } else {
        let l = 1,
          r = len;
        while (l <= r) {
          const mid = (l + r) >> 1;
          if (d[mid] < nums[i]) {
            l = mid + 1;
          } else {
            r = mid - 1;
          }
        }
        d[l] = nums[i];
      }
    }
    return len;
  };
}
