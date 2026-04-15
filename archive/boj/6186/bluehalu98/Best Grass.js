const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input.shift().split(" ").map(Number);
const grassMap = input.map((line) => line.split(""));

const visited = Array.from({ length: row }, () => Array(column).fill(false));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function bfs(x, y) {
  const queue = [[x, y]];
  visited[x][y] = true;

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (
        nx >= 0 &&
        nx < row &&
        ny >= 0 &&
        ny < column &&
        !visited[nx][ny] &&
        grassMap[nx][ny] === "#"
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }
}

let count = 0;

for (let i = 0; i < row; i++) {
  for (let j = 0; j < column; j++) {
    if (grassMap[i][j] === "#" && !visited[i][j]) {
      bfs(i, j);
      count++;
    }
  }
}

console.log(count);
