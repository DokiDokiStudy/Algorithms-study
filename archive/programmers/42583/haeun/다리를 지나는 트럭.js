function solution(bridge_length, weight, truck_weights) {
    let time = bridge_length;
    const stack = [];
    let currWeight = 0;
    
    for(const w of truck_weights) {
       if(!stack.length) {
           stack.push(w);
           currWeight += w;
           time++;
           continue;
       }
        
        while (1) {
            time++;
            
            if(stack.length === bridge_length) 
                currWeight -= stack.shift();
            
            const isWeightOver = currWeight + w > weight;
            
            if(isWeightOver) stack.push(0);
            else {
                stack.push(w);
                currWeight += w;
                break;
            }
        }
    }
    
    return time;
}