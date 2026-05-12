function solution(tickets) {
  tickets.sort(); // 알파벳 순 정렬
  const used = new Array(tickets.length).fill(false); // 티켓 사용 여부
  const path = ["ICN"]; // ICN에서 출발
  let answer = [];

  function dfs(current) {
    // 종료 조건: 티켓 다 씀 = 경로 완성
    if (path.length === tickets.length + 1) {
      answer = [...path]; 
      return true;       
    }

    for (let i = 0; i < tickets.length; i++) {
      // 이미 쓴 티켓이면 스킵
      if (used[i]) continue;
      // 출발지가 현재 위치가 아니면 스킵
      if (tickets[i][0] !== current) continue;

      used[i] = true;
      path.push(tickets[i][1]); 
        
      if (dfs(tickets[i][1])) return true;

      used[i] = false;
      path.pop();
    }

    return false; 
  }

  dfs("ICN");
  return answer;
}