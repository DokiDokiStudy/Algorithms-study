function solution(info, query) {
  const map = new Map();

  for (const row of info) {
    const parts = row.split(" ");
    const score = Number(parts.pop());

    makeMap(parts, score, 0, []);
  }

  for (const scores of map.values()) {
    scores.sort((a, b) => a - b);
  }

  const answer = [];

  for (const q of query) {
    const parts = q.replaceAll(" and ", " ").split(" ");
    const score = Number(parts.pop());
    const key = parts.join("");

    const scores = map.get(key) || [];
    const index = binarySearch(scores, score);

    answer.push(scores.length - index);
  }

  return answer;

  function makeMap(parts, score, idx, key) {
    if (idx === 4) {
      const finalKey = key.join("");
      if (!map.has(finalKey)) map.set(finalKey, []);
      map.get(finalKey).push(score);
      return;
    }

    makeMap(parts, score, idx + 1, [...key, parts[idx]]);
    makeMap(parts, score, idx + 1, [...key, "-"]);
  }

  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let answer = arr.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] >= target) {
        answer = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return answer;
  }
}
