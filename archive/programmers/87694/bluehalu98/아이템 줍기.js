
function solution(rectangle, characterX, characterY, itemX, itemY) {
  const SIZE = 102;
  const map = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

  for (const [x1, y1, x2, y2] of rectangle) {
    const [lx, ly, rx, ry] = [x1 * 2, y1 * 2, x2 * 2, y2 * 2];

    for (let x = lx; x <= rx; x++) {
      for (let y = ly; y <= ry; y++) {
        if (x === lx || x === rx || y === ly || y === ry) {
          if (map[x][y] !== 2) map[x][y] = 1;
        } else {
          map[x][y] = 2;
        }
      }
    }
  }

  const queue = [[characterX * 2, characterY * 2, 0]];
  const visited = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  visited[characterX * 2][characterY * 2] = true;

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();

    if (x === itemX * 2 && y === itemY * 2) {
      return dist / 2;
    }

    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d];
      const ny = y + dy[d];

      if (
        nx < 0 ||
        nx >= SIZE ||
        ny < 0 ||
        ny >= SIZE ||
        visited[nx][ny] ||
        map[nx][ny] !== 1
      )
        continue;

      visited[nx][ny] = true;
      queue.push([nx, ny, dist + 1]);
    }
  }
}