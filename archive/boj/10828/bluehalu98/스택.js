const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\n/);

const stack = [];
const output = [];
for (let i = 1; i <= +input[0]; i++) {
  const [cmd, arg] = input[i].split(" ");
  if (cmd === "push") {
    stack.push(arg);
  }
  if (cmd === "pop") {
    if (stack.length === 0) {
      output.push(-1);
    } else {
      output.push(stack.pop());
    }
  }
  if (cmd === "size") {
    output.push(stack.length);
  }
  if (cmd === "empty") {
    if (stack.length === 0) {
      output.push(1);
    } else {
      output.push(0);
    }
  }
  if (cmd === "top") {
    if (stack.length === 0) {
      output.push(-1);
    } else {
      output.push(stack[stack.length - 1]);
    }
  }
}
console.log(output.join("\n"));