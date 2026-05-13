function solution(game_board, table) {
  const boardLength = game_board.length;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // ================================================================
  //board에서 target 값으로 연결된 덩어리들을 bfs로 찾음
  const getPieces = (board, target) => {
    const visited = Array.from({ length: boardLength }, () =>
      Array(boardLength).fill(false),
    );
    // 찾은 조각들
    const pieces = [];

    // 시작 좌표부터 연결된 하나의 덩어리를 찾는 bfs
    const bfs = (row, col) => {
      const queue = [[row, col]];

      const piece = [];
      visited[row][col] = true;
      let queueIndex = 0;

      while (queueIndex < queue.length) {
        const [row, col] = queue[queueIndex];
        queueIndex++;

        // 현재 좌표를 piece에 추가
        piece.push([row, col]);

        for (const [dr, dc] of directions) {
          const nextRow = row + dr;
          const nextCol = col + dc;

          // 보드 범위를 벗어나면 제외
          if (nextRow < 0 || nextRow >= boardLength) continue;
          if (nextCol < 0 || nextCol >= boardLength) continue;

          // 이미 방문한 칸이면 제외
          if (visited[nextRow][nextCol]) continue;

          // 찾고 있는 값이 아니면 제외
          if (board[nextRow][nextCol] !== target) continue;

          // 다음 좌표 방문 처리 후 queue에 추가
          visited[nextRow][nextCol] = true;
          queue.push([nextRow, nextCol]);
        }
      }

      return piece;
    };

    // 모든 좌표를 돌면서 찾음
    for (let row = 0; row < boardLength; row++) {
      for (let col = 0; col < boardLength; col++) {
        // 이미 방문한 칸이면 제외
        if (visited[row][col]) continue;
        // 찾고 있는 값이 아니면 제외
        if (board[row][col] !== target) continue;

        const piece = bfs(row, col);
        pieces.push(piece);
      }
    }

    return pieces;
  };

  // 빈공간 조각
  const emptySpaces = getPieces(game_board, 0);
  // 퍼즐 조각
  const puzzlePieces = getPieces(table, 1);

  console.log("emptySpaces", emptySpaces);

  // ================================================================
  // 2차원 배열로 만듬 -> 좌표를 배열로 생성
  const normalize = (piece) => {
    let minRow = Infinity;
    let minCol = Infinity;
    let maxRow = -Infinity;
    let maxCol = -Infinity;

    // 조각 좌표 중 최대, 최소 위/아래/왼쪽/오른쪽 좌표 찾기
    for (const [row, col] of piece) {
      minRow = Math.min(minRow, row);
      minCol = Math.min(minCol, col);
      maxRow = Math.max(maxRow, row);
      maxCol = Math.max(maxCol, col);
    }

    // 조각을 담을 최소 배열 크기
    const rowLength = maxRow - minRow + 1;
    const colLength = maxCol - minCol + 1;

    const map = Array.from({ length: rowLength }, () =>
      Array(colLength).fill(0),
    );
    // 배열에 조각 넣음
    for (const [row, col] of piece) {
      map[row - minRow][col - minCol] = 1;
    }

    return map;
  };

  // 배열로 만든 빈공간 조각
  const afterNormalizeEmptySpaces = emptySpaces.map((piece) =>
    normalize(piece),
  );
  // 배열로 만든 퍼즐 조각
  const afterNormalizePuzzlePieces = puzzlePieces.map((piece) =>
    normalize(piece),
  );

  // ================================================================
  // 배열로 만든 퍼즐 조각을 회전 시계방향 90도
  const rotatePiece = (piece) => {
    const rowLength = piece.length;
    const colLength = piece[0].length;

    const rotatedPiece = Array.from({ length: colLength }, () =>
      Array(rowLength).fill(0),
    );

    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        const newRow = col;
        const newCol = rowLength - 1 - row;

        rotatedPiece[newRow][newCol] = piece[row][col];
      }
    }

    return rotatedPiece;
  };

  // ================================================================
  // 2차원 배열이 같은지를 확인(정확히 동일)
  const isSamePiece = (pieceA, pieceB) => {
    if (pieceA.length !== pieceB.length) return false;
    if (pieceA[0].length !== pieceB[0].length) return false;

    for (let row = 0; row < pieceA.length; row++) {
      for (let col = 0; col < pieceA[0].length; col++) {
        if (pieceA[row][col] !== pieceB[row][col]) {
          return false;
        }
      }
    }

    return true;
  };

  // ================================================================
  // 조각의 칸 수 계산
  const countPieceCells = (piece) => {
    return piece.flat().filter((value) => value === 1).length;
  };

  // 이미 사용한 퍼즐 조각 체크
  const usedPuzzlePieces = Array(afterNormalizePuzzlePieces.length).fill(false);

  let answer = 0;

  // 빈공간 조각 하나씩 확인
  for (const emptySpace of afterNormalizeEmptySpaces) {
    // 퍼즐 조각 하나씩 확인
    for (let i = 0; i < afterNormalizePuzzlePieces.length; i++) {
      if (usedPuzzlePieces[i]) continue;

      let puzzlePiece = afterNormalizePuzzlePieces[i];

      // 퍼즐 조각을 0도, 90도, 180도, 270도 회전하면서 비교
      for (let rotateCount = 0; rotateCount < 4; rotateCount++) {
        if (isSamePiece(emptySpace, puzzlePiece)) {
          usedPuzzlePieces[i] = true;
          answer += countPieceCells(emptySpace);
          break;
        }

        puzzlePiece = rotatePiece(puzzlePiece);
      }

      // 현재 빈공간에 맞는 퍼즐을 찾았으면 다음 빈공간으로 이동
      if (usedPuzzlePieces[i]) break;
    }
  }

  return answer;
}