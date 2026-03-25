function solution(answers) {
  let counter = [0, 0, 0];

  let two = [2, 1, 2, 3, 2, 4, 2, 5];
  let three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  for (let i = 0; i < answers.length; i++) {
    if ((i % 5) + 1 === answers[i]) {
      counter[0]++;
    }

    if (two[i % 8] === answers[i]) {
      counter[1]++;
    }

    if (three[i % 10] === answers[i]) {
      counter[2]++;
    }
  }

  let answer = [1];
  let biggest = counter[0];
  for (let i = 1; i < 3; i++) {
    if (biggest === counter[i]) {
      answer.push(i + 1);
    } else if (biggest < counter[i]) {
      biggest = counter[i];
      answer = [i + 1];
    }
  }
  return answer;
}