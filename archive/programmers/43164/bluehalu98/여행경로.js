function solution(tickets) {
  tickets.sort();
  const graph = {};

  for (const [from, to] of tickets) {
    if (!graph[from]) graph[from] = [];
    graph[from].push(to);
  }

  const answer = [];

  function dfs(target) {
    while (graph[target]?.length) {
      dfs(graph[target].shift());
    }
    answer.unshift(target);
  }

  dfs("ICN");
  return answer;
}