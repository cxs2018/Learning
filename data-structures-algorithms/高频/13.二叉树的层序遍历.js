/**
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/description/
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const nodeList = [];
  function insertNode(list, index, node) {
    if (Array.isArray(list[index])) {
      list[index].push(node.val);
    } else {
      list[index] = [node.val];
    }
  }
  function dfs(node, list, index) {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      insertNode(list, index, node);
      return;
    }
    insertNode(list, index, node);
    if (node.left) {
      dfs(node.left, nodeList, ++index);
      index--;
    }
    if (node.right) {
      dfs(node.right, nodeList, ++index);
    }
  }
  dfs(root, nodeList, 0);
  return nodeList;
};

const root = {
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null,
  },
  right: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};

console.log(levelOrder(root));

{
  // 迭代
  var levelOrder = function (root) {
    if (root === null) {
      return [];
    }
    var ans = [];
    var level = 0;
    var queue = [root];
    while (queue.length) {
      ans.push([]);
      var length = queue.length;
      for (var i = 0; i < length; i++) {
        var node = queue.shift();
        ans[level].push(node.val);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
      }
      level++;
    }

    return ans;
  };
}
