const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = input[0];
const chart = input.slice(1).map((line) => line.split(" ").map(Number));

const result = [];

// 조합 함수: arr에서 arrCount개를 뽑는 모든 경우
const combi = (arr, arrCount) => {
  const result = [];

  const dfs = (start, currentArr) => {
    if (currentArr.length === arrCount) {
      result.push([...currentArr]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      currentArr.push(arr[i]);
      dfs(i + 1, currentArr);
      currentArr.pop();
    }
  };
  dfs(0, []);
  return result;
};

// 참여한 사람
const all = Array.from({ length: N }, (_, i) => i);
// 참여한 사람의 조합 (스타트 팀)
const combination = combi(all, N / 2);

combination.forEach((startTeam) => {
  // 전체 중 스타트팀 아닌애들 (링크 팀)
  const linkTeam = all.filter((x) => !startTeam.includes(x));

  let startScore = 0;
  let linkScore = 0;

  //스타트팀 능력치
  for (let i = 0; i < startTeam.length; i++) {
    for (let j = i + 1; j < startTeam.length; j++) {
      startScore += chart[startTeam[i]][startTeam[j]];
      startScore += chart[startTeam[j]][startTeam[i]];
    }
  }

  //링크팀 능력치
  for (let i = 0; i < linkTeam.length; i++) {
    for (let j = i + 1; j < linkTeam.length; j++) {
      linkScore += chart[linkTeam[i]][linkTeam[j]];
      linkScore += chart[linkTeam[j]][linkTeam[i]];
    }
  }

  //두팀의 차 절대값
  result.push(Math.abs(startScore - linkScore));
});

console.log(Math.min(...result));
