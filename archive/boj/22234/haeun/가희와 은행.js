const fs = require("fs");
const [[N, T, W], ...input] = fs.readFileSync(0).toString().trim().split("\n").map(i => i.split(" ").map(Number))

const queue = input.slice(0, N);
const M = input[N];
const customerList = input.slice(N+1).sort((a,b) => a[2] - b[2])

let qHead = 0;
let cHead = 0;

const output = new Array(W);

let w = 0;

while (w < W) {
    const currentCustomer = queue[qHead++];
    const [p, t] = currentCustomer;
    
    if(T < t) {
        for(let i = w; i < Math.min(w + T, W); i++) {
            output[i] = p;
            enterCustomer(i + 1);
        }
        w += T;
        queue.push([p, t - T]);
    }
    else {
        for(let i = w; i < Math.min(w + t, W); i++) {
            output[i] = p;
            enterCustomer(i + 1);
        }
        w += t;
    }

}
console.log(output.join("\n"));

function enterCustomer(currentTime) {
    if(cHead < customerList.length && currentTime === customerList[cHead][2]) {
        queue.push([customerList[cHead][0], customerList[cHead][1]]);
        cHead++;
    }
}