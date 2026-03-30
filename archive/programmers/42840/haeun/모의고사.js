function solution(answers) {
  const first = [1, 2, 3, 4, 5];
  const second = [2, 1, 2, 3, 2, 4, 2, 5];
  const third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const score = [0, 0, 0];
  for (let i = 0; i < answers.length; i++) {
    const [firstIdx, secondIdx, thirdIdx] = [
      i % first.length,
      i % second.length,
      i % third.length,
    ];
    if (answers[i] === first[firstIdx]) score[0]++;
    if (answers[i] === second[secondIdx]) score[1]++;
    if (answers[i] === third[thirdIdx]) score[2]++;
  }
  const result = [];

  const maxScore = Math.max(...score);
  for (let i = 0; i < 3; i++) {
    if (score[i] === maxScore) result.push(i + 1);
  }
  return result;
}
