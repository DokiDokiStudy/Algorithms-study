const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input[0].split(" ").map(Number);
// input에 들어오는 map
const map = input.slice(1).map((line) => line.split(""));
// 어디를 방문했는지 확인하려는 map의 복제본 -> false로 세팅
const board = Array.from({ length: row }, () => Array(column).fill(false));
let count = 0;

// map을 한번씩 돔
for (let i = 0; i < row; i++) {
  for (let j = 0; j < column; j++) {
    // #을 만났는데
    if (map[i][j] === "#") {
      // 이전에 방문한적이 없으면 count+=1
      if (board[i][j] !== true) {
        count++;
      }
      // 이번에 방문한곳 추가
      board[i][j] = true;
      // 어차피 2곳 연결이 최대이니 인접한 구간도 다 방문했다고 침
      if (j + 1 < column) board[i][j + 1] = true;
      if (j - 1 >= 0) board[i][j - 1] = true;
      if (i - 1 >= 0) board[i - 1][j] = true;
      if (i + 1 < row) board[i + 1][j] = true;
    }
  }
}

console.log(count);
