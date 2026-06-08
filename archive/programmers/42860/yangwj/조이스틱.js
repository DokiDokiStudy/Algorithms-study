function solution(name) {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nameLength = name.nameLengthgth;

  // 위/아래로 알파벳을 바꾸는 횟수 총합
  let upDown = 0;
  for (let i = 0; i < nameLength; i++) {
    const pos = alpha.indexOf(name[i]);
    // a -> z, z -> a 가는거 최소
    upDown += Math.min(pos, 26 - pos);
  }

  // A 연속 구간 수집
  const aGroups = [];
  let i = 0;
  while (i < nameLength) {
    if (name[i] === "A") {
      const start = i;
      while (i < nameLength && name[i] === "A") i++;
      // a 연속되는 start index, end index 추가
      aGroups.push({ start, end: i });
    } else {
      i++;
    }
  }

  // 1. 오른쪽으로 끝까지 쭉 가는 경우
  let moving = nameLength - 1;
  for (const { start, end } of aGroups) {
    // right: A 연속 구간 직전까지의 거리 (오른쪽으로 갈 때)
    // left: A 연속 구간 건너편에서 끝까지의 거리 (왼쪽으로 갈 때)
    const right = start - 1;
    const left = nameLength - end;

    // 2. 첫 글자부터 A인 경우 왼쪽으로만 가면 됨
    if (right < 0) {
      moving = Math.min(moving, left);
      // 3. 쭉가는거, 왼 -> 오, 오 -> 왼 최소값
    } else {
      moving = Math.min(moving, right * 2 + left, left * 2 + right);
    }
  }

  return upDown + moving;
}
