from collections import deque
def solution(rectangle, characterX, characterY, itemX, itemY):
    # 좌표 최대 50 → 2배 하면 100
    # 여유 있게 102 크기 사용
    # 0은 빈공간, 1은 테두리, 2는 직사각형 내부
    board = [[0] * 102 for _ in range(102)]

    # 모든 직사각형 좌표를 2배 확대해서 board에 표시
    for x1, y1, x2, y2 in rectangle:
        x1 *= 2
        y1 *= 2
        x2 *= 2
        y2 *= 2

        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):

                # 직사각형 내부
                if x1 < x < x2 and y1 < y < y2:
                    board[x][y] = 2

                # 직사각형 테두리
                elif board[x][y] != 2:
                    board[x][y] = 1

    # 캐릭터와 아이템 좌표도 2배 확대
    start_x = characterX * 2
    start_y = characterY * 2
    target_x = itemX * 2
    target_y = itemY * 2

    # BFS 시작
    queue = deque()
    queue.append((start_x, start_y, 0))

    visited = [[False] * 102 for _ in range(102)]
    visited[start_x][start_y] = True

    directions = [(-1, 0),(1, 0),(0, -1),(0, 1)]

    while queue:
        x, y, distance = queue.popleft()

        # 아이템 도달 시 종료
        if x == target_x and y == target_y:
            return distance // 2

        for dx, dy in directions:
            nx = x + dx
            ny = y + dy

            if nx < 0 or nx >= 102 or ny < 0 or ny >= 102:
                continue

            if visited[nx][ny]:
                continue

            # 테두리만 이동 가능
            if board[nx][ny] != 1:
                continue

            visited[nx][ny] = True
            queue.append((nx, ny, distance + 1))