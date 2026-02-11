const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\n/);

let idx = 0;
let max = +input[0];

for (let i = 1; i < 9; i++) {
  if (max < +input[i]) {
    max = +input[i];
    idx = i;
  }
}

console.log(`${max}\n${idx + 1}`);