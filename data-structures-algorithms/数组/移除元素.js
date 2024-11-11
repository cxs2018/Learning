/**
 * 原地移除数组中所有等于val的元素，要求不能使用额外的辅助空间，即空间复杂度为O(1)。返回移除元素后新数组的size
 */
// 暴力解法
function removeElement(nums, val) {
  let size = nums.length;
  for (let i = 0; i < size; i++) {
    if (nums[i] === val) {
      // 发现需要移除的元素就将数组集体向前移动一位
      for (let j = i + 1; j < size; j++) {
        nums[j - 1] = nums[j];
      }
      i--; // 因为下标i以后的数值都向前移动了一位，所以i也向前移动一位
      size--; // 数组长度-1
    }
  }
  return size;
}

// 双指针解法
function removeElementDoublePoints(nums, val) {
  let slowIndex = 0;
  for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
    if (val !== nums[fastIndex]) {
      nums[slowIndex++] = nums[fastIndex];
    }
  }
  return slowIndex;
}

const nums = new Array(10).map((_, index) => {
  return i === 5 ? 2 : index;
});
console.time("violence");
console.log(removeElement([...nums], 2));
console.timeEnd("violence");
console.time("doublePoints");
console.log(removeElement([...nums], 2));
console.timeEnd("doublePoints");
{
  function removeElement(nums, val) {
    const n = nums.length;
    let left = 0;
    for (let right = 0; right < n; right++) {
      if (nums[right] !== val) {
        nums[left] = nums[right];
        left++;
      }
    }
    return left;
  }
}
{
  function removeElement(nums, val) {
    let left = 0,
      right = nums.length;
    while (left < right) {
      if (nums[left] === val) {
        nums[left] = nums[right - 1];
        right--;
      } else {
        left++;
      }
    }
    return left;
  }
}
