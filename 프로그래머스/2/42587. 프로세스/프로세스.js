function solution(priorities, location) {
    const len = priorities.length;
    const answer = new Array(len).fill(0);
    
    const sortedPriorities = [...priorities].sort((a,b) => b - a);
    const queue = priorities.map((_, index) => index);
    
    for (let i = 0; i < len; i++) {
        const highestPriority = sortedPriorities[i];
        
        while(1) {
            const polledIndex = queue.shift();
            
            if(priorities[polledIndex] === highestPriority) {
                answer[polledIndex] = i + 1;
                break;
            }
            else {
                queue.push(polledIndex);
            }
        }
        if(answer[location]) return answer[location];
    }
}