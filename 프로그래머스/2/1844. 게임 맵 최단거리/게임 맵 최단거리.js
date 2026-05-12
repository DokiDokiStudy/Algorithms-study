function solution(maps) {
  const rowCount = maps.length;
  const colCount = maps[0].length;
  const rowDirs = [1, -1, 0, 0];
  const colDirs = [0, 0, 1, -1];

  const visited = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false)
  );
  visited[0][0] = true;

  // 최대 크기로 미리 할당
  const queue = new Array(rowCount * colCount);
  queue[0] = [0, 0, 1];
  let head = 0;
  let tail = 1;

  while (head < tail) {
    const currentRow = queue[head][0];
    const currentCol = queue[head][1];
    const dist = queue[head][2];
    head++;

    if (currentRow === rowCount - 1 && currentCol === colCount - 1) {
      return dist;
    }

    for (let i = 0; i < 4; i++) {
      const nextRow = currentRow + rowDirs[i];
      const nextCol = currentCol + colDirs[i];

      if (nextRow < 0 || nextRow >= rowCount) continue;
      if (nextCol < 0 || nextCol >= colCount) continue;
      if (maps[nextRow][nextCol] === 0) continue;
      if (visited[nextRow][nextCol]) continue;

      visited[nextRow][nextCol] = true;
      queue[tail++] = [nextRow, nextCol, dist + 1];
    }
  }

  return -1;
}