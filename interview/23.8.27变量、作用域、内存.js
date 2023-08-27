// 高程第四章
/**
 * 原始值是按值访问的，引用值是按引用访问的。函数参数是按值传递的
 */
function setName(obj) {
  obj.name = "cxs";
  obj = new Object();
  obj.name = "lxm";
  console.log(obj === person);
}

let person = new Object();
let person2 = person;
setName(person);
person2 = 3;
console.log(person2, person);
