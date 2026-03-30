function solution(answers) {
  //각 수포자 패턴
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const scores = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    patterns.forEach((pattern, j) => {
      // 수포자의 찍은 답과 실제 정답이 같으면 점수 +1
      // % pattern.length면 반복
      if (pattern[i % pattern.length] === answers[i]) scores[j] += 1;
    });
  }

  // 최고 점수와 같은 수포자 번호만 골라서 리턴 (오름차순은 자동 보장)
  const max = Math.max(...scores);
  return scores
    .map((score, i) => (score === max ? i + 1 : null))
    .filter((v) => v !== null);
}