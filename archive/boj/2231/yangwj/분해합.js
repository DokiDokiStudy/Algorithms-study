const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const number = Number(input[0]);
let result = 0;

// 1부터 확인
for (i = 1; i <= number; i++) {
  // i의 각 자릿수의 합을 구한다 (245 → 2+4+5 = 11)
  const test = i
    .toString()
    .split("")
    .map(Number)
    .reduce((acc, cur) => acc + cur, 0);

  // 각 자릿수 합 + 현재 i숫자가 같은거 처음 찾으면 return
  if (test + i === number) {
    result = i;
    break;
  }
}

console.log(result);
