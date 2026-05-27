function solution(info, query) {
 var answer = [];
  const infoMap = {};
  info.forEach((i) => {
    const keyArr = i.split(" ");
    const score = parseInt(keyArr.pop());

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
          for (let l = 0; l < 2; l++) {
            const key =
              (!i ? keyArr[0] : "-") +
              (!j ? keyArr[1] : "-") +
              (!k ? keyArr[2] : "-") +
              (!l ? keyArr[3] : "-");
            if (!infoMap[key]) infoMap[key] = [];
            infoMap[key].push(score);
          }
        }
      }
    }
  });

  Object.entries(infoMap).map(([k, v]) => {
    infoMap[k] = v.sort((a, b) => a - b);
  });

  function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length;
    let answer = arr.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] >= target) {
        answer = mid;
        right = mid - 1;
      } else left = mid + 1;
    }
    return answer;
  }

  query.forEach((q) => {
    const category = q.split(" and ");
    const scoreArr = category.pop().split(" ");
    const key = [...category, scoreArr[0]].join("");
    const score = Number(scoreArr[1]);
    if (!infoMap[key]) answer.push(0);
    else answer.push(infoMap[key].length - lowerBound(infoMap[key], score));

    return [...category, ...scoreArr];
  });

  return answer;
}