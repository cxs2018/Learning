// 遍历
// 104. 二叉树的最大深度
// 记录最大深度
var res = 0;
// 记录遍历到的节点的深度
var depth = 0;

var traverse = function (root) {
  if (root === null) {
    return;
  }
  // 前序位置
  depth++;
  if (root.left === null && root.right === null) {
    // 到达叶子节点，更新最大深度
    res = Math.max(res, depth);
  }
  traverse(root.left);
  traverse(root.right);
  // 后序位置
  depth--;
};

var maxDepth1 = function (root) {
  traverse(root);
  return res;
};

// 递归（分解问题）
var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }
  // 利用定义，计算左右子树的最大深度
  var leftMax = maxDepth(root.left);
  var rightMax = maxDepth(root.right);
  // 整颗数的最大深度等于左右子树的最大深度取最大值，然后再加上跟节点自己
  var res = Math.max(leftMax, rightMax) + 1;

  return res;
};

// 输入一个二叉树的根节点，返回这棵树的前序遍历结果
var preorderTraverse = function (root) {
  var ret = [];
  if (root == null) {
    return ret;
  }
  // 前序遍历的结果，root.val在第一个
  ret.push(root.val);
  // 利用函数定义，后面接着左子树的前序遍历结果
  ret.push(...preorderTraverse(root.left));
  // 利用函数定义，最后接着右子树的前序遍历结果
  ret.push(...preorderTraverse(root.right));
  return ret;
};

// 遇到一个二叉树的题目时通用的思考过程是
// 1. 是否可以通过遍历一遍二叉树得到答案
// 2. 是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案
// 3. 无论使用哪一种思维模式，你都要明白二叉树的每个节点需要做什么，需要在什么时候（前中后序）做

// 前序位置的代码只能从函数参数中获取父节点传递来的数据，而后序位置的代码不仅可以获取参数数据，还可以获取到子树头通过函数返回值传递回来的数据

// 1. 如果把根节点看做第1层，如何打印出每一个节点所在的层级
var traverseLevel = function (root, level) {
  if (root === null) {
    return;
  }
  console.log(root, level);
  traverse(root.left, level + 1);
  traverse(root.right, level + 1);
};

traverseLevel(root, 1);

// 2. 如何打印出每个节点的左右子树各有多少个节点
var traverseCount = function (root) {
  if (root === null) {
    return;
  }
  var leftCount = traverseCount(root.left);
  var rightCount = traverseCount(root.right);
  console.log(root, leftCount, rightCount);

  return leftCount + rightCount + 1;
};

// 543. 二叉树的直径
var diameterOfbinaryTree1 = function (root) {
  // 记录最大直径的长度
  var maxDiameter = 0;

  // 计算二叉树的最大深度
  var maxDepth = function (root) {
    if (root === null) {
      return 0;
    }
    // 利用定义，计算左右子树的最大深度
    var leftMax = maxDepth(root.left);
    var rightMax = maxDepth(root.right);
    // 整颗数的最大深度等于左右子树的最大深度取最大值，然后再加上跟节点自己
    var res = Math.max(leftMax, rightMax) + 1;

    return res;
  };

  // 遍历二叉树
  var traverseCount = function (root) {
    if (root === null) {
      return;
    }
    // 对每个节点计算直径
    var leftCount = maxDepth(root.left);
    var rightCount = maxDepth(root.right);
    // 更新全局最大直径
    maxDiameter = Math.max(maxDiameter, leftCount + rightCount);

    traverseCount(root.left);
    traverseCount(root.right);
  };

  // 对每个节点计算直径，求最大直径
  traverseCount(root);
  return maxDiameter;
};

// 后序
var diameterOfbinaryTree = function (root) {
  var maxDiameter = 0;

  // 计算二叉树的最大深度
  var maxDepth = function (root) {
    if (root === null) {
      return 0;
    }
    // 利用定义，计算左右子树的最大深度
    var leftMax = maxDepth(root.left);
    var rightMax = maxDepth(root.right);

    maxDiameter = Math.max(leftMax + rightMax, maxDiameter);

    // 整颗数的最大深度等于左右子树的最大深度取最大值，然后再加上跟节点自己
    return Math.max(leftMax, rightMax) + 1;
  };

  maxDepth(root);

  return maxDiameter;
};

// 层序遍历-递归
var levelOrder = function (root) {
  var res = [];
  function _levelOrder(node, level) {
    if (node === null) {
      return;
    }
    res[level] = res[level] || [];
    res[level].push(node.val);
    _levelOrder(node.left, level + 1);
    _levelOrder(node.right, level + 1);
  }
  _levelOrder(root, 0);

  return res;
};

// 层序遍历-迭代
var levelOrderIteration = function (root) {
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

// 226. 翻转二叉树
var invertTree = function (root) {
  // 二叉树遍历框架
  function traverse(node) {
    if (node === null) {
      return;
    }

    // 前序位置
    // 每个节点需要做的事就是交换它的左右子节点
    // var temp = node.left;
    // node.left = node.right;
    // node.right = temp;
    // console.log("正在交换", node.left, node.right);

    // 遍历框架，去遍历左右子树的节点
    traverse(node.left);

    // 中序位置，error
    var temp = node.left;
    node.left = node.right;
    node.right = temp;
    console.log("正在交换", node.left, node.right);

    traverse(node.right);

    // 后序位置
    // var temp = node.left;
    // node.left = node.right;
    // node.right = temp;
    // console.log("正在交换", node.left, node.right);
  }

  // 交换二叉树，交换每个节点的子节点
  traverse(root);

  return root;
};

// 翻转二叉树-递归(分解问题)
// 定义: 将以root为根的这棵二叉树翻转,返回翻转后的二叉树的根节点
var invertTreeRecursive = function (root) {
  if (root === null) {
    return null;
  }
  // 利用函数定义,先翻转左右子树
  var left = invertTreeRecursive(root.left);
  var right = invertTreeRecursive(root.right);

  // 然后交换左右子节点
  root.left = right;
  root.right = left;

  // 和定义逻辑自洽: 以root为根的这棵二叉树已经被翻转,返回root
  return root;
};

var root = {
  val: "1",
  left: {
    val: "2",
    left: {
      val: "3",
      left: null,
      right: null,
    },
    right: {
      val: "4",
      left: null,
      right: null,
    },
  },
  right: {
    val: "5",
    left: {
      val: "3",
      left: null,
      right: null,
    },
    right: {
      val: "7",
      left: null,
      right: null,
    },
  },
};

// console.log(invertTreeRecursive(root));

// console.log(invertTree(root));

// 116. 填充每个二叉树节点的右侧指针
var connect = function (root) {
  if (root == null) return null;
  // 三叉树 遍历框架
  function traverse(node1, node2) {
    if (node1 === null || node2 === null) {
      return;
    }
    // 前序位置
    // 将传入的两个节点穿起来
    node1.next = node2;

    // 连接相同父节点的两个子节点
    traverse(node1.left, node1.right);
    traverse(node2.left, node2.right);
    // 连接跨越父节点的两个子节点
    traverse(node1.right, node2.left);
  }
  // 遍历 三叉树,连接相邻节点
  traverse(root.left, root.right);
  return root;
};

var root2 = root;
console.log(connect(root2));

// 114. 将二叉树展开为链表
// 定义: 输入节点root,然后root为根的二叉树就会被拉平为一条链表
var flatten = function (root) {
  if (root === null) {
    return;
  }

  // 利用定义,把左右子树拉平
  flatten(root.left);
  flatten(root.right);

  // 后序遍历位置
  // 左右子树已经被拉平为一条链表
  var left = root.left;
  var right = root.right;

  // 将左子树作为右子树
  root.left = null;
  root.right = left;

  // 将原先的右子树接到当前右子树的末端
  var p = root;
  while (p.right !== null) {
    p = p.next;
  }
  p.right = right;
};
