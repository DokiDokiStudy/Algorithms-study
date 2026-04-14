const fs = require("fs");
const [cnt, raw] = fs.readFileSync(0, "utf8").trim().split(/\n/);
const arr = raw.split(" ").map(Number);
const cntArr = arr.reduce(
  (acc, cur) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
    return acc;
  },
  Array.from({ length: +cnt }, () => 0)
);

const stack = [];
const result = Array.from({ length: +cnt }, () => -1);

for (let i = +cnt - 1; i >= 0; i--) {
  const curCnt = cntArr[arr[i]];

  while (stack.length && cntArr[stack[stack.length - 1]] <= curCnt) {
    stack.pop();
  }

  if (stack.length) {
    result[i] = stack[stack.length - 1];
  }

  stack.push(arr[i]);
}

console.log(result.join(" "));
