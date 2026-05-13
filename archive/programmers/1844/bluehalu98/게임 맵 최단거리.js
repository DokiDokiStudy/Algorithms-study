const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function solution(maps) {
 const row = maps.length;
  const column = maps[0].length;
  const visited = Array.from({ length: row }, () =>
    Array.from({ length: column }).fill(false),
  );

  visited[0][0] = 1;
  const queue = [[0, 0]];

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
        maps[nx][ny] === 1
      ) {
        visited[nx][ny] = visited[cx][cy] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return visited[row - 1][column - 1] || -1;
}