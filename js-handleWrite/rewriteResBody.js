/**
 * 将 attachments.timestamp 值更新到 data.time
 * @type {string}
 */

const res = `
{
\t"traceId": "ffffcf3041b6ca68e6ead221ea055044",
\t"code": 0,
\t"attachments": {
\t\t"timestamp": "1698317722192"
\t},
\t"data": {
\t\t"time": 1698317722
\t},
\t"message": "ok"
}
`;

console.log(
  res.replace(
    /"timestamp": "([0-9]*)"([\n\t},":a-z{\s]*)"time": ([0-9]*)/,
    '"timestamp": "$1"$2"time": $1',
  ),
);
