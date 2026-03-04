const fs = require("fs");
const [N, ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let count = 0;
const stack = [];

for (let i = 0; i < N; i++) {
  const height = input[i];

  while (stack.length && input[stack.at(-1)] <= height) {
    count += i - 1 - stack.pop();
  }
  stack.push(i);
}

for (const idx of stack) {
  count += N - 1 - idx;
}

console.log(count);
