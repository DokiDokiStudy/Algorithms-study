# 업다운 게임이랑 똑같다고 생각하면 됨
def solution(n, times):
    left = 1  # 최소
    right = max(times) * n #최대로 걸릴 시간

    answer = right

    while left <= right:
        mid_time = (left + right) // 2

        people_count = 0
        for time in times:
            people_count += mid_time // time

            if people_count >= n:
                break

        # 심사관 전체 이하 사용 시 처리 가능한 경우
        if people_count >= n:
            answer = mid_time
            right = mid_time - 1
        else:
            left = mid_time + 1

    return answer