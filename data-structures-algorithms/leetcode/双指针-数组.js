// 26. 删除有序数组中的重复项
var removeDuplicates = function (nums) {
    if (nums.length === 0) {
        return;
    }
    var slow = 0, fast = 0;
    while (fast < nums.length) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }
    return slow + 1
}

var nums = [1, 1, 2];

var nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 4, 9];

console.log(removeDuplicates(nums), nums);
console.log(removeDuplicates(nums2), nums2);

// 83. 删除排序链表中的重复元素
var deleteDuplicates = function (head) {
    if (head === null) {
        return null;
    }
    var slow = head, fast = head;
    while (fast !== null) {
        if (fast.val !== slow.val) {
            slow.next = fast;
            slow = slow.next;
        }
        fast = fast.next;
    }
    slow.next = null;
    return head;
}

// 27. 移除元素
var removeElement = function (nums, val) {
    var fast = 0, slow = 0;
    while (fast < nums.length) {
        if (nums[fast] != val) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow;
}

// 283. 移动零
var moveZeros = function (nums) {
    var p = removeElement(nums, 0);
    for (; p < nums.length; p++) {
        nums[p] = 0;
    }
}

// 左右指针
// 1. 二分查找
var binarySearch = function (nums, target) {
    var left = 0, right = nums.length - 1;
    while (left <= right) {
        var mid = (right + left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// 167. 两数之和
var twoSum = function (nums, target) {
    var left = 0, right = nums.length - 1;
    while (left < right) {
        var sum = nums[left] + nums[right];
        if (sum === target) {
            return [left + 1, right + 1]
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [-1, -1]
}

// 344. 反转字符串
var reverseString = function (s) {
    var left = 0, right = s.length - 1;
    while (left < right) {
        var temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}

// 判断某个字符串是否是回文串
var isPalindrome = function (s) {
    var left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log('-------', isPalindrome('asdfgfdsa'), isPalindrome('asddsa'), isPalindrome('asdf'));

// 5. 最长回文子串
// 在s中寻找以s[l]和s[r]为中心的最长回文串
var palindrome = function (s, l, r) {
    // 防止索引越界
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        // 双指针，向两边展开
        l--;
        r++;
    }
    // 返回以s[l]和s[r]为中心的最长回文串
    return s.slice(l + 1, r);
}


var longestPalindrome = function (s) {
    var res = "";
    for (var i = 0; i < s.length; i++) {
        // 以s[i]为中心的最长回文子串
        var s1 = palindrome(s, i, i);
        // 以s[i]和s[i+1]为中心的最长回文子串
        var s2 = palindrome(s, i, i + 1);
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;
    }
    return res;
}

console.log('-----longestPalindrome------', longestPalindrome('asdfgfdsac'));

console.log('---', binarySearch([0, 9, 10, 20, 4, 2, 19], 11));