function solution(participant, completion) {
const a = new Map();
  participant.forEach((p) => {
    a.set(p, (a.get(p) || 0) + 1);
  });
  completion.forEach((p) => {
    a.set(p, a.get(p) - 1);
  });

  for (const [key, value] of a) {
    if (value > 0) {
      return key;
    }
  }
}
