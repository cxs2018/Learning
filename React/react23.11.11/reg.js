let { pathToRegexp } = require("path-to-regexp");
let regxp = pathToRegexp("/home", [], { end: true });
console.log(regxp);
console.log(regxp.test("/home"));
console.log(regxp.test("/home/"));
console.log(regxp.test("/home#"));
console.log(regxp.test("/home/#"));
console.log(regxp.test("/home?"));
console.log(regxp.test("/home//"));
console.log(regxp.test("/home/user"));

console.log("-------------------------------0");
{
  let { pathToRegexp } = require("path-to-regexp");
  let regxp = pathToRegexp("/home", [], { end: false });
  console.log(regxp);
  console.log(regxp.test("/home"));
  console.log(regxp.test("/home/"));
  console.log(regxp.test("/home#"));
  console.log(regxp.test("/home/#"));
  console.log(regxp.test("/home?"));
  console.log(regxp.test("/home//"));
  console.log(regxp.test("/home/user"));
  console.log("/home//".match(regxp));
}
console.log("-------------------------------1");

// 消耗字符，捕获两个分组
console.log("1ab".match(/\d([a-z])([a-z])/));
// 消耗字符，不捕获第一个分组
console.log("1ab".match(/\d(?:[a-z])([a-z])/));

console.log("-------------------------------2");

// 会消耗掉字符，或者叫捕获
console.log("1a".match(/\d[a-z][a-z]/));
// 正向肯定前瞻，右边必须跟着什么，不捕获，前瞻指的是向前面(右边)看看
console.log("1a".match(/\d(?=[a-z])[a-z]/));
// 正向否定前瞻，右边不能跟着什么，不捕获
console.log("1a".match(/\d(?![A-Z])[a-z]/));
// 反向肯定后顾，左边必须跟着什么，不捕获
console.log("a1a".match(/(?<=[a-z])\d[a-z]/));
// 反向否定后顾，左边不能跟着什么，不捕获
console.log("a1a".match(/(?<![A-Z])\d[a-z]/));

{
  console.log("--------------------------------------------last");
  let { pathToRegexp } = require("path-to-regexp");
  let keys = [];
  let regexp = pathToRegexp("/user/:id/:name", keys, {
    end: true,
    sensitive: true,
    strict: false,
  });
  let result = "/user/100/zhufeng".match(regexp);
  console.log(result);
  let paramNames = keys.map((key) => key.name);
  console.log(paramNames);
  let values = result.slice(1);
  let params = paramNames.reduce((memo, key, index) => {
    memo[key] = values[index];
    return memo;
  }, {});
  console.log(params);
  //match.params {id:100,name:'zhufeng'};
}
