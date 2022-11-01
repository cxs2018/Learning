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

// 层序遍历-递归 ？？？这个有问题，这是前序遍历吧
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

// 654. 最大二叉树
var constructMaximumBinaryTree = function (nums) {
  // 将nums[low...high]构造成符合条件的树，返回根节点
  function build(nums, low, high) {
    if (low > high) {
      return null;
    }

    // 找到数组中的最大值和对应的索引
    var index = -1,
      max = -1;
    for (var i = low; i <= high; i++) {
      if (max < nums[i]) {
        index = i;
        max = nums[i];
      }
    }

    // 先构造出根节点
    var root = new TreeNode(max);
    // 递归调用构造左右子树
    root.left = build(nums, low, index - 1);
    root.right = build(nums, index + 1, high);

    return root;
  }

  return build(nums, 0, nums.length - 1);
};

// 105. 从前序和中序遍历序列构造二叉树
var buildTree1 = function (preorder, inorder) {
  var map = {};
  for (var i = 0; i < inorder.length; i++) {
    map[inorder[i]] = i;
  }

  function build(pre, preStart, preEnd, mid, midStart, midEnd) {
    if (preStart > preEnd) {
      return null;
    }

    // root节点对应的值就是前序遍历数组的第一个元素
    var rootVal = pre[preStart];
    // rootVal在中序遍历数组中的索引
    var index = map[rootVal];

    var leftSize = index - midStart;

    // 先构造出当前根节点
    var root = new TreeNode(rootVal);
    // 递归构造左右子树
    root.left = build(
      pre,
      preStart + 1,
      preStart + leftSize,
      mid,
      midStart,
      index - 1
    );
    root.right = build(
      pre,
      preStart + leftSize + 1,
      preEnd,
      mid,
      index + 1,
      midEnd
    );

    return root;
  }

  return build(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  );
};

// 106. 从中序和中序遍历序列构造二叉树
var buildTree2 = function (inorder, postorder) {
  var map = {};
  for (var i = 0; i < inorder.length; i++) {
    map[inorder[i]] = i;
  }

  function build(post, postStart, postEnd, mid, midStart, midEnd) {
    if (postStart > postEnd) {
      return null;
    }

    // root节点对应的值就是前序遍历数组的第一个元素
    var rootVal = post[postEnd];
    // rootVal在中序遍历数组中的索引
    var index = map[rootVal];

    var leftSize = index - midStart;

    // 先构造出当前根节点
    var root = new TreeNode(rootVal);
    // 递归构造左右子树
    root.left = build(
      post,
      postStart,
      postStart + leftSize - 1,
      mid,
      midStart,
      index - 1
    );
    root.right = build(
      post,
      postStart + leftSize,
      postEnd - 1,
      mid,
      index + 1,
      midEnd
    );

    return root;
  }

  return build(
    postorder,
    0,
    postorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  );
};

// 889. 通过后序和前序遍历结果构造二叉树
var buildTree3 = function (preorder, postorder) {
  var map = {};
  for (var i = 0; i < inorder.length; i++) {
    map[inorder[i]] = i;
  }

  // 构建二叉树，并返回根节点
  function build(pre, preStart, preEnd, post, postStart, postEnd) {
    if (preStart > preEnd) {
      return null;
    }
    if (preStart === preEnd) {
      return new TreeNode(pre[preStart]);
    }

    // root节点对应的值就是前序遍历数组的第一个元素
    var rootVal = pre[preStart];
    // root.left 的值是前序遍历第二个元素
    // 通过前序和后序遍历构造二叉树的关键在于通过左子树的根节点
    // 确定preorder和postorder中左右子树的元素区间
    var leftRootVal = pre[preStart + 1];
    // leftRootVal在后序遍历数组中的索引
    var index = map[leftRootVal];
    // 左子树的元素个数
    var leftSize = index - postStart + 1;

    // 先构造出当前根节点
    var root = new TreeNode(rootVal);
    // 递归构造左右子树，根据左子树的根节点索引和元素个数推导左右子树的索引边界
    root.left = build(
      pre,
      preStart + 1,
      preStart + leftSize,
      post,
      postStart,
      index
    );
    root.right = build(
      pre,
      preStart + leftSize + 1,
      preEnd,
      post,
      index + 1,
      postEnd - 1
    );

    return root;
  }

  return build(
    preorder,
    0,
    preorder.length - 1,
    postorder,
    0,
    postorder.length - 1
  );
};

// 297. 序列化与反序列化-前序遍历
function serializePreOrder() {
  function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
  }
  // 序列化
  var serialize = function (root) {
    var str = "";

    function _serialize(node) {
      if (node === null) {
        str += "#,";
        return;
      }
      str += node.val + ",";
      _serialize(node.left);
      _serialize(node.right);
    }

    _serialize(root);

    return str;
  };
  // 反序列化
  var deserialize = function (data) {
    var node = data.split(",");

    function _deserialize(nodes) {
      if (nodes.length === 0) {
        return null;
      }

      var first = nodes.shift();
      if (first === "#") {
        return null;
      }

      var root = new TreeNode(+first);

      root.left = _deserialize(nodes);
      root.right = _deserialize(nodes);

      return root;
    }

    return _deserialize(node);
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

  console.log(serialize(root));
  console.log(deserialize(serialize(root)));
}

// 序列化与反序列化-后序遍历
function serializePostorder() {
  function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
  }
  var serialize = function (root) {
    var str = "";

    function _serialize(node) {
      if (node === null) {
        str += "#,";
        return;
      }
      _serialize(node.left);
      _serialize(node.right);
      str += node.val + ",";
    }

    _serialize(root);

    return str;
  };
  var deserialize = function (data) {
    var node = data.split(",");
    node.pop();

    function _deserialize(nodes) {
      if (nodes.length === 0) {
        return null;
      }

      var first = nodes.pop();
      if (first === "#") {
        return null;
      }

      var root = new TreeNode(+first);

      root.right = _deserialize(nodes);
      root.left = _deserialize(nodes);

      return root;
    }

    return _deserialize(node);
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

  console.log(serialize(root));
  console.log(deserialize(serialize(root)));
}

// 中序遍历无法实现反序列化，因为无法确定根节点位置

// 序列化与反序列化-层序遍历
function serializeLevelOrder() {
  function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
  }
  var serialize = function (root) {
    if (root === null) {
      return "#,";
    }
    var queue = [root];
    var str = "";
    while (queue.length) {
      var length = queue.length;
      for (var i = 0; i < length; i++) {
        var node = queue.shift();
        if (node === null) {
          str += "#,";
          continue;
        }
        str += node.val + ",";
        queue.push(node.left);
        queue.push(node.right);
      }
    }

    return str;
  };
  var deserialize = function (data) {
    if (!data) {
      return null;
    }
    var nodes = data.split(",");
    nodes.pop();

    var root = new TreeNode(nodes[0]);
    var queue = [];
    queue.push(root);

    for (var i = 1; i < nodes.length; ) {
      var parent = queue.shift();
      var left = nodes[i++];
      if (left !== "#") {
        parent.left = new TreeNode(+left);
        queue.push(parent.left);
      } else {
        parent.left = null;
      }
      var right = nodes[i++];
      if (right !== "#") {
        parent.right = new TreeNode(+right);
        queue.push(parent.right);
      } else {
        parent.right = null;
      }
    }

    return root;
  };
  var root = {
    val: "1",
    left: {
      val: "2",
      left: null,
      right: {
        val: "4",
        left: null,
        right: null,
      },
    },
    right: {
      val: "3",
      left: null,
      right: null,
    },
  };

  console.log(serialize(root));
  console.log(deserialize(serialize(root)));
}

// 230. 二叉搜索树中第k小的元素
var kthSmallest = function (root, k) {
  var res = 0;
  var rank = 0;
  function traverse(node) {
    if (node === null) {
      return;
    }
    traverse(node.left);

    rank++;

    if (k === rank) {
      res = node.val;
      return;
    }

    traverse(node.right);
  }
  traverse(root);
  return res;
};

// 538. 把二叉搜索树转换为累加树
// 1038. 从二叉搜索树到更大和树
var convertBST = function (root) {
  var sum = 0;
  function traverse(node) {
    if (node === null) {
      return;
    }
    traverse(node.right);
    sum += node.val;
    node.val = sum;
    traverse(node.left);
  }
  traverse(root);
  return root;
};
// 652. 寻找重复的子树
var findDuplicateSubtrees = function (root) {
  var map = new Map();
  var res = [];
  function traverse(node) {
    if (node === null) {
      return "#";
    }
    var left = traverse(node.left);
    var right = traverse(node.right);

    var subTree = left + "," + right + "," + node.val;

    var count = map.get(subTree) || 0;

    if (count === 1) {
      res.push(node);
    }

    map.set(subTree, count + 1);
    return subTree;
  }

  traverse(root);

  return res;
};

// 98. 验证二叉搜索树
var isValidBST = function (root) {
  // 限定以root为根的子树节点必须满足 max.val > node.val > min.val
  function traverse(node, min, max) {
    if (node === null) {
      return true;
    }
    // 若node.val不符合max和min的限制，说明不是合法BST
    if (min !== null && min.val >= node.val) {
      return false;
    }
    if (max !== null && max.val <= node.val) {
      return false;
    }
    // 限定左子树的最大值是node.val，右子树的最小值是node.val
    return traverse(node.left, min, node) && traverse(node.right, node, max);
  }
  return traverse(root, null, null);
};

// 700. 二叉搜索树中的搜索
var searchBST = function (root, target) {
  if (root === null) {
    return null;
  }
  if (root.val === target) {
    return root;
  }
  if (root.val > target) {
    return searchBST(root.left, target);
  } else {
    return searchBST(root.right, target);
  }
};

// 450. 删除BST的一个节点
var getMin = function (node) {
  // BST 最左边的就是最小的
  while (node.left != null) {
    node = node.left;
  }
  return node;
};
var deleteNode = function (root, key) {
  if (root === null) {
    return null;
  }
  if (root.val === key) {
    // 这两个if把情况1和2都正确处理了
    if (root.left == null) return root.right;
    if (root.right === null) return root.left;
    // 处理情况3
    // 获得右子树最小的节点
    var minNode = getMin(root.right);
    // 删除右子树最小的节点
    root.right = deleteNode(root.right, minNode.val);
    // 用右子树最小的节点替换root节点
    minNode.left = root.left;
    minNode.right = root.right;
    root = minNode;
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key);
  } else {
    root.right = deleteNode(root.right, key);
  }
  return root;
};

// 1001. 在BST中插入一个树
var insertIntoBST = function (root, val) {
  // 找到空位置插入新节点
  if (root === null) {
    return new TreeNode(val);
  }
  if (root.val < val) {
    root.right = insertIntoBST(root.right, val);
  }
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val);
  }
  return root;
};
