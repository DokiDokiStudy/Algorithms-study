const fs = require("fs");
const [cnt, raw] = fs.readFileSync(0, "utf8").trim().split(/\n/);

const arr = raw.split(/\s+/);
const biggest = [];
const result = Array.from({ length: cnt }).map(() => -1);

for (let i = 0; i < cnt; i++) {
  const num = +arr[i];

  while (biggest.length && arr[biggest[biggest.length - 1]] < num) {
    const idx = biggest.pop();
    result[idx] = num;
  }

  biggest.push(i);
}

console.log(result.join(" "));
