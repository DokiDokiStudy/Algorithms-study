from collections import defaultdict
from bisect import bisect_left

def solution(infos, query):
    data = defaultdict(list)
    answer = []

    # 점수 외 조건은 언어, 직군, 경력, 소울 푸드 총 4개
    def make_keys(wheres, code_score, depth, key):
        if depth == 4:
            data[key].append(code_score)
            return

        # 현재 조건을 실제 값으로 사용하는 경우
        make_keys(wheres, code_score, depth + 1, key + wheres[depth])

        # 현재 조건을 '-'(무관)으로 사용하는 경우
        make_keys(wheres, code_score, depth + 1, key + '-')

    # DB 인덱스와 목적은 비슷하다.
    # 전체 데이터를 매번 스캔하지 않기 위해 검색용 key를 미리 만들어두는 방식이다.
    # 다만 DB 인덱스보다 범용적이지 않고, '-' 조건 조합을 모두 저장하는 브루트포스성 전처리에 가깝다.
    for info in infos:
        rows = info.split()
        code_score = int(rows[-1])
        wheres = rows[:-1]

        make_keys(wheres, code_score, 0, '')

    for key in data:
        data[key].sort()

    for q in query:
        q = q.replace(' and ', ' ')
        rows = q.split()

        code_score = int(rows[-1])
        wheres = rows[:-1]
        key = ''.join(wheres)

        all_code_score = data[key]

        # 기준 점수에 충족하는 맨 처음 점수 인덱스 구하기
        idx = bisect_left(all_code_score, code_score)
        count = len(all_code_score) - idx

        answer.append(count)

    return answer