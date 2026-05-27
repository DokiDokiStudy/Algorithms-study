function solution(info, query) {
  const map = new Map();

  for (const str of info) {
    const parts = str.split(" ");
    const score = Number(parts[4]);
    const conditions = [
      [parts[0], "-"],
      [parts[1], "-"],
      [parts[2], "-"],
      [parts[3], "-"],
    ];

    for (const a of conditions[0]) {
      for (const b of conditions[1]) {
        for (const c of conditions[2]) {
          for (const d of conditions[3]) {
            const key = `${a}|${b}|${c}|${d}`;
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(score);
          }
        }
      }
    }
  }

  for (const scores of map.values()) {
    scores.sort((a, b) => a - b);
  }

  const result = [];
  for (const q of query) {
    const parts = q.replaceAll(" and ", " ").split(" ");
    const key = `${parts[0]}|${parts[1]}|${parts[2]}|${parts[3]}`;
    const targetScore = Number(parts[4]);

    const score = map.get(key);
    if (!score) {
      result.push(0);
      continue;
    }

    let left = 0;
    let right = score.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (targetScore > score[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    result.push(score.length - left);
  }

  return result;
}