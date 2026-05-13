function solution(game_board, table) {
  const row = game_board.length;
  const column = game_board[0].length;
  const gameVisited = Array.from({ length: row }, () =>
    Array(column).fill(false),
  );
  const tableVisited = Array.from({ length: row }, () =>
    Array(column).fill(false),
  );

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  function bfs(x, y, targetTable, targetFlag) {
    const queue = [[x, y]];
    const shape = [];
    const visited = targetTable === game_board ? gameVisited : tableVisited;
    visited[x][y] = true;

    while (queue.length) {
      const [cx, cy] = queue.shift();
      shape.push([cx, cy]);

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (
          nx >= 0 &&
          nx < row &&
          ny >= 0 &&
          ny < column &&
          !visited[nx][ny] &&
          targetTable[nx][ny] === targetFlag
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
    return shape;
  }

  let gameShape = [];
  let tableShape = [];
  let filledShape = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (game_board[i][j] === 0 && !gameVisited[i][j])
        gameShape.push(bfs(i, j, game_board, 0));

      if (table[i][j] === 1 && !tableVisited[i][j])
        tableShape.push(bfs(i, j, table, 1));
    }
  }

  function getShapeInfo(shape) {
    const minX = Math.min(...shape.map((x) => x[0]));
    const minY = Math.min(...shape.map((x) => x[1]));
    return shape.map(([x, y]) => [x - minX, y - minY]);
  }

  function compareShapes(shape1, shape2) {
    const toString = (s) =>
      [...s]
        .sort((a, b) => a[0] - b[0] || a[1] - b[1])
        .map(([x, y]) => `${x},${y}`)
        .join("|");
    return toString(shape1) === toString(shape2);
  }

  for (const gShape of gameShape) {
    const gShapeList = getShapeInfo(gShape);

    tableShape.some((tShape) => {
      if (gShape.length !== tShape.length) return false;

      let tShapeList = getShapeInfo(tShape);

      for (let i = 0; i < 4; i++) {
        tShapeList = tShapeList.map(([x, y]) => [y, -x]);
        if (compareShapes(gShapeList, getShapeInfo(tShapeList))) {
          filledShape += gShape.length;
          tableShape = tableShape.filter((shape) => shape !== tShape);
          return true;
        }
      }
      return false;
    });
  }

  return filledShape;
}