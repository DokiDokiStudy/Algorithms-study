import sys
from collections import deque

# DFS 재귀 호출 깊이 제한 완화
sys.setrecursionlimit(10000)

def dfs(v, graph, visited, result):
    visited[v] = True
    result.append(v)

    # 현재 점과 간선으로 연결된 점들 중 방문 안한 점만 방문
    for nextV in graph[v]:
        if not visited[nextV]:
            dfs(nextV, graph, visited, result)

def bfs(start, graph, visited):
    q = deque([start])
    visited[start] = True
    result = []

    while q:
        v = q.popleft()
        result.append(v)

        # 방문이 필요한 점은 q에 쌓는다.
        for nextV in graph[v]:
            if not visited[nextV]:
                visited[nextV] = True
                q.append(nextV)

    return result

def main() -> None:
    input = sys.stdin.readline
    N, M, V = map(int, input().split())
    graph = [[] for _ in range(N + 1)]

    for _ in range(M):
        a, b = map(int, input().split())
        graph[a].append(b)
        graph[b].append(a)

    # 특정 점 기준 해당 점이 가지고 있는
    # 다른 점 번호들 중에 작은 점부터 방문하기 위해서 미리 정렬하기
    for i in range(1, N + 1):
        graph[i].sort()

    visited_dfs = [False] * (N + 1)
    dfs_result = []
    dfs(V, graph, visited_dfs, dfs_result)

    visited_bfs = [False] * (N + 1)
    bfs_result = bfs(V, graph, visited_bfs)

    print(*dfs_result)
    print(*bfs_result)
if __name__ == "__main__":
    main()
