// 函数声明
function hello(x: number): void {}

// 函数表达式 函数类型
// 可选参数
type GetName = (x: string, y?: string) => string;

// 默认参数
let getName: GetName = function (x: string, y: string = "GET") {
  return "";
};

getName("");

// 剩余参数
function sum(...numbers: number[]) {
  return numbers.reduce((val, item) => val + item, 0);
}

sum();

// 函数重载
function attr(val: string): void;
function attr(val: number): void;
function attr(val: string | number): void {}

// attr();
