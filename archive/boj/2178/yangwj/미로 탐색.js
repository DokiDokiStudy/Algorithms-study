const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, column] = input[0].split(" ").map(Number);
// input에 들어오는 map
const map = input.slice(1).map((line) => line.split("").map(Number));
// 어디를 방문했는지 확인하려는 map의 복제본 -> false로 세팅
const visited = Array.from({ length: row }, () => Array(column).fill(false));

// 현재 자리에서 갈수 있는 상하좌우 방향
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

//처음은 0,0 에서 출발 1번 이동
const queue = [[0, 0, 1]];
let queueIndex = 0;
//처음인 0,0 은 이미 밟았음
visited[0][0] = true;

//먼저 들어온 걸 먼저 처리하면서, 새 후보를 뒤에 계속 추가히며 탐색
//발견한 루트 중 아직 가지 않은곳이 있으면 계속 함
while (queueIndex < queue.length) {
  const [x, y, dist] = queue[queueIndex];
  //큐 인덱스 이동
  queueIndex++;

  // 현재 좌표가 도착좌표와 동일해졌을때 출력 입력은 1,1 , 나의 코드는 0,0 이라 -1
  // 도착점에 처음 도달했을 때 그 값이 곧 최소 거리
  if (x === row - 1 && y === column - 1) {
    console.log(dist);
    break;
  }

  // 상하좌우 갈곳
  for (const [mx, my] of directions) {
    const nx = x + mx;
    const ny = y + my;

    //미로 밖 좌표면 안감
    if (nx < 0 || ny < 0 || nx >= row || ny >= column) continue;
    //이미 방문했으면 안감
    if (visited[nx][ny]) continue;
    //벽이면 안감
    if (map[nx][ny] === 0) continue;

    //가면 true로 바꿔주고 큐에 넣음
    visited[nx][ny] = true;
    queue.push([nx, ny, dist + 1]);
  }
}
