const fs = require("fs");
const decompSum = +fs.readFileSync(0).toString().trim();

let constructor = 0;
for (let number = 1; number < decompSum; number++) {
  const sum =
    number +
    number
      .toString()
      .split("")
      .reduce((acc, cur) => acc + +cur, 0);

  if (sum === decompSum) {
    constructor = number;
    break;
  }
}

console.log(constructor);