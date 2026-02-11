function solution(arr)
{
    var answer = [arr[0]];
    let prev = arr[0];
    for(let i = 1; i < arr.length; i++){
        if(prev !== arr[i]){
            prev = arr[i]
            answer.push(prev)
        }
    }
    
    console.log(answer)
    return answer;
}