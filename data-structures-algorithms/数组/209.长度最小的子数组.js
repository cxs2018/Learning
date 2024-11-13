function minSubArrayLen(target, nums) {
  if (nums.length === 1) {
    return nums[0] >= target ? 1 : 0;
  }
  let result = Infinity;
  let sum = 0;
  let subLength = 0;
  for (let i = 0; i < nums.length; i++) {
    sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        subLength = j - i + 1;
        result = Math.min(result, subLength);
        break;
      }
    }
  }
  return result === Infinity ? 0 : result;
}
function minSubArrayLen2(target, nums) {
  if (nums.length === 1) {
    return nums[0] >= target ? 1 : 0;
  }
  let result = Infinity;
  let sum = 0;
  let subLength = 0;
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];
    while (sum >= target) {
      subLength = j - i + 1;
      result = Math.min(subLength, result);
      sum -= nums[i++];
    }
  }
  return result === Infinity ? 0 : result;
}

console.log(minSubArrayLen(11, [1, 4, 4]));
