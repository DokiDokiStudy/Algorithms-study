const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\n/);

let idx = 0;
const a = Number(input[idx++]);
const b = input[idx++].split(" ");

let min, max, cur;
for (let i = 0; i < a; i++) {
  cur = +b[i];
  if (i === 0) {
    min = cur;
    max = cur;
    continue;
  }
  if (min > cur) min = cur;
  if (max < cur) max = cur;
}

console.log(`${min} ${max}`);