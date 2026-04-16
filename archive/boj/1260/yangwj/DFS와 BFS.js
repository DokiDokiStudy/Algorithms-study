const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

//정점, 간선, 시작정점
const [N, M, V] = input[0].split(" ").map(Number);
//간선 종류
const lines = input.slice(1).map((line) => line.split(" ").map(Number));
//1부터 시작하니 정점+1해서 만들어줌 배열
const graph = Array.from({ length: N + 1 }, () => []);

//양방향이기때문에 각 정점에서 갈수 있는 정점 수집
for (const [a, b] of lines) {
  graph[a].push(b);
  graph[b].push(a);
}

//작은거부터 우선
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
}

const dfs = (start) => {
  const visited = Array.from({ length: N + 1 }, () => false);
  const result = [];

  const search = (current) => {
    // 지금 정점을 방문 처리
    visited[current] = true;
    result.push(current);

    for (const next of graph[current]) {
      // 이미 방문한 정점은 다시 가지 않음
      if (visited[next]) continue;
      //안 간 정점이면 그쪽으로 재귀
      search(next);
    }
  };

  search(start);
  return result;
};

const bfs = (start) => {
  const visited = Array.from({ length: N + 1 }, () => false);
  // 시작 정점을 먼저 방문 처리하고 큐에 넣음
  const result = [];
  const queue = [start];
  let queueIndex = 0;
  visited[start] = true;

  while (queueIndex < queue.length) {
    const current = queue[queueIndex];
    queueIndex += 1;
    //큐에서 하나 꺼내 방문 순서에 기록
    result.push(current);

    for (const next of graph[current]) {
      //이미 본 정점이면 스킵
      if (visited[next]) continue;
      visited[next] = true;
      queue.push(next);
    }
  }

  return result;
};

const dfsResult = dfs(V);
const bfsResult = bfs(V);

console.log(dfsResult.join(" "));
console.log(bfsResult.join(" "));
