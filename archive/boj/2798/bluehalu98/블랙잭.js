const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

let answer = 0;
for (let i = 0; i < N - 2; i++) {
  for (let j = i + 1; j < N; j++) {
    for (let k = j + 1; k < N; k++) {
      const temp = arr[i] + arr[j] + arr[k];
      if (temp > M || answer > temp) {
        continue;
      } else {
        answer = temp;
      }
    }
  }
}

console.log(answer);