def solution(k, dungeons):
    n = len(dungeons)
    visited_flag = [False] * n
    current_visit_dungeon_count = 0

    def dfs(cur_k, count):
        nonlocal current_visit_dungeon_count
        current_visit_dungeon_count = max(current_visit_dungeon_count, count)

        # 현재 선택지 내 모든 던전에 대해 탐험 가능 여부 확인
        for i in range(n):
            need_k, consume_k = dungeons[i]

            if not visited_flag[i] and cur_k >= need_k:
                visited_flag[i] = True
                dfs(cur_k - consume_k, count + 1) # 재귀 진행해서 해당 던전 제외 나머지 탐험 가능 여부 확인 - 피로도 없을 때까지

                # 위 재귀가 끝나면 다시 방문 가능하도록 재귀 내 초기화
                visited_flag[i] = False

    dfs(k, 0)
    return current_visit_dungeon_count