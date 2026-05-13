function solution(maps) {
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    const [n, m] = [maps.length, maps[0].length];
    const visited = Array.from({length: n}, () => new Array(m).fill(0));
    
    const queue = [[0, 0, 1]];
    let head = 0;
    visited[0][0] = 1;
    
    while(queue.length > head) {
        const [x, y, count] = queue[head++];
        
        if(x === n-1 && y === m-1)
            return count;
        
        for(let i = 0; i < 4; i++){
            const [nx, ny] = [x + dx[i], y + dy[i]];
            
            if(nx < 0 || nx >= n || ny < 0 || ny >= m || visited[nx][ny] || maps[nx][ny] === 0)
                continue;
            visited[nx][ny] = 1;
            queue.push([nx, ny, count + 1]);
        }
    }
    
    return -1;
}