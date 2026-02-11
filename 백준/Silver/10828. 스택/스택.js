const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const stack = [];
const result = []; 
const n = Number(input[0]);

for (let i = 1; i <= n; i++) {
  const command = input[i].split(" ");
  
  if (command[0] === "push") {
    stack.push(Number(command[1]));
  } 
  else if (command[0] === "pop") {
    result.push(stack.length === 0 ? -1 : stack.pop());
  } 
  else if (command[0] === "size") {
    result.push(stack.length);
  } 
  else if (command[0] === "empty") {
    result.push(stack.length === 0 ? 1 : 0);
  } 
  else if (command[0] === "top") {
    result.push(stack.length === 0 ? -1 : stack[stack.length - 1]);
  }
}

console.log(result.join("\n")); 