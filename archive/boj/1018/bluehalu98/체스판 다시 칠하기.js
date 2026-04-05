const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [y, x] = input.shift().split(" ").map(Number);
const target = input.map((item) => item.split(""));
let answer = Infinity;

function count(xCord, yCord) {
  let count = 0;
  let reverseCount = 0;
  const start = target[yCord][xCord];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
        if (start !== target[yCord + i][xCord + j]) count++;
        else reverseCount++;
      } else {
        if (start === target[yCord + i][xCord + j]) count++;
        else reverseCount++;
      }
    }
  }
  answer = Math.min(answer, Math.min(count, reverseCount));
}

for (let i = 0; i <= y - 8; i++) {
  for (let j = 0; j <= x - 8; j++) {
    count(j, i);
  }
}
console.log(answer);
