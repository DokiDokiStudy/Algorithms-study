function solution(participant, completion) {
  const participantMap = new Map();
  const result = [];

  for (const c of participant) {
    participantMap.set(c, (participantMap.get(c) ?? 0) + 1);
  }

  for (const c of completion) {
    participantMap.set(c, (participantMap.get(c) ?? 0) - 1);
  }

  for (const [key, val] of participantMap) {
    if (val > 0) {
      result.push(key);
    }
  }
  return result.join("");
}