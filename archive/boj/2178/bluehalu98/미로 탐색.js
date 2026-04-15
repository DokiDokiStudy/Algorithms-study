const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input.shift().split(" ").map(Number);
const maze = input.map((line) => line.split(""));
const visited = Array.from({ length: row }, () => Array(column).fill(0));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function bfs(x, y) {
  const queue = [[x, y]];
  visited[x][y] = 1;

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
        maze[nx][ny] === "1"
      ) {
        visited[nx][ny] = visited[cx][cy] + 1;
        queue.push([nx, ny]);
      }
    }
  }
}

bfs(0, 0);

console.log(visited[row - 1][column - 1]);
