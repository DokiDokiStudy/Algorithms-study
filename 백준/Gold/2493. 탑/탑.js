const fs = require("fs");
const [[N], input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

const answer = new Array(N).fill(0);
const stack = [];

for (let i = N - 1; i >= 0; i--) {
  if (!stack.length) {
    stack.push(i);
    continue;
  } else {
    while (stack.length) {
      if (input[stack.at(-1)] > input[i]) break;
      const sender = stack.pop();
      answer[sender] = i + 1;
    }
    stack.push(i);
  }
}
console.log(answer.join(" "));
