// RegExp
// let expression = /pattern/flags Perl 语法 字符类、限定符、分组、向前查找、反向引用
// g 全局模式，i 不区分大小写、m 多行模式、y 粘附模式 u Unicode模式，启用Unicode匹配、s dotAll模式
// 元字符
var text = "this has been a short summer";
// 搜索任何后跟“hort”的字符，并把第一个字符放在捕获组中
var pattern = /(.)hort/g

if (pattern.test(text)) {
  console.log(RegExp.input) // 包含原始字符串、最后搜索的字符串（非标准特性）
  console.log(RegExp["$_"])
  console.log(RegExp.$_)
  console.log(RegExp.leftContext)
  console.log(RegExp["$`"])
  console.log(RegExp.rightContext)
  console.log(RegExp["$'"])
  console.log(RegExp.lastMatch) // 匹配整个正则表达式的上一个字符串
  console.log(RegExp["$&"])
  console.log(RegExp.lastParen) // 捕获组的上一次匹配
  console.log(RegExp["$+"])
}

var text = "this has been a short summer";
var pattern = /(..)or(.)/g;
if (pattern.test(text)) {
 console.log(RegExp.$1); // sh
 console.log(RegExp.$2, ""); // t
} 
//  \A 和\Z 锚（分别匹配字符串的开始和末尾）
//  联合及交叉类
//  原子组
//  x（忽略空格）匹配模式
//  条件式匹配
//  正则表达式注释

// 原始值包装类型
// 内置对象，任何由ECMAScript实现提供、与宿主环境无关，并在ECMAScript程序开始执行时就存在的对象