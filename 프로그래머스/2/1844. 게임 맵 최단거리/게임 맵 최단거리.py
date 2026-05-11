from collections import deque
def solution(maps):
    n = len(maps)
    m = len(maps[0])

    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]

    # 시작 위치 = 좌측 상단
    queue = deque()
    queue.append((0, 0))

    # 시작 칸도 지나간 칸 개수에 포함되므로 거리 1부터 시작
    maps[0][0] = 1

    while queue:
        x, y = queue.popleft()

        # 현재 위치에서 상하좌우 탐색
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if nx < 0 or nx >= n or ny < 0 or ny >= m:
                continue

            if maps[nx][ny] == 0:
                continue

            if maps[nx][ny] == 1:
                maps[nx][ny] = maps[x][y] + 1
                queue.append((nx, ny))

    # 도착 지점까지의 최단 거리
    answer = maps[n - 1][m - 1]

    # 도착 지점이 여전히 1이면 방문하지 못한 것
    # 단, 시작점과 도착점이 같은 경우는 없다고 했으므로 이렇게 처리 가능
    if answer == 1:
        return -1

    return answer