const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split("").map(Number));
const visited = Array.from({ length: row }, () => Array(column).fill(false));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const queue = [[0, 0, 1]];
let queueIndex = 0;
visited[0][0] = true;

while (queueIndex < queue.length) {
  const [x, y, dist] = queue[queueIndex];
  queueIndex++;

  //얘네 순서를 +1 해서 셈
  if (x === row - 1 && y === column - 1) {
    console.log(dist);
    break;
  }

  for (const [mx, my] of directions) {
    const nx = x + mx;
    const ny = y + my;

    if (nx < 0 || ny < 0 || nx >= row || ny >= column) continue;
    if (visited[nx][ny]) continue;
    if (map[nx][ny] === 0) continue;

    visited[nx][ny] = true;
    queue.push([nx, ny, dist + 1]);
  }
}
