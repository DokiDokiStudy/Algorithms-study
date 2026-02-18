const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\n/);
const towerList = input[1].split(" ");
const tower = [];
const result = [];

for (let index = 0; index < towerList.length; index++) {
  const height = +towerList[index];
  while (tower.length > 0 && tower[tower.length - 1].height < height) {
    tower.pop();
  }
  result.push(!tower.length ? 0 : tower[tower.length - 1].index + 1);
  tower.push({ index, height });
}

console.log(result.join(" "));
