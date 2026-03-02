const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const h = input.splice(1).map(Number);
const stack = [];
let count = 0;

for (let i = 0; i < n; i++) {
  while (stack.length > 0 && stack[stack.length - 1] <= h[i]) {
    stack.pop();
  }

  count += stack.length;
  stack.push(h[i]);
}

console.log(count);
