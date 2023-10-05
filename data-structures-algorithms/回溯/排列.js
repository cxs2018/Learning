/**
 * 输入一个不包含重复数字的数组nums，返回这些数字的全排列
 */
function permute(nums) {
  function backtrack(nums, track, res) {
    if (nums.length === track.length) {
      res.push([...track]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 排除已经选择的数字
      if (track.includes(nums[i])) {
        continue;
      }
      track.push(nums[i]);
      backtrack(nums, track, res);
      track.pop();
    }
  }
  const res = [];
  const track = [];
  backtrack(nums, track, res);
  return res;
}

console.log(permute([1, 2, 3]));
