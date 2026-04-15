const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input[0].split(" ");
const chart = input.slice(1).map((line) => line.split(""));

const result = [];

// 8x8 이니 그것보다 큰 만큰 row, column 반복
for (let c = 0; c <= column - 8; c++) {
  for (let r = 0; r <= row - 8; r++) {
    let count = 0;
    // 8x8 체스판 돔
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // 첫번째 자리 i=0,j=0 자리를 무조건 B로 가정 -> B자리인애들은 무조건 %2 가 0이 됨
        // 일치 하지 않은것들만 count
        if (
          ((i + j) % 2 === 0 && chart[r + i][c + j] !== "B") ||
          ((i + j) % 2 === 1 && chart[r + i][c + j] !== "W")
        ) {
          count++;
        }
      }
    }

    // 첫번재 B로 가정했을때 count
    result.push(count);
    // 첫번째 W인 경우 count
    result.push(64 - count);
  }
}

console.log(Math.min(...result));
