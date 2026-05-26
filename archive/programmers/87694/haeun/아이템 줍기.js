function solution(rectangle, characterX, characterY, itemX, itemY) {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  const borders = Array.from({ length: 102 }, () => Array(102).fill(0));

  // 좌표 내부의 점/면 모두 칠하기
  for (const [lx, ly, rx, ry] of rectangle) {
    for (let x = lx * 2; x <= rx * 2; x++) {
      for (let y = ly * 2; y <= ry * 2; y++) {
        borders[x][y] = 1;
      }
    }
  }

  // 테두리 빼고 전부 지우기
  for (const [lx, ly, rx, ry] of rectangle) {
    for (let x = lx * 2 + 1; x < rx * 2; x++) {
      for (let y = ly * 2 + 1; y < ry * 2; y++) {
        borders[x][y] = 0;
      }
    }
  }
  return bfs(characterX * 2, characterY * 2);

  function bfs(startX, startY) {
    const queue = [[startX, startY, 0]];
    const visited = Array.from({ length: 102 }, () => Array(102).fill(0));
    let head = 0;

    visited[startX][startY] = 1;

    while (head < queue.length) {
      const [x, y, count] = queue[head++];
      if (x === itemX * 2 && y === itemY * 2) {
        return count / 2;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= 102 || ny >= 102) continue;
        if (visited[nx][ny]) continue;
        if (!borders[nx][ny]) continue;

        visited[nx][ny] = 1;
        queue.push([nx, ny, count + 1]);
      }
    }
  }
}
