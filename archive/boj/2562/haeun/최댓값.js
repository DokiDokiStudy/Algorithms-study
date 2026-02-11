const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n").map(Number);

let max = 0;
let maxSequence = -1;

for (let i = 0; i < input.length; i++) {
  if (input[i] > max) {
    max = input[i];
    maxSequence = i + 1;
  }
}
console.log(`${max}\n${maxSequence}`);