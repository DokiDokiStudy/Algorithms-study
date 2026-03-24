const fs = require("fs");
const [[N, M], input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

let max = 0;
backtracking(0, 0, 0);

console.log(max);

function backtracking(start, sum, count) {
  if (sum > M) return;

  if (count === 3) {
    max = Math.max(max, sum);
    return;
  }

  for (let i = start; i < N; i++) {
    backtracking(i + 1, sum + input[i], count + 1);
  }
}
