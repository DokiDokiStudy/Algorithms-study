const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, V] = input[0].split(" ").map(Number);
const lines = input.slice(1).map((line) => line.split(" ").map(Number));
const graph = Array.from({ length: N + 1 }, () => []);

for (const [a, b] of lines) {
  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
}

const dfs = (start) => {
  const visited = Array.from({ length: N + 1 }, () => false);
  const result = [];

  const search = (current) => {
    visited[current] = true;
    result.push(current);

    for (const next of graph[current]) {
      if (visited[next]) continue;
      search(next);
    }
  };

  search(start);
  return result;
};

const bfs = (start) => {
  const visited = Array.from({ length: N + 1 }, () => false);
  const result = [];
  const queue = [start];
  let queueIndex = 0;

  visited[start] = true;

  while (queueIndex < queue.length) {
    const current = queue[queueIndex];
    queueIndex += 1;
    result.push(current);

    for (const next of graph[current]) {
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
