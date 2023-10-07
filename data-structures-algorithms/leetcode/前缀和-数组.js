// 303. 区域和检索-数组不可变
// 不采用前缀和
class NumArray1 {
    constructor(nums) {
        this.nums = nums;
    }

    sumRange(left, right) {
        var res = 0;
        for (var i = left; i <= right; i++) {
            res += nums[i]
        }
        return res;
    }
}

class NumArray {
    constructor(nums) {
        this.preSum = new Array(nums.length + 1);
        this.preSum[0] = 0;
        // 计算nums的累加和
        for (var i = 1; i < this.preSum.length; i++) {
            this.preSum[i] = this.preSum[i - 1] + nums[i - 1];
        }
    }

    sumRange(left, right) {
        return this.preSum[right + 1] - this.preSum[left]
    }
}

// 生活中的例子：班上有若干同学，每个同学有一个期末考试的成绩（满分100分），请实现，输入任意一个分数段，返回有多少同学的成绩在这个分数段

var scoresFindArea = function (scores, low, high) {
    var count = new Array(100 + 1).fill(0);
    for (var score = 0; score < scores.length; score++) {
        count[scores[score]]++;
    }
    for (var i = 1; i < count.length; i++) {
        count[i] = count[i] + count[i - 1];
    }
    console.log(count);
    return count[high + 1] - count[low - 1];
}

console.log(scoresFindArea([23, 45, 78, 78, 98], 45, 78));

class NumMatrix {
    constructor(matrix) {
        var m = matrix.length, n = matrix[0].length;
        if (m === 0 || n === 0) return;
        this.preSum = new Array(m + 1).fill(0).map(() => new Array(n+1).fill(0));
        for (var i = 1; i <= m; i++) {
            for (var j = 1; j <= n; j++) {
                this.preSum[i][j] = this.preSum[i - 1][j] + this.preSum[i][j - 1] + matrix[i - 1][j - 1] - this.preSum[i - 1][j - 1];
            }
        }
    }

    sumRegion = function (row1, col1, row2, col2) {
        return this.preSum[row2 + 1][col2 + 1] - this.preSum[row1][col2 + 1] - this.preSum[row2 + 1][col1] + this.preSum[row1][col1];
    };
}

var matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]];

var mx = new NumMatrix(matrix);

console.log('====', mx.preSum);