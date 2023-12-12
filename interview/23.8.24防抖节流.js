// 防抖 debounce
// 节流 throttle
// 立即执行版本、非立即执行版本
function debounce(fn, delay = 200, leading) {
  let timeout;
  return function () {
    timeout
      ? clearTimeout(timeout)
      : leading
      ? fn.call(this, ...arguments)
      : null;
    timeout = setTimeout(fn.bind(this), delay, ...arguments);
  };
}

const handlerChange = debounce(
  function () {
    console.log("更新触发了");
  },
  1000,
  true,
);

// 绑定监听
document.querySelector("input").addEventListener("input", handlerChange);

function throttle(fn, threshold = 200, leading) {
  let timeout;
  let start = new Date();
  return function () {
    const current = new Date();
    timeout
      ? clearTimeout(timeout)
      : leading
      ? fn.call(this, ...arguments)
      : null;
    if (current - start >= threshold) {
      fn.call(this, ...arguments);
      start = current;
    } else {
      timeout = setTimeout(fn.bind(this), threshold, ...arguments);
    }
  };
}

let handleMouseMove = throttle(
  function (e) {
    console.log(e.pageX, e.pageY);
  },
  2000,
  true,
);

// 绑定监听
document.querySelector("body").addEventListener("mousemove", handleMouseMove);
