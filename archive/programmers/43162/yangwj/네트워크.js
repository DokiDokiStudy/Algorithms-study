function solution(n, computers) {
  const visited = Array.from({ length: n }, () => false);
  console.log("visited", visited);
  let network = 0;

  function dfs(current) {
    // 현재 컴퓨터를 방문
    visited[current] = true;

    // 현재 컴퓨터와 연결되어 있는 다른 컴퓨터들을 확인
    for (let other = 0; other < n; other++) {
      // 다른 컴퓨터와 연결되어있고
      const isConnected = computers[current][other] === 1;
      // 방문 안했는지
      const isNotVisited = !visited[other];

      if (isConnected && isNotVisited) {
        dfs(other);
      }
    }
  }

  // 모든 컴퓨터를 하나씩 확인
  for (let i = 0; i < n; i++) {
    // 방문안한 컴퓨터는 새로운 네트워크
    if (!visited[i]) {
      dfs(i);
      //네트워크 + 1
      network++;
    }
  }

  return network;
}
