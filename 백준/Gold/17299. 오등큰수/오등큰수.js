const fs = require("fs");
const [[N], input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

const output = new Array(N).fill(-1);

const map = {};
for (const number of input) {
  map[number] = (map[number] || 0) + 1;
}

const stack = [];

for (let i = 0; i < N; i++) {
  const number = input[i];
  while (stack.length && map[input[stack.at(-1)]] < map[number]) {
    output[stack.pop()] = number;
  }
  stack.push(i);
}

console.log(output.join(" "));
