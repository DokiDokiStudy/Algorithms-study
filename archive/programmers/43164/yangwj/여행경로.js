function solution(tickets) {
  // 알파벳 순 정렬
  tickets.sort();
  // 티켓 사용 여부
  const used = new Array(tickets.length).fill(false);
  // ICN에서 출발
  const path = ["ICN"];
  let finalPath = [];

  function dfs(current) {
    // 종료 조건: 티켓 다 씀 = 경로 완성
    if (path.length === tickets.length + 1) {
      finalPath = [...path];
      return true;
    }

    for (let i = 0; i < tickets.length; i++) {
      // 이미 쓴 티켓이면 스킵
      if (used[i]) continue;
      // 출발지가 현재 위치가 아니면 스킵
      if (tickets[i][0] !== current) continue;

      // i번째 티켓을 사용 처리
      used[i] = true;
      // 티켓의 도착지를 현재 경로에 추가
      path.push(tickets[i][1]);

      // 다음 공항으로 이동해서 계속 DFS
      if (dfs(tickets[i][1])) return true;

      // dfs가 false로 실패하면 원복
      used[i] = false;
      path.pop();
    }

    return false;
  }

  dfs("ICN");
  return finalPath;
}
