const fs = require("fs");
const [_, ...inputs] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(""));

const output = [];

for (const input of inputs) {
  // 한 행씩 스택 시뮬레이션
  output.push(stackSimulate(input));
}

console.log(output.join("\n"));

function stackSimulate(input) {
  const stack = [];

  for (const str of input) {
    if (str === "(") {
      stack.push(str);
      continue;
    }

    if (!stack.length) return "NO";
    stack.pop();
  }

  return stack.length ? "NO" : "YES";
}
