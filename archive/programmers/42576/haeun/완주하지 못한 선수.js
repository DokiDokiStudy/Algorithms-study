function solution(participant, completion) {
  const completedMap = {};

  for (const completedPlayer of completion) {
    completedMap[completedPlayer] = (completedMap[completedPlayer] || 0) + 1;
  }

  for (const p of participant) {
    if (!completedMap[p]) return p;
    completedMap[p]--;
  }
}
