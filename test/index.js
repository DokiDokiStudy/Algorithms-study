const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [dot, line, index] = input.shift().split(" ").map(Number);

const dfsVisit = Array.from({ length: dot }).fill(false);
const bfsVisit = [...dfsVisit];
const graph = [];
input
  .map((i) => i.split(" ").map(Number))
  .forEach(([n1, n2]) => {
    if (graph[n1]) graph[n1].push(n2);
    else graph[n1] = [n2];
    if (graph[n2]) graph[n2].push(n1);
    else graph[n2] = [n1];
  });
for (let i = 1; i < dot; i++) {
  graph[i] = graph[i].sort((a, b) => a - b);
}

const dfsAns = [];
function dfs(idx) {
  dfsVisit[idx] = true;
  dfsAns.push(idx);
  graph[idx].forEach((i) => {
    if (!dfsVisit[i]) dfs(i);
  });
}

dfs(index);
console.log(dfsAns);

const bfsAns = [];
function bfs(idx) {
  const queue = [idx];
  bfsVisit[idx] = true;

  while (queue.length) {
    const newIdx = queue.shift();
    bfsAns.push(newIdx);

    graph[newIdx].forEach((i) => {
      if (!bfsVisit[i]) {
        bfsVisit[i] = true;
        queue.push(i);
      }
    });
  }
}

bfs(index);
console.log(bfsAns);
