function solution(maps) {
  const rowCount = maps.length;
  const colCount = maps[0].length;
  const rowDirs = [1, -1, 0, 0];
  const colDirs = [0, 0, 1, -1];

  const visited = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(false),
  );
  visited[0][0] = true;

  // 최대 크기로 미리 할당 -> 최대 방문 가능한 칸 수는 rowCount * colCount -> 이렇게 안하면 계속 유효성 하나 실패..?
  const queue = new Array(rowCount * colCount);
  queue[0] = [0, 0, 1];
  let head = 0;
  // 큐에 새로 넣을 위치
  let tail = 1;

  while (head < tail) {
    const currentRow = queue[head][0];
    const currentCol = queue[head][1];
    const dist = queue[head][2];
    head++;

    // 현재 위치가 도착점이면 현재 거리가 최단거리
    if (currentRow === rowCount - 1 && currentCol === colCount - 1) {
      return dist;
    }

    for (let i = 0; i < 4; i++) {
      const nextRow = currentRow + rowDirs[i];
      const nextCol = currentCol + colDirs[i];

      // 맵밖이면 건너띔
      if (nextRow < 0 || nextRow >= rowCount) continue;
      if (nextCol < 0 || nextCol >= colCount) continue;
      // 벽 건너띔
      if (maps[nextRow][nextCol] === 0) continue;
      // 방문 건너띔
      if (visited[nextRow][nextCol]) continue;

      visited[nextRow][nextCol] = true;
      //queue.push 대신  큐[tail] 에 다음값넣음
      queue[tail++] = [nextRow, nextCol, dist + 1];
    }
  }

  return -1;
}
