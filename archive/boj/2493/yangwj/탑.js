const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const towers = input[1].split(" ").map(Number);
const stack = [];
const result = [];

towers.forEach((tower, i) => {
  while (stack.length > 0) {
    if (towers[stack[stack.length - 1]] > tower) {
      result.push(stack[stack.length - 1] + 1);
      break;
    } else {
      stack.pop();
    }
  }
  if (stack.length === 0) result.push(0);
  stack.push(i);
});

console.log(result.join(" "));