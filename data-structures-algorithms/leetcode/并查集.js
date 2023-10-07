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
    connected(p, q) {
        let rootP = this.find(p);
        let rootQ = this.find(q);
        console.log(rootP, rootQ, rootP === rootQ)
        return rootP === rootQ
    }
    // 返回图中有多少个连通分量
    get getCount() {
        return this.count;
    }
    // 返回某个节点的x的根节点
    find(x) {
        // 根节点的parent[x] === x
        if (this.parent[x] != x) {
            // 路径压缩
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
}

// 无向图中连通分量的数目
var countComponents = function (n, edges) {
    var uf = new UF(n);
    for (var [a, b] of edges) {
        uf.union(a, b);
    }
    return uf.getCount;
}

// 等式方程的可满足性
var equationsPossible = function (equations) {
    var uf = new UF(26);
    for (var equation of equations) {
        if (equation[1] === '=') {
            uf.union(equation[0].charCodeAt() - 97, equation[3].charCodeAt() - 97);
        }
    }
    for (var equation of equations) {
        if (equation[1] === '!' && uf.connected(equation[0].charCodeAt() - 97, equation[3].charCodeAt() - 97)) {
            return false;
        }
    }
    return true;
}

// 130. 被包围的区域
// 二维坐标（x,y）可以转换成 x * n + y 这个数，n是数组的列数，这是将二维坐标映射到一维的常用技巧
var solve = function (board) {
    var m = board.length;
    var n = board[0].length;
    // 给dummy留一个位置
    var uf = new UF(m * n + 1);
    var dummy = m * n;
    // 将首列和末列的O与dummy连通
    for (var i = 0; i < m; i++) {
        if (board[i][0] === 'O') {
            uf.union(i * n, dummy);
        }
        if (board[i][n - 1] === 'O') {
            uf.union(i * n + n - 1, dummy);
        }
    }
    // 将首行和末行的O与dummy连通
    for (var i = 0; i < n; i++) {
        if (board[0][i] === 'O') {
            uf.union(i, dummy);
        }
        if (board[m - 1][i] === 'O') {
            uf.union(n * (m - 1) + i, dummy);
        }
    }
    // 方向数组d是上下左右搜索的常用手段
    var d = [[1, 0], [0, 1], [0, -1], [-1, 0]];
    for (var i = 1; i < m - 1; i++) {
        for (var j = 1; j < n - 1; j++) {
            if (board[i][j] === 'O') {
                // 将此0与上下左右的0连通
                for (var k = 0; k < 4; k++) {
                    var x = i + d[k][0];
                    var y = j + d[k][1];
                    if (board[x][y] === 'O') {
                        uf.union(x * n + y, i * n + j);
                    }
                }
            }
        }
    }
    // 所有不和dummy连通的O，都要被替换
    for (var i = 1; i < m - 1; i++) {
        for (var j = 1; j < n - 1; j++) {
            if (!uf.connected(dummy, i * n + j)) {
                board[i][j] = 'X';
            }
        }
    }
};

// console.log(countComponents(6, [[1, 3], [3, 2], [4, 5], [6, 5]]))

// console.log(equationsPossible(["c==c", "b==d", "x!=z"]));
// console.log(equationsPossible(["a==b", "b!=c", "c==a"]));

var board = [["X","O","X"],["X","O","X"],["X","O","X"]]

solve(board);

console.log(board);