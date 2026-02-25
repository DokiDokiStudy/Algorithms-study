const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\n/);

const [N, T, W] = data[0].split(" ").map(Number);
const firstArr = [];
const M = +data[N + 1];
let nextArr = [];

const result = [];

for (let i = 1; i <= N; i++) {
  firstArr.push(data[i].split(" ").map(Number));
}
const queue = [...firstArr];

for (let i = N + 2; i < N + 2 + M; i++) {
  nextArr.push(data[i].split(" ").map(Number));
}
nextArr.sort((a, b) => a[2] - b[2]);

let queueH = 0;
let nextArrH = 0;
let cnt = T;
for (let t = 0; t < W; t++) {
  if (queue?.[queueH]?.[1] === 0) {
    queueH++;
    cnt = T;
  }

  if (!queue.length) break;

  if (nextArr.length && nextArr[nextArrH] && nextArr[nextArrH][2] === t) {
    const [id, t] = nextArr[nextArrH];
    nextArrH++;
    queue.push([id, t]);
  }

  if (cnt > 0) {
    cnt--;
    queue[queueH][1]--;
    result.push(queue[queueH][0]);
  } else {
    cnt = T - 1;
    const [id, t] = queue[queueH];
    queueH++;
    queue.push([id, t]);
    queue[queueH][1]--;
    result.push(queue[queueH][0]);
  }
}

console.log(result.join("\n"));
