// hash、chunkHash、contentHash
let entry = {
  page1: "page1",
  page2: 'page2'
}

let page1 = "require title1"
let page2 = "require title2"

let title1 = "title1"
let title2 = "title2"

let crypto = require("crypto")

// contentHash，根据内容计算hash值，内容变化，hash值变化
let contentHash = crypto.createHash("md5").update(page1).digest("hex")

console.log("content hash: ", contentHash)

// chunkHash
let chunkHash = crypto.createHash("md5").update(page1).update(title1).digest("hex")

console.log("chunk hash: ", chunkHash)

// hash
let hash = crypto.createHash("md5").update(page1).update(title1).update(page2).update(title2).digest("hex")

console.log("hash: ", hash)