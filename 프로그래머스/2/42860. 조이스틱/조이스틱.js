function solution(name) {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const len = name.length;

  // 1. 상하 이동
  let upDown = 0;
  for (let i = 0; i < len; i++) {
    const pos = alpha.indexOf(name[i]);
    upDown += Math.min(pos, 26 - pos);
  }

  // 2. A 연속 구간 수집
  const aGroups = [];
  let i = 0;
  while (i < len) {
    if (name[i] === 'A') {
      const start = i;
      while (i < len && name[i] === 'A') i++;
      aGroups.push({ start, end: i });
    } else {
      i++;
    }
  }

  // 3. 좌우 이동 최솟값
  let move = len - 1;
  for (const { start, end } of aGroups) {
    const right = start - 1;
    const left = len - end;

    if (right < 0) {
      // 첫 글자부터 A인 경우: 왼쪽으로만 가면 됨
      move = Math.min(move, left);
    } else {
      move = Math.min(move, right * 2 + left, left * 2 + right);
    }
  }

  return upDown + move;
}