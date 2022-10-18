/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function (arr) {
    var stack = [];
    console.log(stack);
    for (var i = 0; i < arr.length; i++) {
        // 栈为空或栈顶元素小于当前原生，将站定
        if (stack.length === 0 || arr[i] > stack[stack.length - 1]) {
            stack.push(arr[i]);
            console.log(stack);
        } else {
            var max = stack.pop();
            console.log(stack);
            while (stack.length > 0 && stack[stack.length - 1] > arr[i]) {
                stack.pop();
                console.log(stack);
            }
            stack.push(max);
            console.log(stack);
        }
    }
    console.log(stack);
    return stack.length
};

const arr = [3, 2, 1, 2, 7, 6, 5, 6, 9, 10, 7];

console.log(maxChunksToSorted(arr));