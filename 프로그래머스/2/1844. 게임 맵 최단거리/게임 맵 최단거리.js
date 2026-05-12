function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];

  const dist = Array.from({ length: n }, () => new Array(m).fill(-1));
  dist[0][0] = 1;
  const queue = [[0, 0]];
  let head = 0;

  while (head < queue.length) {
    const r = queue[head][0]; // 구조분해 대신 직접 접근
    const c = queue[head][1];
    head++;

    if (r === n - 1 && c === m - 1) return dist[r][c];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
      if (maps[nr][nc] === 0) continue;
      if (dist[nr][nc] !== -1) continue;

      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }

  return -1;
}