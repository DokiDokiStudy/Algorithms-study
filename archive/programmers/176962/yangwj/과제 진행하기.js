function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function solution(plans) {
  //['korean', 700, 30] 형식으로 변환
  //[과제, 현재시간, 과제시간]
  const sortedPlans = [...plans]
    .sort((a, b) => (a[1] > b[1] ? 1 : -1))
    .map((item) => [item[0], toMinutes(item[1]), Number(item[2])]);

  const result = [];
  // 멈춘 과제들 쌓기
  const stack = [];

  // 현재 과제
  let current = null;
  // 현재 시간
  let currentTime = 0;

  for (let i = 0; i < sortedPlans.length; i++) {
    if (i === 0) {
      //현재 과제를 첫번째 과제
      current = sortedPlans[i];
      //현재 시간을 첫번째 과제 시작 시각
      currentTime = sortedPlans[i][1];
      continue;
    }

    // 다음 과제시간과 현재시간의 차이
    let during = sortedPlans[i][1] - currentTime;

    // during이 남아 있고 현재 처리 중 과제가 있으면
    while (during >= 0 && current) {
      // 현재 과제 시간이 가용시간안에 끝낼수 잇으면
      if (current[2] <= during) {
        result.push(current[0]); // 과제 완료
        during -= current[2]; // 여유시간
        current = stack.pop(); // 멈춘 과제들 -> 다시 반복문돌게 잇으면 -> 딱 끝나도 어차피 덮어씀
        // 현재 과제 시간이 가용시간안에 못 끝내면
      } else {
        current[2] -= during; // 일단 지금가지 한거 한시간만큼 빼고
        stack.push(current); // 멈춘 과제 리스트 저장
        break;
      }
    }

    // 현재 과제, 시간 다음걸로 교체
    current = sortedPlans[i];
    currentTime = sortedPlans[i][1];
  }

  //마지막 과제
  result.push(current[0]);

  //멈춰둔 남아있는 과제
  while (stack.length) {
    result.push(stack.pop()[0]);
  }

  return result;
}