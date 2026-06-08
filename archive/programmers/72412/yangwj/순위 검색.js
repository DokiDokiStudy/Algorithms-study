function solution(info, query) {
  const map = new Map();

  // 모든 조건 조합에 점수 map에 저장
  // "java|backend|junior|-" 모든 조건 -> 에 해당하는 점수를 모음
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
            // 키에 없으면 세팅
            if (!map.has(key)) map.set(key, []);
            // 해당 키에 점수 세팅
            map.get(key).push(score);
          }
        }
      }
    }
  }

  // 점수는 정렬
  for (const scores of map.values()) {
    scores.sort((a, b) => a - b);
  }

  const result = [];
  for (const q of query) {
    const parts = q.replaceAll(" and ", " ").split(" ");
    // 쿼리도 map의 키형태로 치환
    const key = `${parts[0]}|${parts[1]}|${parts[2]}|${parts[3]}`;
    // 쿼리의 점수
    const targetScore = Number(parts[4]);

    // map에서 해당 같은 키로 점수 가져옴
    const score = map.get(key);
    if (!score) {
      result.push(0);
      continue;
    }

    let left = 0;
    let right = score.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // mid 위치의 점수가 target보다 작음 → 더 오른쪽으로
      if (targetScore > score[mid]) {
        left = mid + 1;
        // mid 위치의 점수가 target 이상 → 더 왼쪽에도 있나 확인
      } else {
        right = mid - 1;
      }
    }

    // 전체 길이 - left = targetScore 이상인 사람 수
    result.push(score.length - left);
  }

  return result;
}
