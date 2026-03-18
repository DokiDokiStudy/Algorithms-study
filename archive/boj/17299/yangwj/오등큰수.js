const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const numbers = input[1].split(" ").map(Number);

const stack = [];
const result = Array.from({ length: n }, () => -1);

// 특정 값의 등장 횟수
const countMap = new Map();
numbers.forEach((n) => countMap.set(n, (countMap.get(n) ?? 0) + 1));

// 각 원소의 등장 횟수를 미리 계산
const NGF_NUMBERS = numbers.map((n) => countMap.get(n));

for (let i = 0; i < n; i++) {
  // 스택 top의 등장 횟수 < 현재 원소의 등장 횟수 → top의 오등큰수 확정
  while (
    stack.length > 0 &&
    NGF_NUMBERS[stack[stack.length - 1]] < NGF_NUMBERS[i]
  ) {
    //stack의 top에 인덱스에 현재 원소를 넣어줌
    const index = stack.pop();
    result[index] = numbers[i];
  }

  // 현재 숫자의 인덱스를 스택에 넣고 다음으로 이동
  stack.push(i);
}

console.log(result.join(" "));
