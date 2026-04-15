const fs = require("fs");
const [nums, ...input] = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = nums.split(" ").map(Number);

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
const visited = Array.from({ length: N }, () => new Array(M).fill(0));

const bfs = (startX, startY) => {
  const queue = [[startX, startY, 1]];
  let head = 0;
  visited[startX][startY] = 1;

  while (queue.length > head) {
    const [x, y, count] = queue[head++];

    if (x === N - 1 && y === M - 1) return count;

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (
        nx < 0 ||
        nx >= N ||
        ny < 0 ||
        ny >= M ||
        visited[nx][ny] ||
        input[nx][ny] === "0"
      )
        continue;
      visited[nx][ny] = 1;
      queue.push([nx, ny, count + 1]);
    }
  }
};

console.log(bfs(0, 0));
