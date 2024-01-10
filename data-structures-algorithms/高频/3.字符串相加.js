/**
 * https://leetcode.cn/problems/add-strings/
 * 先按最小的长
 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let carry = 0;
  let res = "";
  let num1Length = num1.length;
  let num2Length = num2.length;
  let minLength;
  let largeSize;
  if (num1Length < num2Length) {
    minLength = num1Length;
    largeSize = "num2";
  } else if (num1Length > num2Length) {
    minLength = num2Length;
    largeSize = "num1";
  } else {
    minLength = num1Length;
    largeSize = "equal";
  }
  for (let i = 0; i < minLength; i++) {
    let num1Item = num1[num1Length - 1 - i];
    let num2Item = num2[num2Length - 1 - i];
    let sumItem = Number(num1Item) + Number(num2Item) + carry;
    if (sumItem > 9) {
      carry = 1;
      sumItem -= 10;
    } else {
      carry = 0;
    }
    res = String(sumItem) + res;
  }
  if (largeSize === "equal") {
    if (carry === 0) {
      return res;
    } else {
      return String(carry) + res;
    }
  } else if (largeSize === "num1") {
    if (carry === 0) {
      return num1.slice(0, num1Length - num2Length) + res;
    } else {
      let length = num1Length - num2Length;
      carry = 0;
      for (let i = 0; i < length; i++) {
        let sumItem;
        if (i === 0) {
          sumItem = Number(num1[length - 1 - i]) + 1;
        } else {
          sumItem = Number(num1[length - 1 - i]) + carry;
        }
        if (sumItem > 9) {
          carry = 1;
          sumItem -= 10;
        } else {
          carry = 0;
        }
        res = String(sumItem) + res;
      }
      if (carry === 0) {
        return res;
      } else {
        return String(carry) + res;
      }
    }
  } else {
    if (carry === 0) {
      return num2.slice(0, num2Length - num1Length) + res;
    } else {
      let length = num2Length - num1Length;
      carry = 0;
      for (let i = 0; i < length; i++) {
        let sumItem;
        if (i === 0) {
          sumItem = Number(num2[length - 1 - i]) + 1;
        } else {
          sumItem = Number(num2[length - 1 - i]) + carry;
        }
        if (sumItem > 9) {
          carry = 1;
          sumItem -= 10;
        } else {
          carry = 0;
        }
        res = String(sumItem) + res;
      }
      if (carry === 0) {
        return res;
      } else {
        return String(carry) + res;
      }
    }
  }
};

let num1 = "168899993";
let num2 = "71";
console.log(addStrings(num1, num2));
