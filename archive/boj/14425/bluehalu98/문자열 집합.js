const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

let count = 0;
const S = new Set(input.slice(1, N + 1));

for (let i = N + 1; i < N + 1 + M; i++) {
  if (S.has(input[i])) {
    count++;
  }
}

console.log(count);