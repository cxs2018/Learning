/**
 * https://leetcode.cn/problems/valid-parentheses/description/
 */
var isValid = function (s) {
  // 括号的数量是奇数肯定是无效的
  if (s.length % 2 !== 0) {
    return false;
  }
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
      stack.push(s[i]);
    } else {
      const stackTopElement =
        stack.length > 0 ? stack[stack.length - 1] : undefined;
      if (
        (stackTopElement === "(" && s[i] === ")") ||
        (stackTopElement === "{" && s[i] === "}") ||
        (stackTopElement === "[" && s[i] === "]")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return !stack.length;
};
