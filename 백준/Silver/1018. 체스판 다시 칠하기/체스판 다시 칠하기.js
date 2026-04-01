const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input[0].split(" ");
const chart = input.slice(1).map((line) => line.split(""));

const result = [];

for (let c = 0; c <= column - 8; c++) {
  for (let r = 0; r <= row - 8; r++) {
    let count = 0;
    //체스판 순회
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (
          ((i + j) % 2 === 0 && chart[r + i][c + j] !== "B") ||
          ((i + j) % 2 === 1 && chart[r + i][c + j] !== "W")
        ) {
          count++;
        }
      }
    }

    result.push(count);
    result.push(64 - count);
  }
}

console.log(Math.min(...result));
