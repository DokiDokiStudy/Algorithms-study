function solution(n, times) {
  let left = 1;
  let right = Math.max(...times) * n; // 가능한 최대 시간

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const count = times.reduce((sum, t) => sum + Math.floor(mid / t), 0);

    if (count >= n) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
