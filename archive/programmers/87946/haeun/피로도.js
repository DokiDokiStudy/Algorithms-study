function solution(k, dungeons) {
    let maxCount = 0; 
    backtracking(k, 0, new Array(dungeons.length).fill(0));
    return maxCount;
    
    function backtracking(energy, count, visited){
        maxCount = Math.max(maxCount, count);
        
        for(let i = 0; i < dungeons.length; i++) {
            
            if(visited[i] || dungeons[i][0] > energy) continue;
            visited[i] = 1;
            backtracking(energy - dungeons[i][1], count + 1, visited);
            visited[i] = 0;
            
        }
        
    }
}

