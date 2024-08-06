/**
 * 算法导论-快速排序
 * 最坏运行时间为O(n2)，平均运行时间为O(nlogn)，就地排序
 * 分治：A[p..r] => A[p..q-1]、A[q+1..r]
 * 2，8，7，1，3，5，6，4
 * a 2 8 7 1 3 5  6 4
 *
 */
function swap(A, i, j) {
  const temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
function partition(A, p, r) {
  const x = A[r];
  let i = p - 1;
  for (let j = p; j <= r - 1; j++) {
    if (A[j] <= x) {
      i = i + 1;
      swap(A, i, j);
    }
  }
  swap(A, i + 1, r);
  return i + 1;
}
function quickSort(A, p, r) {
  if (p < r) {
    const q = partition(A, p, r);
    quickSort(A, p, q - 1);
    quickSort(A, q + 1, r);
  }
}

const arr = [0, 2, 8, 7, 1, 3, 5, 6, 4, 2, 9, 5, 2];

quickSort(arr, 0, arr.length - 1);

console.log(arr);
