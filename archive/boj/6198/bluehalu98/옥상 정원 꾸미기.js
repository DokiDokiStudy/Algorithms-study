const fs = require("fs");
const raw = fs.readFileSync(0, "utf8").trim().split(/\s+/);

const stack = [];
let result = 0;

for (let i = 0; i < +raw[0]; i++) {
  while (stack.length > 0 && stack.at(-1) <= +raw[i + 1]) {
    stack.pop();
  }
  if (stack.length) result += stack.length;
  stack.push([+raw[i + 1]]);
}

console.log(result);