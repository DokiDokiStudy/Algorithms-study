const fs = require("fs");
const [[N, _, V], ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

const dfsVisited = new Array(N + 1).fill(0);
const bfsVisited = new Array(N + 1).fill(0);

const edges = Array.from({ length: N + 1 }, () => []);

const dfsSequence = [V];

const dfs = (node, sequence) => {
  for (const nextNode of edges[node]) {
    if (dfsVisited[nextNode]) continue;
    dfsVisited[nextNode] = 1;
    dfsSequence.push(nextNode);
    sequence.push(nextNode);
    dfs(nextNode, sequence);
  }
};

const bfs = (startNode) => {
  const queue = [startNode];
  let head = 0;

  bfsVisited[startNode] = 1;

  while (queue.length > head) {
    const node = queue[head++];
    for (const nextNode of edges[node]) {
      if (bfsVisited[nextNode]) continue;
      bfsVisited[nextNode] = 1;
      queue.push(nextNode);
    }
  }

  return queue.join(" ");
};

for (const [from, to] of input) {
  edges[from].push(to);
  edges[to].push(from);
}

edges.forEach((edge) => edge.sort((a, b) => a - b));

dfsVisited[V] = 1;
dfs(V, [V]);
console.log(`${dfsSequence.join(" ")}\n${bfs(V)}`);
