function solution(priorities, location) {
    var answer = 0;
    let processIdx = 0;

  while (priorities.length) {
    const highestPriority = Math.max(...priorities);
    let progress = priorities.shift();
    location--;

    if (progress === highestPriority) {
      processIdx++;
      if (location < 0) {
        answer = processIdx;
        break;
      }
    } else {
      priorities.push(progress);
      if (location < 0) location = priorities.length - 1;
    }
  }

  return answer;
    
    return answer;
}