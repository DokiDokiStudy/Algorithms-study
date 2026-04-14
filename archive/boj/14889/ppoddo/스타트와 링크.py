import sys
from itertools import combinations

def main() -> None:
    input = sys.stdin.readline
    N = int(input().strip())
    S = [list(map(int, input().strip().split())) for _ in range(N)]

    min_score_diff = float("inf")

    # 0번 사람은 스타트 팀에 고정
    # 스타트/링크 팀은 이름만 바뀌면 같은 경우이므로
    # 0번을 한쪽 팀에 고정해서 중복 조합을 절반으로 줄인다.
    for rest in combinations(range(1, N), N // 2 - 1):
        start_team = (0,) + rest
        link_team = [i for i in range(N) if i not in start_team]

        start_team_score = 0
        # 팀 내부의 모든 2인 조합에 대해
        # S[a][b] + S[b][a] 를 더한다.
        for i in range(N // 2):
            for j in range(i + 1, N // 2):
                start_team_score += S[start_team[i]][start_team[j]]
                start_team_score += S[start_team[j]][start_team[i]]

        link_team_score = 0
        for i in range(N // 2):
            for j in range(i + 1, N // 2):
                link_team_score += S[link_team[i]][link_team[j]]
                link_team_score += S[link_team[j]][link_team[i]]
        
        # 현재 조합에서 두 팀의 능력치 차이
        score_diff = abs(start_team_score - link_team_score)
        if score_diff == 0:
            print(0)
            return
        min_score_diff = min(min_score_diff, score_diff)
    
    print(min_score_diff)

if __name__ == "__main__":
    main()