function loader(source) {
  console.log("async-loader1");
  // let callback = this.async();
  // console.log(new Date());
  // setTimeout(() => {
  //   callback(null, source + "//async1");
  // }, 2000);
  return source + "//async1";
}

loader.pitch = function loaderpitch1() {
  console.log("async-pitch1");
  // let callback = this.async();
  // setTimeout(() => {
  //   callback(null);
  // }, 2000);
};

module.exports = loader;
