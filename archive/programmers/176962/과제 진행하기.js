function solution(plans) {
    var answer = [];
   
    
    plans.forEach((plan) => {
        plan[1] = changeHourToMinute(plan[1]);
        plan[2] = +plan[2];
    })
    plans.sort((a,b) => a[1]- b[1]);
    
    
    const stack = [];
  
    for (let i = 0; i < plans.length - 1; i++) {
        const [name, start, playtime] = plans[i];
        
        if (start + playtime <= plans[i + 1][1]) {
            answer.push(name);
        
            let availableTime = plans[i + 1][1] - start - playtime;
            
            while (stack.length) {
                const [currentSubject, currentTime] = stack.pop();
                if (currentTime <= availableTime) {
                    availableTime -= currentTime;
                    answer.push(currentSubject);
                } else {
                    stack.push([currentSubject, currentTime - availableTime]);
                    break;
                }
            }
        } else {
            stack.push([name, playtime - (plans[i + 1][1] - start)]);
        }
    }
    answer.push(plans[plans.length - 1][0]);
    
    while (stack.length) {
        answer.push(stack.pop()[0]);
    }
    
    return answer;

    
    function changeHourToMinute(prev) {
    const [hour, minute] = prev.split(":");
    return +hour * 60 + +minute;
}
}

