function solution(n, computers) {
  const visited = Array.from({ length: n }, () => false);
  let network = 0;

  function dfs(current) {
    visited[current] = true;

    for (let other = 0; other < n; other++) {
      const isConnected = computers[current][other] === 1;
      const isNotVisited = !visited[other];

      if (isConnected && isNotVisited) {
        dfs(other);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      network++;
    }
  }

  return network;
}