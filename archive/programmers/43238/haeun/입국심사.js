function solution(n, times) {
    // x 시간 안에 몇 명이 심사를 마칠 수 있을까?
    times.sort((a, b) => a - b);
    const lastTime = times.at(-1);
    
    
    let left = 0;
    let right = lastTime / times.length * n;
    
    while(left <= right) {
        const mid = Math.floor((left + right) / 2); // 타겟이 되는 시간
        
        let count = 0;
        for(const time of times) {
            count += Math.floor(mid / time);
            if(count > n) break;
        }
        
        if(count >= n) right = mid - 1;
        else left = mid + 1;
    }
    
    return left;
}