/**
 * 染色法+DFS
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
 var possibleBipartition1 = function(n, dislikes) {
    const dfs = (curnode, nowcolor, color, g) => {
        color[curnode] = nowcolor;
        for (const nextnode of g[curnode]) {
            if (color[nextnode] !== 0 && color[nextnode] === color[curnode]) {
                return false;
            }
            if (color[nextnode] === 0 && !dfs(nextnode, 3 ^ nowcolor, color, g)) {
                return false;
            }
        }
        return true;
    }
    const color = new Array(n + 1).fill(0); // 每个人对应的颜色
    const g = new Array(n + 1).fill(0); 
    for (let i = 0; i <= n; ++i) { 
        g[i] = [];
    }
    for (const p of dislikes) { // 给每个人做一张仇人表
        g[p[0]].push(p[1]);
        g[p[1]].push(p[0]);
    }
    for (let i = 1; i <= n; ++i) {
        if (color[i] === 0 && !dfs(i, 1, color, g)) {
            return false;
        }
    }
    return true;
};

// 并查集 Disjoint Set Structure，又名 Union-Find算法 => 图论 动态连通性

// 连通 是一种等价关系，具有下面三个性质
// 1. 自反性：节点p和p是连通的
// 2. 对称性：如果节点p和q连通，那么q和p也连通
// 3. 传递性：如果节点p和q连通，q和r连通，那么p和r也连通

class UF {
    constructor(n) {
        // 记录连通分量，一开始不连通
        this.count = n;
        // 节点x的父节点是parent[x]
        this.parent = new Array(n);
        // 记录数的重量，即每颗树包含的节点数
        this.size = new Array(n);
        // 父节点指针初始指向自己，每棵树只有一个节点，重量初始化为1
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.size[i] = 1;
        }
    }
    // 将p和q连接
    union(p, q) {
        console.log('union', p, q)
        let rootP = this.find(p);
        let rootQ = this.find(q);
        if (rootP === rootQ) {
            return;
        }
        // 小树接到大树下面，较平衡
        this.parent[rootP] = rootQ
        // 两个分量合二为一
        this.count--;
    }
    // 判断p和q是否连通
    connected(p,q) {
        let rootP = this.find(p);
        let rootQ = this.find(q);
        console.log(rootP, rootQ, rootP === rootQ)
        return rootP === rootQ
    }
    // 返回图中有多少个连通分量
    get getCount() {
        this.count;
    }
    // 返回某个节点的x的根节点
    find(x) {
        // 根节点的parent[x] === x
        if(this.parent[x] != x) {
            // 路径压缩
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
}

// let uf = new UF(10);
// uf.union(1,2)
// uf.union(2,3)
// uf.union(3,7)
// uf.union(1,9)
// uf.union(7,9)
// console.log(uf, uf.connected(0, 7), uf.connected(1, 7));

var possibleBipartition = function(n, dislikes) {
    var graph = new Array(n+1);

    for (var i = 0; i <= n; i++) {
        graph[i] = [];
    }

    for (var p of dislikes) {
        graph[p[0]].push(p[1]);
        graph[p[1]].push(p[0]);
    }

    var uf = new UF(n+1);
    for (var i = 1; i<= n; i++) {
        for (var j = 0; j < graph[i].length; j++) {
            uf.union(graph[i][0], graph[i][j]);
            if (uf.connected(i, graph[i][j])) {
                return false;
            }
        }
    }  
    return true;
}

// possibleBipartition(4, [[1,2],[1,3],[2,4]])
console.log(possibleBipartition(5,[[1,2],[2,3],[3,4],[4,5],[1,5]]))