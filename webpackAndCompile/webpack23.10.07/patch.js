const shelljs = require("shelljs");

// 删除dist目录，兼容windows、mac环境
shelljs.rm("-rf", "dist");
