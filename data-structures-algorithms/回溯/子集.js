/**
 * 输入一个不包含重复数字的数组，输出这些数字的所有子集
 * @param nums
 * @returns {*[][]|[[]]|*}
 */
function subsets(nums) {
  if (nums.length === 0) {
    return [[]];
  }
  let n = nums.pop();
  let res = subsets(nums);
  let size = res.length;
  /**
   * 例，[1,2]的子集为 []、[1]、[2]、[1,2];
   * subsets([1,2,3]) - subsets([1,2]) = [3]、[3,1]、[3,2]、[3,1,2]
   */
  for (let i = 0; i < size; i++) {
    res.push(res[i].concat([n]));
  }
  return res;
}

const nums = [1, 2, 3];
console.log(subsetsBacktrack(nums));

/**
 * 递归算法的时间复杂度 = 递归深度 * 每次递归中迭代的次数
 */

function subsetsBacktrack() {
  function backtrack(nums, start, track, res) {
    res.push([...track]);
    for (let i = start; i < nums.length; i++) {
      track.push(nums[i]);
      backtrack(nums, i + 1, track, res);
      track.pop();
    }
  }
  const track = [];
  const res = [];
  backtrack(nums, 0, track, res);
  return res;
}

/**
 * 回溯算法的模板
 * result = []
 * def backtrack(路径，选择列表):
 *    if 满足结束条件:
 *      result.add(路径)
 *      return
 *    for 选择 in 选择列表:
 *      做选择
 *      backtrack(路径，选择列表)
 *      撤销选择
 */
