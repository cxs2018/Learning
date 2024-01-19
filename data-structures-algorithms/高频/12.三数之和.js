/**
 * https://leetcode.cn/problems/3sum/description/
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const res = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      for (let j = i + 1; j < nums.length; j++) {
        if (j === i + 1 || nums[j] !== nums[j - 1]) {
          for (let k = j + 1; k < nums.length; k++) {
            if (k === j + 1 || nums[k] !== nums[k - 1]) {
              if (nums[i] + nums[j] + nums[k] === 0) {
                res.push([nums[i], nums[j], nums[k]]);
              }
            }
          }
        }
      }
    }
  }
  return res;
};

{
  /**
   * 优化三重循环
   * 固定前两重循环枚举到的元素 a 和 b，那么只有唯一的 c 满足 a+b+c=0，当第二重循环往后枚举一个元素 b'（已跳过与前一次循环相同的值）时，由于 b'>b，那么满足 a+b'+c'=0，一定有 c'<c，
   * 即 c' 在数组中一定出现在 c 的左侧。也就是说，我们可以从小到大枚举 b，从大到小枚举 c，实际上第二重循环和第三重循环时并列的关系。
   * 这就是【双指针】，当我们需要枚举数组中的两个元素时，如果我们发现随着第一个元素的递增，第二个元素是递减的，那么就可以使用双指针的方法，将枚举的时间复杂度从 O(N2) 降到 O(N)。
   * @param nums
   * @returns {*[]}
   */
  var threeSum = function (nums) {
    const res = [];
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) {
        break;
      }
      if (i === 0 || nums[i] !== nums[i - 1]) {
        let k = nums.length - 1;
        for (let j = i + 1; j < nums.length; j++) {
          if (j === i + 1 || nums[j] !== nums[j - 1]) {
            while (j < k && nums[i] + nums[j] + nums[k] > 0) {
              k--;
            }
            if (j === k) {
              break;
            }
            if (nums[i] + nums[j] + nums[k] === 0) {
              res.push([nums[i], nums[j], nums[k]]);
            }
          }
        }
      }
    }
    return res;
  };
}

{
  // 双指针 while 写法
  var threeSum = function (nums) {
    const res = [];
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) {
        break;
      }
      if (i > 0 && nums[i] === nums[i - 1]) {
        continue;
      }
      let j = i + 1;
      let k = nums.length - 1;
      while (j < k) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          res.push([nums[i], nums[j], nums[k]]);
          while (j < k && nums[j] === nums[j + 1]) {
            j++;
          }
          while (j < k && nums[k] === nums[k - 1]) {
            k--;
          }
          j++;
          k--;
        } else if (nums[i] + nums[j] + nums[k] > 0) {
          k--;
        } else {
          j++;
        }
      }
    }
    return res;
  };
}

// 扩展 最接近的三数之和
/**
 * https://leetcode.cn/problems/3sum-closest/
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let min = Infinity;
  let res = target;
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum === target) {
        return target;
      } else {
        let difference = Math.abs(sum - target);
        if (difference < min) {
          min = difference;
          res = sum;
        }
        if (sum < target) {
          while (j < k && nums[j] === nums[j + 1]) {
            j++;
          }
          j++;
        } else {
          while (j < k && nums[k] === nums[k - 1]) {
            k--;
          }
          k--;
        }
      }
    }
  }
  return res;
};

// 扩展 四数之和
/**
 * https://leetcode.cn/problems/4sum/
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  const res = [];
  const n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break;
    }
    if (nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) {
      continue;
    }
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break;
      }
      if (nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) {
        continue;
      }
      let k = j + 1;
      let m = n - 1;
      while (k < m) {
        const sum = nums[i] + nums[j] + nums[k] + nums[m];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[k], nums[m]]);
          while (k < m && nums[k] === nums[k + 1]) {
            k++;
          }
          while (k < m && nums[m] === nums[m - 1]) {
            m--;
          }
          k++;
          m--;
        } else if (sum < target) {
          k++;
        } else {
          m--;
        }
      }
    }
  }
  return res;
};
