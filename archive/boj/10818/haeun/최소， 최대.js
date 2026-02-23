const fs = require("fs");
const [_, input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

const sortedInput = input.sort((a, b) => a - b);
console.log(sortedInput[0], sortedInput.at(-1));
