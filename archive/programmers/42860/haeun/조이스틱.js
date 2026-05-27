function solution(name) {
    const alphabet = {
        A:0,
        B:1,
        C:2,
        D:3,
        E:4,
        F:5,
        G:6,
        H:7,
        I:8,
        J:9,
        K:10,
        L:11,
        M:12,
        N:13,
        O:12,
        P:11,
        Q:10,
        R:9,
        S:8,
        T:7,
        U:6,
        V:5,
        W:4,
        X:3,
        Y:2,
        Z:1
    }
    
    let answer = 0;

    // 상하 이동
    for (let i = 0; i < name.length; i++) {
        answer += alphabet[name[i]];
    }

    // 좌우 이동
    let move = name.length - 1;
    for (let i = 0; i < name.length; i++) {
        let next = i + 1;
        while (next < name.length && name[next] === 'A') {
            next++;
        }
        const restep = Math.min(i, name.length - next);
        move = Math.min(move, name.length - (next-i) + restep);
    }
    answer += move;

    return answer;
}