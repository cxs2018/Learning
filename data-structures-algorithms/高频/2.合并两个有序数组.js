/**
 * Leetcode 88
 * https://leetcode.cn/problems/merge-sorted-array/description/
 */
{
  // 直接合并后排序
  var merge = function (nums1, m, nums2, n) {
    nums1.splice(m, n, ...nums2);
    nums1.sort((a, b) => a - b);
  };
}

{
  // 双指针
  var merge = function (nums1, m, nums2, n) {
    let p1 = 0,
      p2 = 0;
    const sorted = new Array(m + n).fill(0);
    let cur;
    while (p1 < m || p2 < n) {
      if (p1 === m) {
        cur = nums2[p2++];
      } else if (p2 === n) {
        cur = nums1[p1++];
      } else if (nums1[p1] < nums2[p2]) {
        cur = nums1[p1++];
      } else {
        cur = nums2[p2++];
      }
      sorted[p1 + p2 - 1] = cur;
    }
    for (let i = 0; i < m + n; i++) {
      nums1[i] = sorted[i];
    }
  };
}
{
  // 优化空间复杂度的双指针
  var merge = function (nums1, m, nums2, n) {
    let p1 = m - 1,
      p2 = n - 1;
    let tail = m + n - 1;
    let cur;
    while (p1 >= 0 || p2 >= 0) {
      if (p1 === -1) {
        cur = nums2[p2--];
      } else if (p2 === -1) {
        cur = nums1[p1--];
      } else if (nums1[p1] > nums2[p2]) {
        cur = nums1[p1--];
      } else {
        cur = nums2[p2--];
      }
      nums1[tail--] = cur;
    }
  };
}
