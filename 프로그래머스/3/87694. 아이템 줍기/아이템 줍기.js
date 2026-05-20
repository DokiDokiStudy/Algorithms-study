function solution(rectangle, characterX, characterY, itemX, itemY) {
  const maxMapSize = 102;

  const board = Array.from({ length: maxMapSize }, () =>
    Array(maxMapSize).fill(0),
  );

  // 모든 사각형 영역을 1
  for (const [x1, y1, x2, y2] of rectangle) {
    const startX = x1 * 2;
    const startY = y1 * 2;
    const endX = x2 * 2;
    const endY = y2 * 2;

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        board[y][x] = 1;
      }
    }
  }

  // 사각형의 내부를 0
  for (const [x1, y1, x2, y2] of rectangle) {
    const startX = x1 * 2;
    const startY = y1 * 2;
    const endX = x2 * 2;
    const endY = y2 * 2;

    for (let x = startX + 1; x < endX; x++) {
      for (let y = startY + 1; y < endY; y++) {
        board[y][x] = 0;
      }
    }
  }

  const startX = characterX * 2;
  const startY = characterY * 2;
  const targetX = itemX * 2;
  const targetY = itemY * 2;

  const visited = Array.from({ length: maxMapSize }, () =>
    Array(maxMapSize).fill(false),
  );

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const queue = [[startY, startX, 0]];
  let queueIndex = 0;

  visited[startY][startX] = true;

  while (queueIndex < queue.length) {
    const [y, x, dist] = queue[queueIndex];
    queueIndex++;

    // 도착지 도착하면 끝 2배 했으니 나누기 2
    if (y === targetY && x === targetX) {
      return dist / 2;
    }

    for (const [dy, dx] of directions) {
      const nextY = y + dy;
      const nextX = x + dx;

      if (nextY < 0 || nextY >= maxMapSize) continue;
      if (nextX < 0 || nextX >= maxMapSize) continue;
      if (visited[nextY][nextX]) continue;
      if (board[nextY][nextX] !== 1) continue;

      visited[nextY][nextX] = true;
      queue.push([nextY, nextX, dist + 1]);
    }
  }

  return 0;
}