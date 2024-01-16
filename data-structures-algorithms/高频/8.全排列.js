/**
 * https://leetcode.cn/problems/permutations/description/
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  function backtrack(nums, len, depth, path, used, res) {
    if (depth === len) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < len; i++) {
      if (!used[i]) {
        path.push(nums[i]);
        used[i] = true;
        backtrack(nums, len, depth + 1, path, used, res);
        path.pop();
        used[i] = false;
      }
    }
  }

  const len = nums.length;
  const res = [];
  const path = [];
  const used = new Array(len).fill(false);

  backtrack(nums, len, 0, path, used, res);

  return res;
};

{
  // 优化空间复杂度
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  var permute = function (nums) {
    let n = nums.length;
    let res = [];
    const backtrack = function (first = 0) {
      if (first === n) {
        res.push(nums.slice(0));
      }
      for (let i = first; i < n; i++) {
        [nums[first], nums[i]] = [nums[i], nums[first]];
        backtrack(first + 1);
        [nums[first], nums[i]] = [nums[i], nums[first]];
      }
    };
    backtrack();
    return res;
  };
}
