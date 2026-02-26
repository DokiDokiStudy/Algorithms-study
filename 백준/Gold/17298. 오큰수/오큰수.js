// 4
// 3 5 2 7

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const numbers = input[1].split(" ").map(Number);

//얘한탠 결국 내림차순으로 갈수 밖에 없음 -> while문으로
const stack = [];
//없으면 -1이어서 처음에 다 채워줌
const result = new Array(n).fill(-1);

for (let i = 0; i < n; i++) {
  //stack에 뭐가 있고 스택에 마지막거 값이 현재 값보다 크면
  while (stack.length > 0 && numbers[stack[stack.length - 1]] < numbers[i]) {
    //stack의 맨마지막에 있는 인덱스에 현재 숫자를 넣어줌
    const index = stack.pop();
    result[index] = numbers[i];
  }

  // 현재 숫자의 인덱스를 스택에 넣고 다음으로 이동
  stack.push(i);
}

console.log(result.join(" "));