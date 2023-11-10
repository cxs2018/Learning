/**
 * 两个字母字符串是否可以通过变换顺序得到
 */
function isAnagram(s, t) {
  const record = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    record[s[i].charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  for (let i = 0; i < t.length; i++) {
    record[t[i].charCodeAt(0) - "a".charCodeAt(0)]--;
  }
  for (let i = 0; i < record.length; i++) {
    if (record[i] !== 0) {
      return false;
    }
  }
  return true;
}
