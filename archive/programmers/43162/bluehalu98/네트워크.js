function solution(n, computers) {
  const visited = new Array(n).fill(false);
  let count = 0;

  function dfs(idx) {
    visited[idx] = true;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[idx][i] === 1) {
        dfs(i);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      count++;
    }
  }

  return count;
}
