function solution(game_board, table) {
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    const tableLen = table.length;

    const blanks = findPieces(game_board, 0);
    const pieces = findPieces(table, 1);

    const used = Array(pieces.length).fill(false);
    let answer = 0;

    for (const blankRotations of blanks) {
        const blank = blankRotations[0];

        for (let i = 0; i < pieces.length; i++) {
            if (used[i]) continue;

            const pieceRotations = pieces[i];

            if (blank.length !== pieceRotations[0].length) continue;

            let matched = false;

            for (const piece of pieceRotations) {
                if (isSamePiece(blank, piece)) {
                    matched = true;
                    break;
                }
            }

            if (matched) {
                used[i] = true;
                answer += blank.length;
                break;
            }
        }
    }

    return answer;

    // 조각 찾기 함수
    function findPieces(arr, type) {
        const visited = Array.from({ length: tableLen }, () => Array(tableLen).fill(0));
        const pieceCollection = [];

        for (let i = 0; i < tableLen; i++) {
            for (let j = 0; j < tableLen; j++) {
                if (visited[i][j] || arr[i][j] !== type) continue;

                const queue = [[i, j]];
                let head = 0;
                visited[i][j] = 1;

                while (queue.length > head) {
                    const [x, y] = queue[head++];

                    for (let dir = 0; dir < 4; dir++) {
                        const nx = x + dx[dir];
                        const ny = y + dy[dir];

                        if (
                            nx < 0 ||
                            ny < 0 ||
                            nx >= tableLen ||
                            ny >= tableLen ||
                            visited[nx][ny] ||
                            arr[nx][ny] !== type
                        ) {
                            continue;
                        }

                        visited[nx][ny] = 1;
                        queue.push([nx, ny]);
                    }
                }

                const piece = arrangePiece(queue);
                pieceCollection.push(findRotatedPieces(piece));
            }
        }

        return pieceCollection;
    }
}

function arrangePiece(locations) {
    const minX = Math.min(...locations.map(([x]) => x));
    const minY = Math.min(...locations.map(([, y]) => y));

    return locations
        .map(([x, y]) => [x - minX, y - minY])
        .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function findRotatedPieces(piece) {
    const rotatedPieces = [];
    let currentPiece = piece;

    for (let i = 0; i < 4; i++) {
        const arrangedPiece = arrangePiece(currentPiece);
        rotatedPieces.push(arrangedPiece);

        currentPiece = currentPiece.map(([x, y]) => [y, -x]);
    }

    return rotatedPieces;
}

function isSamePiece(pieceA, pieceB) {
    if (pieceA.length !== pieceB.length) return false;

    for (let i = 0; i < pieceA.length; i++) {
        if (pieceA[i][0] !== pieceB[i][0]) return false;
        if (pieceA[i][1] !== pieceB[i][1]) return false;
    }

    return true;
}