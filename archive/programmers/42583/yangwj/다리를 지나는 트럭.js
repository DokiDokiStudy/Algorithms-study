function solution(bridge_length, weight, truck_weights) {
    const bridge = Array(bridge_length).fill(0);
    let currentWeight = 0;
    let count = 0;
    
    while(truck_weights.length > 0 || currentWeight !== 0){
        count += 1
        currentWeight -= bridge.shift();
        
        if(currentWeight + truck_weights[0] <= weight){
            bridge.push(truck_weights[0])
            currentWeight += truck_weights[0]
            truck_weights.shift()
        }else{
            bridge.push(0)
        }
    } 
    
    return count;
}