function solution(priorities, location) {
    let count = 0
    const queue = priorities.map((p, i) => [p, i]);
    
     while (queue.length > 0) {
        const current = queue.shift();
        
        if (queue.some((item) => item[0] > current[0])) {
            queue.push(current);
        } else {
            count += 1;
            if (current[1] === location) return count;
        }
    }
}