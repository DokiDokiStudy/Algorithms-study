from collections import deque

def solution(game_board, table):
    n = len(game_board) # 격자는 n * n

    # 상, 하, 좌, 우
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # 좌표로 구성된 블록을 다른 블록과 모양만을 쉽게 비교할 수 있도록 좌표의 위치정보를 제거하는 함수
    def normalize(block):
        min_x = min(x for x, y in block)
        min_y = min(y for x, y in block)

        normalized = []

        for x, y in block:
            normalized.append((x - min_x, y - min_y))

        normalized.sort()
        return normalized

    # 보드에서 블록 덩어리 찾기
    def bfs(board, target):
        visited = [[False] * n for _ in range(n)]
        blocks = []

        # 보드 n * n 좌표 탐색해서 타겟에 해당하는 좌표면 거기서 부터 덩어리 찾아내기
        for i in range(n):
            for j in range(n):
                if board[i][j] == target and not visited[i][j]:
                    queue = deque()
                    queue.append((i, j))
                    visited[i][j] = True

                    block = []

                    while queue:
                        x, y = queue.popleft()
                        block.append((x, y))

                        for dx, dy in directions:
                            nx = x + dx
                            ny = y + dy

                            if nx < 0 or nx >= n or ny < 0 or ny >= n:
                                continue

                            if visited[nx][ny]:
                                continue

                            if board[nx][ny] != target:
                                continue

                            visited[nx][ny] = True
                            queue.append((nx, ny))

                    # 완성된 블록을 정규화해서 넣기
                    blocks.append(normalize(block))

        return blocks

    # 블록 90도 회전
    def rotate(block):
        rotated = []

        for x, y in block:
            rotated.append((y, -x))

        #회전 후에는 음수 좌표가 생길 수 있으므로 다시 normalize 필요
        return normalize(rotated)

    # 시작
    empty_spaces = bfs(game_board, 0)
    puzzle_pieces = bfs(table, 1)

    used = [False] * len(puzzle_pieces)
    answer = 0

    for space in empty_spaces:
        for i in range(len(puzzle_pieces)):
            if used[i]:
                continue

            piece = puzzle_pieces[i]

            # 칸 수가 다르면 절대 들어갈 수 없음
            if len(space) != len(piece):
                continue

            current_piece = piece

            for _ in range(4):
                # 좌표리스트 전체 비교
                # 중요한건 이를 위해서는 정규화 시 반드시 소팅해줘야함!
                if space == current_piece:
                    used[i] = True
                    answer += len(space)
                    break

                current_piece = rotate(current_piece)

            # 현재 빈칸에 맞는 조각을 찾았으면
            # 다른 조각은 더 볼 필요 없음
            if used[i]:
                break

    return answer