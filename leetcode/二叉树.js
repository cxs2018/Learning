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
}

var maxDepth1 = function (root) {
    traverse(root);
    return res;
}

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
}

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
}

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
}

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
}

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
    }

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
    }

    // 对每个节点计算直径，求最大直径
    traverseCount(root);
    return maxDiameter
}

// 后序
var diameterOfbinaryTree = function(root) {
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
    }

    maxDepth(root);

    return maxDiameter;
}

// 层序遍历-递归
var levelOrder = function(root) {
    var res = [];
    function _levelOrder(node, level) {
        if (node === null) {
            return;
        }
        res[level] = res[level] || [];
        res[level].push(node.val);
        _levelOrder(node.left, level +1);
        _levelOrder(node.right, level +1);
    }
    _levelOrder(root, 0);

    return res;
}

// 层序遍历-迭代
var levelOrderIteration = function(root) {
    if (root === null) {
        return [];
    }
    var ans = [];
    var level = 0;
    var queue = [root];
    while(queue.length) {
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
}
