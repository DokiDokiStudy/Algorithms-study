function solution(n, computers) {
    const edges = Array.from({length: n}, () => []);
    const visited = new Array(n).fill(0);
    let networkCount = 0;
    
    // 간선 정보 만들기
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            if(i === j || computers[i][j] === 0) continue;
            edges[i].push(j);
            edges[j].push(i);
        }
    }
    
    //for문 => dfs (덩어리 개수 찾기)
    for(let i = 0; i < n; i++){
            if(visited[i] === 1) continue;
            visited[i] = 1;
            networkCount++;
            dfs(i);
    }
    
    // dfs 함수
    function dfs (node) {
        for(const next of edges[node]) {
            if(visited[next] === 0){
                visited[next] = 1;
                dfs(next);
            }
        } 
    }
    
    return networkCount;
}