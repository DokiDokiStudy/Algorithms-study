function solution(name) {
  // a = 0
  // bcdefghijklm = up (B:1 ~ M:12)
  // n = 13 (양쪽 동일)
  // zyxwvutsrqpo = down (Z:1 ~ O:12) ← 역순으로 index+1이 이동 횟수
  const n = name.length;
  const up = "BCDEFGHIJKLM".split("");
  const down = "ZYXWVUTSRQPON".split("");
  // const map ={A:1,B:2,C:3....Z:1} 이 방식이 더 좋은가..?

  function charCount(c) {
    if (c === "A") return 0;
    const ui = up.indexOf(c);
    if (ui !== -1) return ui + 1;
    return down.indexOf(c) + 1;
  }

  function dfs(left, right, target) {
    while (left <= right && name[left] === "A") left++;
    while (left <= right && name[right] === "A") right--;
    if (left > right) return 0;

    const goRight = ((left - target + n) % n) + dfs(left + 1, right, left);
    const goLeft = ((target - right + n) % n) + dfs(left, right - 1, right);
    return Math.min(goRight, goLeft);
  }

  const charMoves = name.split("").reduce((a, c) => a + charCount(c), 0);
  return charMoves + dfs(1, n - 1, 0);
}