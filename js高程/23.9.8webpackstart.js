// Symbol.toStringTag
const obj = new Object();

for (const key in obj) {
  console.log(key, obj[key]);
  if (Object.hasOwnProperty.call(obj, key)) {
    const element = obj[key];
    console.log(key, element);
  }
}

let myObj = {};

Object.defineProperty(myObj, Symbol.toStringTag, { value: "MyObjType" });

console.log(Object.prototype.toString.call(myObj));
