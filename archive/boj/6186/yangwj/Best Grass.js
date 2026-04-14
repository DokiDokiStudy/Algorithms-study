const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(""));
const board = Array.from({ length: row }, () => Array(column).fill(false));
let count = 0;

for (let i = 0; i < row; i++) {
  for (let j = 0; j < column; j++) {
    if (map[i][j] === "#") {
      if (board[i][j] !== true) {
        count++;
      }
      board[i][j] = true;
      if (j + 1 < column) board[i][j + 1] = true;
      if (j - 1 >= 0) board[i][j - 1] = true;
      if (i - 1 >= 0) board[i - 1][j] = true;
      if (i + 1 < row) board[i + 1][j] = true;
    }
  }
}

console.log(count);