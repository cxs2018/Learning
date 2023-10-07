/**
 * 滑动窗口+哈希表
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
    var map = new Map();
    var max = 0, left = 0;
    
    for (var right = 0; right < fruits.length; right++) {
        map.set(fruits[right], (map.get(fruits[right]) || 0) + 1);
        while(map.size > 2) {
            map.set(fruits[left], map.get(fruits[left]) -1);
            if (map.get(fruits[left]) === 0) {
                map.delete(fruits[left]);
            }
            ++left;
        }
        max= Math.max(max, right - left + 1);
    }

    return max;
};

var fruits = [1,2,1];

console.log(totalFruit(fruits));