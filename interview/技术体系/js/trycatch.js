/**
 * try catch 捕获不到Promise的错误
 * @returns {Promise<unknown>}
 */
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 1000);
  });
}

async function a() {
  try {
    await fetchData();
    console.log("success");
  } catch (e) {
    console.log("error");
  }
}

a();
