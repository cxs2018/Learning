var trim = function (string: any) {
    return string.replace(/^\s+|\s+$/g, "");
  },
  isArray = function (arg: any) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };

export default function (headers: any) {
  if (!headers) return {};

  var result: any = {};

  var headersArr = trim(headers).split("\n");

  for (var i = 0; i < headersArr.length; i++) {
    var row = headersArr[i];
    var index = row.indexOf(":"),
      key = trim(row.slice(0, index)).toLowerCase(),
      value = trim(row.slice(index + 1));

    if (typeof result[key] === "undefined") {
      result[key] = value;
    } else if (isArray(result[key])) {
      result[key].push(value);
    } else {
      result[key] = [result[key], value];
    }
  }

  return result;
}
