// 限制插入和删除项的数据结构 栈 -> 后进先出 LIFO Last-In-First-Out 队列 FIFO First-In-First-Out
// 搜索 按严格相等搜索、按断言函数搜索
// indexOf、lastIndexOf、includes
// reduce、reduceRight 归并方法
// 两个参数，对每一项都会运行的归并函数，以及可选的以之为归并起点的初始值。归并函数参数：上一个归并值、当前项、当前项的索引、数组本身
// 这个函数返回的任何值都会作为下一次调用同一个函数的第一个参数、如果没有给这两个方法传入可选的第二个参数（作为归并起点值），则第一次迭代将从数组的第二项开始，因此
// 传给归并函数的第一个参数是数组的第一项，第二个参数是数组的第二项

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 10;
const sumWithInitial = array1.reduce((accumulator, currentValue) => {
  const res = accumulator + currentValue
  console.log(accumulator, " ", currentValue, " ", res)
  return res;
});

console.log(sumWithInitial);
// Expected output: 10

// 定型数组 typed array -> 提升向原生库传输数据的效率
const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4, 12);
console.log(buf2.byteLength); // 8 