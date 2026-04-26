function solution(tickets) {
    let answer;
    const edges = {};
    let flag = 0;
    const used = new Array(tickets.length).fill(0);
    
    for(let i = 0; i < tickets.length; i++) {
        const departure = tickets[i][0];
        
        if(!edges[departure]) edges[departure] = [];
        edges[departure].push(i);
    }
    
    for(const key in edges) {
        edges[key].sort((a,b) => tickets[a][1].localeCompare(tickets[b][1]));
    }
    
    dfs("ICN", used, ["ICN"]);
    return answer;
    
    function dfs(node, used, visitedList) {
        if(flag === 1) return;
        
        if(visitedList.length === tickets.length + 1) {
            answer = [...visitedList];
            flag = 1;
            return;
        }
        
        if(!edges[node]) return;
        
        for(const ticketIndex of edges[node]) { 
            const arrival = tickets[ticketIndex][1];
            
            if(used[ticketIndex]) continue;
            
            used[ticketIndex] = 1;
            visitedList.push(arrival);
            
            dfs(arrival, used, visitedList);
            
            used[ticketIndex] = 0;
            visitedList.pop();
        }
    
    }
}

