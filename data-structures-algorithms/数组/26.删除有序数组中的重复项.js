/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let slowIndex = 0;
  for (let fastIndex = 1; fastIndex < nums.length; fastIndex++) {
    if (nums[slowIndex] !== nums[fastIndex]) {
      slowIndex++;
      nums[slowIndex] = nums[fastIndex];
    }
  }
  return slowIndex + 1;
};
const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums), nums);
