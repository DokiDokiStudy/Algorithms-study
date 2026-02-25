function solution(plans) {
  var answer = [];
  const stack = [];

  const sorted = plans
    .map(([name, start, playtime]) => {
      return [
        name,
        +start.split(":")[0] * 60 + +start.split(":")[1],
        +playtime,
      ];
    })
    .sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < sorted.length; i++) {
    const [name, start, playTime] = sorted[i];
    const nextTime = i + 1 < sorted.length ? sorted[i + 1][1] : Infinity;

    if (start + playTime <= nextTime) {
      answer.push(name);

      let remain = nextTime - (start + playTime);
      while (stack.length > 0 && remain > 0) {
        const [firstName, firstPlayTime] = stack.pop();
        if (firstPlayTime <= remain) {
          remain -= firstPlayTime;
          answer.push(firstName);
        } else {
          stack.push([firstName, firstPlayTime - remain]);
          remain = 0;
        }
      }
    } else {
      stack.push([name, start + playTime - nextTime]);
    }
  }

  while (stack.length > 0) answer.push(stack.pop());

  return answer;
}
