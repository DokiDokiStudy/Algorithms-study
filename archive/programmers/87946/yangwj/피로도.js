// 순열: arr에서 r개를 순서있게 뽑음
function permutations(arr, r) {
  const result = [];
  const visited = new Array(arr.length).fill(false);
  function dfs(current) {
    if (current.length === r) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      current.push(arr[i]);
      dfs(current);
      current.pop();
      visited[i] = false;
    }
  }
  dfs([]);
  return result;
}

function solution(k, dungeons) {
  // 던전 방문 순서의 모든 경우
  const dungeonsPermutations = permutations(dungeons, dungeons.length);

  const result = [];

  // 각 순서마다 몇 개 던전을 돌 수 있는지
  dungeonsPermutations.forEach((dp) => {
    // 피로도를 복사
    let health = k;
    let count = 0;

    for (let i = 0; i < dp.length; i++) {
      // 최소 필요 피로도 부족 → 중단
      if (dp[i][0] > health) break;
      // 현재 피로도 - 던전 요구 피로도
      health -= dp[i][1];
      // 성공했으면
      count++;
    }
    result.push(count);
  });

  return Math.max(...result);
}
