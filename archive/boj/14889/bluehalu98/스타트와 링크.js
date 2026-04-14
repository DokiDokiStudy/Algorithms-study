const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "./test/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const count = Number(input.shift());
const target = input.map((item) => item.split(" ").map(Number));
let answer = Infinity;

const indexArray = Array.from({ length: count }).map((_, i) => i);

function combination(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const a = array[i];
      const b = array[j];
      result += target[a][b] + target[b][a];
    }
  }
  return result;
}

function recursive(index = 0, target = []) {
  if (answer === 0) return;

  if (target.length === count / 2) {
    const rest = indexArray.filter((item) => !target.includes(item));
    const link = combination(target);
    const start = combination(rest);
    if (link === start) {
      answer = 0;
    } else {
      answer = Math.min(answer, Math.abs(link - start));
    }
    return;
  }

  for (let i = index; i < count; i++) {
    recursive(i + 1, [...target, i]);
  }
}

recursive();
console.log(answer);
