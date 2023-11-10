function bubbleSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
}

const arr = [
  1, 3, 2, 340, 4, 5, 20, 10, 3, 66, 1, 3, 22, 34, 40, 5, 2, 10, 3, 6, 1, 3, 22,
  34, 40, 5, 2, 10, 3, 61, 3, 22, 34, 40, 5, 2, 10, 3, 61, 3, 22, 34, 40, 5, 2,
  10, 3, 6,
];

console.time("sort");
bubbleSort(arr);
console.timeEnd("sort");
console.log("result", arr);
