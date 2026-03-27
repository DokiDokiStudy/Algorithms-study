const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const number = Number(input[0]);
let result = 0;

for (i = 1; i <= number; i++) {
  const test = i
    .toString()
    .split("")
    .map(Number)
    .reduce((acc, cur) => acc + cur, 0);

  if (test + i === number) {
    result = i;
    break;
  }
}

console.log(result);