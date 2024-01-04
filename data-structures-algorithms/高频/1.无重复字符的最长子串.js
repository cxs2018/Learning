/**
 * 无重复字符的最长子串
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * 示例 1:
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 示例 2:
 *
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 示例 3:
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 *      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 * 提示：
 *
 * 0 <= s.length <= 5 * 104
 * s 由英文字母、数字、符号和空格组成
 */
/**
 * 暴力
 * @param s {string}
 */
function lengthOfLongestSubstring(s) {
  function allUnique(str, start, end) {
    let set = new Set();
    for (let i = start; i < end; i++) {
      let ch = str[i];
      if (set.has(ch)) {
        return false;
      }
      set.add(ch);
    }
    return true;
  }
  let n = s.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (allUnique(s, i, j)) {
        ans = Math.max(ans, j - i);
      }
    }
  }
  return ans;
}

{
  function lengthOfLongestSubstring(s) {
    let n = s.length;
    let set = new Set();
    let ans = 0,
      i = 0,
      j = 0;
    while (i < n && j < n) {
      if (!set.has(s[j])) {
        set.add(s[j++]);
        ans = Math.max(ans, j - i);
      } else {
        set.delete(s[i++]);
      }
    }
    return ans;
  }

  let str = "abcabcccwerdfggef";
  console.log(lengthOfLongestSubstring(str));
}

{
  function lengthOfLongestSubstring(s) {
    let arr = [],
      max = 0;
    for (let i = 0; i < s.length; i++) {
      let index = arr.indexOf(s[i]);
      if (index !== -1) {
        arr.splice(0, index + 1);
      }
      arr.push(s[i]);
      max = Math.max(arr.length, max);
    }
    return max;
  }

  let str = "abcabcccwerdfggef";
  console.log(lengthOfLongestSubstring(str));
}
