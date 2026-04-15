const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((s) => s.trim());

const [N, M] = input[0].split(" ").map(Number);

const n = new Set(input.slice(1, N + 1));

const result = input.slice(N + 1).filter((x) => n.has(x));

console.log(result.length);