import sys
from collections import deque

def main() -> None:
    input = sys.stdin.readline
    N, M = map(int, input().split())
    maze = [input().rstrip() for _ in range(N)]
    
    # 거리 저장
    distance = [[0] * M for _ in range(N)]

    # 상하좌우
    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]

    searchQ = deque()
    searchQ.append((0, 0))
    distance[0][0] =1

    while searchQ:
        r, c = searchQ.popleft()

        for k in range(4):
            nr = r + dr[k]
            nc = c + dc[k]

            if 0 <= nr < N and 0 <= nc < M:
                if maze[nr][nc] == '1' and distance[nr][nc] == 0:
                    distance[nr][nc] = distance[r][c] + 1
                    searchQ.append((nr,nc))

    print (distance[N - 1][M - 1])
if __name__ == "__main__":
    main()
