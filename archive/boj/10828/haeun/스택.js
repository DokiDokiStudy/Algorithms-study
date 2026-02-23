const fs = require("fs");
const [_, ...input] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" "));

const stack = [];
const output = [];

const stackFn = {
  push: (number) => stack.push(number),
  pop: (number) => output.push(stack.length ? stack.pop(number) : -1),
  size: () => output.push(stack.length),
  empty: () => output.push(stack.length ? 0 : 1),
  top: () => output.push(stack.length ? stack.at(-1) : -1),
};
for (const [type, number] of input) {
  const fn = stackFn[type];
  number ? fn(number) : fn();
}

console.log(output.join("\n"));
