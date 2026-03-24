const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);

let biggestAdd = 9 * input[0].length;
let answer = 0;
for (let i = Math.max(1, N - biggestAdd); i < N; i++) {
  const sum = String(i)
    .split("")
    .reduce((a, c) => a + Number(c), 0);
  if (i + sum === N) {
    answer = i;
    break;
  }
}

console.log(answer);
