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
  const dungeonsPermutations = permutations(dungeons, dungeons.length);

  const result = [];

  dungeonsPermutations.forEach((dp) => {
    let health = k;
    let count = 0;
    for (let i = 0; i < dp.length; i++) {
      if (dp[i][0] > health) break;
      health -= dp[i][1];
      count++;
    }
    result.push(count);
  });

  return Math.max(...result);
}
