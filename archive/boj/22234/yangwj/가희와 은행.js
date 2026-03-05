// 1 5 7
// 1 6
// 1
// 3 1 5

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// (N = 문열때 기다리는 사람 수, T = 상담원 상담 시간 , W = 몇초동안 기록해야되나)
const [N, T, W] = input[0].split(" ").map(Number);

// 가게 안 대기 줄
let queue = [];
for (let i = 1; i <= N; i++) {
  const [Px, tx] = input[i].split(" ").map(Number);
  //id: 사람 id, time: 상담에 걸리는 시간
  queue.push({ id: Px, time: tx });
}

//나중에 올 손님 수
const M = parseInt(input[N + 1]);

//나중에 올 손님들 (N + 2 번째 줄부터 끝까지)
let futurePeople = [];
for (let i = N + 2; i < N + 2 + M; i++) {
  const [Px, tx, cx] = input[i].split(" ").map(Number);
  //id: 사람 id, time: 상담에 걸리는 시간, cs: 지각한 시간
  futurePeople.push({ id: Px, time: tx, cx: cx });
}
// 나중에 을 손님 도착 시간순 정렬
futurePeople.sort((a, b) => a.cx - b.cx);

let now = 0;
let queuePointer = 0; // 큐 포인터
let futureIdx = 0; // 밖 대기줄 포인터
let timer = 0; // 손님 상담시간 타이머 -> 상단원 상담 할당시간이랑 비교 위함
const results = [];

// 관찰시간 끝날 때까지 1초씩 증가
while (now < W) {
  // 상담 중 사람
  let current = queue[queuePointer];
  // 지금 상담 중인 사람의 id push
  results.push(current.id);

  now++; //시간 up
  timer++; // 손님 상담시간 up
  current.time--; // 손님 업무시간 down

  //밖에 손님 거나 , 현재 시간이랑 밖에 손님 지각한시간이 똑같을 경우 큐에 푸쉬
  while (futureIdx < M && futurePeople[futureIdx].cx === now) {
    queue.push({
      id: futurePeople[futureIdx].id,
      time: futurePeople[futureIdx].time,
    });
    futureIdx++;
  }

  // 상담이 끝났거나 상담원 할당 시간이 끝났을 경우
  if (current.time === 0 || timer === T) {
    // 상담 시간 남았으면 뒤로 다시 줄서기
    if (current.time > 0) {
      queue.push(current);
    }

    // 큐 포인터 이동 및 타이버 리셋
    queuePointer++;
    timer = 0;
  }
}

console.log(results.join("\n"));
