const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const result = [];

for (let i = 1; i <= Number(input[0]); i++) {
  const str = input[i];
  const stack = [];
  let yes = true;

  for (let char of str) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0) {
        yes = false;
        break;
      }
      stack.pop();
    }
  }

  if (stack.length !== 0) {
    yes = false;
  }

  result.push(yes ? "YES" : "NO");
}

console.log(result.join("\n"));