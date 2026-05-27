function solution(n, times) {
let answer = 0;

  const sort = [...times].sort((a, b) => a - b);
  let left = sort[0];
  let right = sort[sort.length - 1] * n;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    checked = 0;
    for (const time of times) {
      checked += Math.floor(mid / time);
      if (checked >= n) break;
    }

    if (checked >= n) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}