/**
 * https://leetcode.cn/problems/compare-version-numbers/description/
 */
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  function deleteZero(str) {
    let res = str;
    let length = str.length;
    for (let i = 0; i < length; i++) {
      if (str[i] === "0") {
        res = res.slice(1);
      } else {
        return res;
      }
    }
    return "0";
  }
  const version1List = version1.split(".");
  const version2List = version2.split(".");
  const maxLength =
    version1.length > version2.length ? version1.length : version2.length;
  for (let i = 0; i < maxLength; i++) {
    const version1Item = version1List[i] ?? "0";
    const version2Item = version2List[i] ?? "0";
    const v1 = deleteZero(version1Item);
    const v2 = deleteZero(version2Item);
    if (Number(v1) > Number(v2)) {
      return 1;
    } else if (Number(v1) < Number(v2)) {
      return -1;
    }
  }
  return 0;
};

{
  /**
   * 优化空间复杂度
   */
  var compareVersion = function (version1, version2) {
    const m = version1.length,
      n = version2.length;
    let i = 0,
      j = 0;
    while (i < m || j < n) {
      let x = 0;
      for (; i < m && version1[i] !== "."; i++) {
        x = x * 10 + Number(version1[i]);
      }
      i++;
      let y = 0;
      for (; j < n && version2[j] !== "."; j++) {
        y = y * 10 + Number(version2[j]);
      }
      j++;
      if (x !== y) {
        return x > y ? 1 : -1;
      }
    }
    return 0;
  };
}

console.log(compareVersion("1.0.006", "1.0.2"));
