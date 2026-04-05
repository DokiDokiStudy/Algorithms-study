const fs = require("fs");
const [num, ...input] = fs.readFileSync(0).toString().trim().split("\n");
const [N, M] = num.split(" ").map(Number);

// => (N-8) * (M-8) * 8 * 8 => 부르트포스 가능

const TOTAL_COUNT = 64;
let minChange = Infinity;

for (let i = 0; i <= N - 8; i++) {
  for (let j = 0; j <= M - 8; j++) {
    simulate(i, j);
  }
}

console.log(minChange);

function simulate(startX, startY) {
  let count = 0;

  for (let x = startX; x < startX + 8; x++) {
    for (let y = startY; y < startY + 8; y++) {
      if ((x + y) % 2 === 0) {
        if (input[x][y] === "B") count++;
      } else {
        if (input[x][y] === "W") count++;
      }
    }
  }
  minChange = Math.min(minChange, count, TOTAL_COUNT - count);
}
