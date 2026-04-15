function solution(k, dungeons) {
let answer = 0;

  function recursive(restDungeons, depth = 0, counter = 0, rest = k) {
    if (depth > dungeons.length) return;

    for (let i = 0; i < restDungeons.length; i++) {
      if (rest < restDungeons[i][0]) continue;

      const newRestDungeons = [...restDungeons];
      newRestDungeons.splice(i, 1);
      answer = Math.max(answer, counter + 1);

      recursive(
        newRestDungeons,
        depth + 1,
        counter + 1,
        rest - restDungeons[i][1]
      );
    }
  }

  recursive(dungeons);

  return answer;
}