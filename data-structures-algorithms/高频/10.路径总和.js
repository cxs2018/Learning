/**
 * https://leetcode.cn/problems/path-sum/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  let res = false;
  function dfs(node, path) {
    if (node) {
      path.push(node.val);
    }
    if (node && !node.left && !node.right) {
      let sum = 0;
      for (let i = 0; i < path.length; i++) {
        sum += path[i];
      }
      if (sum === targetSum) {
        res = true;
      }
      return;
    }
    if (node && node.left) {
      dfs(node.left, path);
      path.pop();
    }
    if (node && node.right) {
      dfs(node.right, path);
      path.pop();
    }
  }
  dfs(root, []);
  return res;
};

{
  // 递归
  function hasPathSum(root, targetSum) {
    // 如果节点为空，直接返回 false
    if (root === null) {
      return false;
    }
    // 叶子节点
    if (root.left === null && root.right === null) {
      return targetSum === root.val;
    }
    // 在左右子节点中查找
    return (
      hasPathSum(root.left, targetSum - root.val) ||
      hasPathSum(root.right, targetSum - root.val)
    );
  }
}
