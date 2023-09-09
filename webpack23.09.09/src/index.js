document.getElementById("btn").addEventListener("click", () => {
  import(/* webpackChunkName: "title"*/ "./title").then((result) => {
    console.log(result);
  });
});
