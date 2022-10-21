// 前缀和主要适用的场景是原始数组不会被修改的情况下，频繁查询某个区间的累加和
// 差分数组的主要适用场景是频繁对原始数组的某个区间的元素进行增减

var getDiffArray = function (nums) {
    var diff = new Array(nums.length);
    diff[0] = nums[0];
    for (var i = 1; i < nums.length; i++) {
        diff[i] = nums[i] - nums[i - 1];
    }
    return diff;
}

var getReverseDiffArray = function (diff) {
    var res = new Array(diff.length);
    res[0] = diff[0];
    for (var i = 1; i < diff.length; i++) {
        res[i] = res[i - 1] + diff[i];
    }
    return res;
}

// 差分数组工具类
class Difference {
    constructor(nums) {
        // 输入一个初始数组，区间操作将在这个数组上进行
        this.diff = new Array(nums.length);
        // 根据初始数组构造差分数组
        this.diff[0] = nums[0];
        for (var i = 1; i < nums.length; i++) {
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }

    // 给闭区间[i,j]增加val（可以是负数）
    increment(i, j, val) {
        this.diff[i] += val;
        if (j+1 < this.diff.length) {
            this.diff[j+1] -= val;
        }
    }

    // 返回结果数组
    result() {
        var res = new Array(this.diff.length);
        // 根据差分数组构造结果数组
        res[0] = this.diff[0];
        for (var i = 1; i < this.diff.length; i++) {
            res[i] = res[i-1] + this.diff[i];
        }
        return res;
    }
}

var nums = [8, 2, 6, 3, 1];

console.log(nums, getDiffArray(nums), getReverseDiffArray(getDiffArray(nums)));

// 370.区间加法
var getModifiedArray = function(length, updates) {
    var nums = new Array(length).fill(0);
    var diff = new Difference(nums);
    for (var update of updates) {
        var [i, j, val] = update;
        diff.increment(i,j,val);
    }  
    return diff.result();  
}

console.log(getModifiedArray(5, [[1,3,2],[2,4,3],[0,2,-2]]));

// 1109. 航班预定统计
var cropFlightBooking = function(bookings, n) {
    var nums = new Array(n).fill(0);
    var diff = new Difference(nums);

    for (var booking of bookings) {
        var [i, j, val] = booking;
        diff.increment(i - 1, j - 1, val);
    }

    return diff.result();
}

// 1094. 拼车
var carPooling = function(trips, capacity) {
    var nums = new Array(1001).fill(0);
    var df = new Difference(nums);

    for (var trip of trips) {
        df.increment(trip[1], trip[2] - 1, trip[0]);
    }

    var res = df.result();

    for (var i = 0; i < res.length; i++) {
        if (capacity < res[i]) {
            return false;
        }
    }

    return true;
}