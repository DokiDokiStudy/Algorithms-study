function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
  let bridgeQueue = Array.from({ length: bridge_length }, () => 0);
  let queueWeight = 0;
  let idx = 0;
  let time = 0;

  while (idx < truck_weights.length || queueWeight > 0) {
    time++;
    const firstTruck = bridgeQueue.shift();
    if (firstTruck > 0) queueWeight -= firstTruck;

    if (
      idx < truck_weights.length &&
      queueWeight + truck_weights[idx] <= weight
    ) {
      bridgeQueue.push(truck_weights[idx]);
      queueWeight += truck_weights[idx];
      idx++;
    } else {
      bridgeQueue.push(0);
    }
  }

    return time;
}