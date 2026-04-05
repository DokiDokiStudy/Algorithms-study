const fs = require("fs");
const [[N], ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

let minDiff = Infinity;
backtracking(0, new Set());
console.log(minDiff);

function backtracking(start, team1) {
  if (team1.size === N / 2) {
    // 스타트 팀(1번팀) 결성 완료
    const team2 = Array.from({ length: N }, (_, i) => i).filter(
      (i) => !team1.has(i)
    );

    const sum1 = calculateSum(team1);
    const sum2 = calculateSum(team2);

    minDiff = Math.min(minDiff, Math.abs(sum1 - sum2));

    return;
  }

  for (let i = start; i < N; i++) {
    team1.add(i);
    backtracking(i + 1, team1);
    team1.delete(i);
  }
}

function calculateSum(team) {
  let sum = 0;
  for (const i of team) {
    for (const j of team) {
      sum += input[i][j];
    }
  }
  return sum;
}
