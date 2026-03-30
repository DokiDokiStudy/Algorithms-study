const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [_, M] = input[0].split(" ");
const numbers = input[1].split(" ").map(Number);
let result = 0;

//3개의 카드 조합을 다 돔
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    for (let k = j + 1; k < numbers.length; k++) {
      const sum = numbers[i] + numbers[j] + numbers[k];
      //대상 숫자가 3개의 카드 조합 합보다 작을때 result에 값 넣어줌
      if (result < sum && sum <= M) {
        result = sum;
      }
    }
  }
}

console.log(result);