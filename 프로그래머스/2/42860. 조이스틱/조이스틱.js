function solution(name) {
  let upDown = 0;
  const nameLength = name.length;

  for (let i = 0; i < nameLength; i++) {
    upDown += Math.min(name.charCodeAt(i) - 65, 91 - name.charCodeAt(i));
  }

  let move = nameLength - 1;

  for (let i = 0; i < nameLength; i++) {
    // i 다음에 A가 연속으로 몇 칸인지 찾기
    let next = i + 1;
    while (next < nameLength && name[next] === "A") {
      next++;
    }

    // 방법1: 오른쪽으로 i까지 갔다가, 되돌아와서 왼쪽으로
    // i까지 갔다 돌아오기 = i * 2, 나머지 왼쪽 = nameLength - next
    const a = i * 2 + (nameLength - next);

    // 방법2: 왼쪽으로 먼저 갔다가, 되돌아와서 오른쪽으로
    // 왼쪽 갔다 돌아오기 = (nameLength - next) * 2, 나머지 오른쪽 = i
    const b = (nameLength - next) * 2 + i;

    move = Math.min(move, a, b);
  }

  return upDown + move;
}
