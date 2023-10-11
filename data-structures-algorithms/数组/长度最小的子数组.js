/**
 * 在一个正整数数组nums中找到最小长度的连续子数组，使子数组元素之和大于或等于s
 */
function minSubArrayLen(s, nums) {
  let result = Infinity;
  let sum = 0;
  let subLength = 0;
  for (let i = 0; i < nums.length; i++) {
    sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= s) {
        subLength = j - i + 1;
        result = result < subLength ? result : subLength;
        break;
      }
    }
  }
  return result === Infinity ? 0 : result;
}

function minSubArrayLenSlideWindow(s, nums) {
  let result = Infinity;
  let sum = 0;
  let i = 0;
  let subLength = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];
    while (sum >= s) {
      subLength = j - i + 1;
      result = result < subLength ? result : subLength;
      sum -= nums[i++];
    }
  }
  return result === Infinity ? 0 : result;
}
