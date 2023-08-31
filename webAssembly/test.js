// 可以用
const fs = require('fs');
let src = new Uint8Array(fs.readFileSync('./test.wasm'));
const env = {
  memoryBase: 0,
  tableBase: 0,
  memory: new WebAssembly.Memory({
    initial: 256
  }),
  table: new WebAssembly.Table({
    initial: 2,
    element: 'anyfunc'
  }),
  abort: () => { throw 'abort'; }
}
WebAssembly.instantiate(src, { env: env })
  .then(result => {
    console.log(result.instance.exports.add(11120, 89));
  })
  .catch(e => console.log(e));

// 可以用
// getExportFunction = async (url) => {
//   const env = {
//     memoryBase: 0,
//     tableBase: 0,
//     memory: new WebAssembly.Memory({
//       initial: 256
//     }),
//     table: new WebAssembly.Table({
//       initial: 2,
//       element: 'anyfunc'
//     })
//   };
//   const instance = await fetch(url).then((response) => {
//     return response.arrayBuffer();
//   }).then((bytes) => {
//     return WebAssembly.instantiate(bytes, { env: env })
//   }).then((instance) => {
//     return instance.instance.exports;
//   });
//   return instance;
// };

// const fibonacciUrl = './test.wasm';
// getExportFunction(fibonacciUrl).then((res) => {
//   console.log(res.add(3, 289))
// }).catch(err => {
//   console.log(err)
// });

// 行不通
import wasmC from './test.c';

wasmC({
  'global': {},
  'env': {
    'memoryBase': 0,
    'tableBase': 0,
    'memory': new WebAssembly.Memory({ initial: 256 }),
    'table': new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
  }
}).then(result => {
  const exports = result.instance.exports;
  const add = exports.add;
  console.log('C return value was', add(2, 5643));
});