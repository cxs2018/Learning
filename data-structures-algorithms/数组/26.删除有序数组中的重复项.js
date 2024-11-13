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
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let slowIndex = 0;
  let rightIndex = nums.length - 1;
  for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
    if (nums[fastIndex] !== 0) {
      nums[slowIndex] = nums[fastIndex];
      slowIndex++;
    }
  }
  for (let i = slowIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes2 = function (nums) {
  let slowIndex = 0;
  for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
    if (nums[fastIndex] !== 0) {
      let temp = nums[slowIndex];
      nums[slowIndex] = nums[fastIndex];
      nums[fastIndex] = temp;
      slowIndex++;
    }
  }
};
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let s1 = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "#") {
      s1.push(s[i]);
    } else {
      s1.pop();
    }
  }
  let t1 = [];
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== "#") {
      t1.push(t[i]);
    } else {
      t1.pop();
    }
  }
  return s1.join("") === t1.join("");
};
var backspaceCompare1 = function (s, t) {
  function doublePoint(str) {
    let slowIndex = 0;
    for (let fastIndex = 0; fastIndex < str.length; fastIndex++) {
      if (str[fastIndex] !== "#") {
        // 这一步不生效
        str[slowIndex] = str[fastIndex];
        // 改成下面的
        str =
          str.substring(0, slowIndex) +
          str[fastIndex] +
          str.substring(slowIndex + 1);
        slowIndex++;
      } else if (slowIndex > 0) {
        slowIndex--;
      }
    }
    return str.substring(0, slowIndex);
  }
  return doublePoint(s) === doublePoint(t);
};
backspaceCompare1("ab#c", "ad#c");
