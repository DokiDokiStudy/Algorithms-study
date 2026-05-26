def solution(name):
    answer = 0
    length = len(name)

    # 기본 케이스: 오른쪽으로 쭉 이동
    move = length - 1

    for i, ch in enumerate(name):
        # 알파벳 변경 횟수 비교하기
        up = ord(ch) - ord('A')
        down = ord('Z') - ord(ch) + 1
        answer += min(up, down)

        # 현재 위치 다음부터 연속된 A구간 찾기 - 가도되고 안가도 되는 구간
        next_idx = i + 1

        while next_idx < length and name[next_idx] == 'A':
            next_idx += 1

        # A구간을 피하는 좌우 이동 최소값 갱신
        move = min(
            move, # 그냥 오른쪽으로 쭉 이동
            i * 2 + length - next_idx, # 앞쪽 처리 후 되돌아가기
            i + (length - next_idx) * 2 # 뒤쪽 처리 후 되돌아가기
        )

    return answer + move