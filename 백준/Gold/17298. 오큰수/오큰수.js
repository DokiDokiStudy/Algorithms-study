const fs = require("fs");
const [[N], arr] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number));

const stack = [];
const answer = new Array(N).fill(-1);

for (let i = 0; i < N; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    answer[stack.pop()] = arr[i];
  }
  stack.push(i);
}

console.log(answer.join(" "));