function lowestCommonAncestor(root, p, q) {
	function travelTree(root, p, q) {
		if (root === null || root === p || root === q) return root;
		var left = travelTree(root.left, p, q);
		var right = travelTree(root.right, p, q);
		if (left !== null && right !== null) return root
		if (left === null) return right
		return left
	}
	return travelTree(root, p, q)
}