/**
 * 左闭右闭版
 * @param nums
 * @param target
 * @returns {number}
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1; // 定义target在左闭右闭的区间里，[left,right]
  while (left <= right) {
    // 当left===right，区间[left,right]依然有效，所以用<=
    let middle = left + Math.floor((right - left) / 2); // 防止大数溢出，等同于 (left + right) / 2
    if (nums[middle] > target) {
      right = middle - 1; // target 在左区间，所以 [left,middle-1]
    } else if (nums[middle] < target) {
      left = middle + 1; // target在右区间，所以 [middle+1,right]
    } else {
      // nums[middle] === target
      return middle; // 数组中找到目标值，直接返回下标
    }
  }
  // 没有找到目标值
  return -1;
}

/**
 * 左闭右开版
 * @param nums
 * @param target
 */
function search2(nums, target) {
  let left = 0;
  let right = nums.length; // 定义target在左闭右开的区间里，[left,right)
  while (left < right) {
    // 当left===right，区间[left,right) 无效，所以用 <
    let middle = left + ((right - left) >> 1); // 防止大数溢出，等同于 (left + right) / 2
    if (nums[middle] > target) {
      right = middle; // target 在左区间，所以 [left,middle)
    } else if (nums[middle] < target) {
      left = middle + 1; // target在右区间，所以 [middle+1,right)
    } else {
      // nums[middle] === target
      return middle; // 数组中找到目标值，直接返回下标
    }
  }
  // 没有找到目标值
  return -1;
}

/**
 * 知识点
 * 1. 左闭右开、左闭右闭 对索引的影响
 * 2. 位运算，向下取整
 * 3. 防止大数溢出 (right + left) / 2 => left + (right - left) / 2
 */

{
  /**
   * 二分查找，递增有序数组大于等于某个数
   */
  function search(nums, target) {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      let mid = left + ((right - left) >> 1);
      console.log(
        `当前索引 [left ${left}, ${nums[left]}] [right ${right}, ${nums[right]}] [mid ${mid}, ${nums[mid]}]`,
      );
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return [left, nums[left]];
  }

  console.log(search([10, 21, 34, 46, 58, 73, 81, 95], 11));
}

{
  function search(nums, target) {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      const middle = left + ((right - left) >> 1);
      if (nums[middle] > target) {
        right = middle - 1;
      } else if (nums[middle] < target) {
        left = middle + 1;
      } else {
        return middle;
      }
    }
    return -1;
  }
  console.log("111", search([10, 21, 34, 46, 58, 73, 81, 95], 46));
}

{
  function search(nums, target) {
    let left = 0,
      right = nums.length - 1;
    let index = -1;
    while (left <= right) {
      const middle = left + ((right - left) >> 1);
      if (nums[middle] > target) {
        right = middle - 1;
      } else if (nums[middle] < target) {
        left = middle + 1;
      } else {
        index = middle;
        break;
      }
    }
    if (index === -1) {
      return [-1, -1];
    } else {
      let start = index;
      while (start > -1) {
        if (nums[start] === target) {
          start--;
        } else {
          break;
        }
      }
      let end = index;
      while (end <= nums.length - 1) {
        if (nums[end] === target) {
          end++;
        } else {
          break;
        }
      }
      return [start + 1, end - 1];
    }
  }
  console.log("2222222", search([5, 5, 7, 8, 8, 9], 5));
}
{
  console.log("---------");
  const arr = [1, 1, 5];
  function search(nums, target) {
    function findLeftBorder(nums, target) {
      let left = 0;
      let right = nums.length - 1;
      let leftBorder = -2;
      while (left <= right) {
        let middle = left + ((right - left) >> 1);
        if (nums[middle] < target) {
          left = middle + 1;
        } else {
          right = middle - 1;
          leftBorder = right;
        }
      }
      return leftBorder;
    }
    function findRightBorder(nums, target) {
      let left = 0;
      let right = nums.length - 1;
      let rightBorder = -2;
      while (left <= right) {
        let middle = left + Math.floor((right - left) / 2);
        if (nums[middle] > target) {
          right = middle - 1;
        } else {
          left = middle + 1;
          rightBorder = left;
        }
      }
      return rightBorder;
    }
    const leftBorder = findLeftBorder(nums, target);
    const rightBorder = findRightBorder(nums, target);
    console.log(leftBorder, rightBorder);
    if (leftBorder === -2 || rightBorder === -2) {
      return [-1, -1];
    }
    if (rightBorder - leftBorder > 1) {
      return [leftBorder + 1, rightBorder - 1];
    }
    return [-1, -1];
  }
  console.log(search(arr, 5));
}

{
  function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let leftBorder = -1;
    let rightBorder = -1;
    while (left <= right) {
      let middle = left + ((right - left) >> 1);
      if (nums[middle] === target) {
        leftBorder = middle;
        right = middle - 1;
      } else if (nums[middle] > target) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    left = 0;
    right = nums.length - 1;
    while (left <= right) {
      let middle = left + ((right - left) >> 1);
      if (nums[middle] === target) {
        rightBorder = middle;
        left = middle + 1;
      } else if (nums[middle] > target) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    return [leftBorder, rightBorder];
  }
}

{
  /**
   * @param {number} x
   * @return {number}
   */
  var mySqrt = function (x) {
    let left = 0;
    let right = x;
    let leftBorder = 0;
    while (left <= right) {
      let middle = left + ((right - left) >> 1);
      if (middle * middle > x) {
        right = right - 1;
      } else {
        leftBorder = middle;
        left = left + 1;
      }
    }
    if (leftBorder * leftBorder === x) {
      return leftBorder;
    } else {
      return leftBorder - 1;
    }
  };
  // console.log("mySqrt", mySqrt(2147395599));
}

{
  console.log(Math.exp(0.5 * Math.log(80)));
}

{
  /**
   * @param {number} num
   * @return {boolean}
   */
  var isPerfectSquare = function (num) {
    let left = 0;
    let right = num;
    while (left <= right) {
      const middle = left + ((right - left) >> 1);
      const sqrt = middle * middle;
      if (sqrt === num) {
        return true;
      } else if (sqrt > num) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    return false;
  };
}
