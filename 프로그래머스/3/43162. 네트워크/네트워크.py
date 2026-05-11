def solution(n, computers):
    visited = [False] * n
    answer = 0

    def dfs(current):
        visited[current] = True

        # 현재 컴퓨터와 연결된 컴퓨터들의 연계를 전체 확인
        for next_computer in range(n):
            # 연결되어 있고, 아직 방문하지 않았다면
            if computers[current][next_computer] == 1 and not visited[next_computer]:
                dfs(next_computer)

    for i in range(n):
        # 아직 방문하지 않은 컴퓨터라면 이전에 탐색한 컴퓨터와 네트워크로 연결되지 않은 새 네트워크로 판단
        if not visited[i]:
            answer += 1
            dfs(i)

    return answer
