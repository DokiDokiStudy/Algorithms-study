function solution(n, times) {
  // 최소 시간
  let left = 1;
  // 가장 느린 심사관이 혼자 n명 전부 처리하는 시간 -> 최대 시간
  let right = Math.max(...times) * n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // mid분 동안 모든 심사관이 처리할 수 있는 총 인원 수
    const count = times.reduce((sum, t) => sum + Math.floor(mid / t), 0);

    // mid분 동안 심사관들이 사람수 보다 더많이 처리 가능 -> mid를 줄여도 됨
    if (count >= n) {
      right = mid - 1;
      // 못하면 mid를 늘려야됨
    } else {
      left = mid + 1;
    }
  }

  // 루프 종료 시 left -> n명 처리 가능한 최소 시간
  return left;
}
