const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

//총 빌딩 높이 배열
const buildings = input.splice(1).map(Number);
const stack = [];
let count = 0;

//빌딩이 왼쪽에 나를 볼수 있는게 몇개 있는지 확인
for (const building of buildings) {
  //stack의 길이가 0보다 크고, 현재 빌딩의 높이가 stack top의 빌딩 높이보다 낮을때까지 반복
  //결국 현재 building이 stack top보다 낮아야됨
  while (stack.length > 0 && stack[stack.length - 1] <= building) {
    stack.pop();
  }
  //남은 stack의 빌딩은 현재 building보다 큼
  count += stack.length;
  stack.push(building);
}

console.log(count);
