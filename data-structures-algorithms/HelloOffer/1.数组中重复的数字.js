function findRepeatNumber(arr) {
  // const map = new Map();
  // for (let i = 0; i < arr.length; i++) {
  //   if (map.has(arr[i])) {
  //     return arr[i];
  //   } else {
  //     map.set(arr[i], true);
  //   }
  // }
  // const queue = new Array(arr.length);
  // for (let i = 0; i < arr.length; i++) {
  //   if (queue.indexOf(arr[i]) !== -1) {
  //     return arr[i];
  //   } else {
  //     queue.push(arr[i]);
  //   }
  // }
  for (let i = 0; i < arr.length; i++) {
    let temp;
    while (arr[i] !== i) {
      if (arr[i] === arr[arr[i]]) {
        return arr[i];
      }
      temp = arr[i];
      arr[i] = arr[temp];
      arr[temp] = temp;
    }
    return -1;
  }
}

const data = [2, 3, 1, 0, 2, 5, 3];
console.log(findRepeatNumber(data));
