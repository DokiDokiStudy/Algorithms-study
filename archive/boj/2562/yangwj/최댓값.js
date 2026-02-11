const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const numbers = input.map(Number);

const max = Math.max(...numbers);
const maxIndex = numbers.indexOf(max);

console.log(max);
console.log(maxIndex + 1);