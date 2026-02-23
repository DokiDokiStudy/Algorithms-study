const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\n/);
const iptSize = input[0];
const opt = [];
for (let i = 1; i <= iptSize; i++) {
  const str = input[i].split("");
  const chk = [];
  let result;
  for (let j = 0; j < str.length; j++) {
    if (str[j] === "(") {
      chk.push("(");
    } else if (str[j] === ")") {
      if (chk.length === 0) {
        result = "NO";
        break;
      } else {
        chk.pop();
      }
    }
  }
  if (!result) result = chk.length === 0 ? "YES" : "NO";
  opt.push(result);
}
console.log(opt.join("\n"));
