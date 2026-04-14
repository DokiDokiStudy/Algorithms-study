const fs = require("fs");
const [nums, ...input] = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = nums.split(" ").map(Number);

const set = new Set();
let count = 0;

// 집합 만들기
for (let i = 0; i < N; i++) {
  set.add(input[i]);
}

// 검사하기
for (let j = N; j < input.length; j++) {
  if (set.has(input[j])) count++;
}
console.log(count);
