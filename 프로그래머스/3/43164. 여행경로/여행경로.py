from collections import defaultdict

def solution(tickets):
    graph = defaultdict(list)

    # 도착지를 역순 정렬
    # pop()으로 알파벳 순서가 앞서는 공항을 꺼내기 위함
    for start, end in sorted(tickets, reverse=True):
        graph[start].append(end)

    path = []

    def dfs(airport):
        while graph[airport]:
            next_airport = graph[airport].pop()
            dfs(next_airport)

        path.append(airport)

    dfs("ICN")

    return path[::-1]
