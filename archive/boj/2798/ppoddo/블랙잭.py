import sys

def main() -> None:
    input = sys.stdin.readline

    # 아이디어: 무작위 세 수의 조합이 M보다 크면 큰 수가 문제, M보다 작으면 작은 수를 조정
    N, M = map(int, input().split())
    cards = sorted(map(int, input().split()))
    bestCombine = 0

    for i in range(N - 2):
        left = i + 1
        right = N - 1

        while left < right:
            combine = cards[i] + cards[left] + cards[right]

            if combine > M:
                # 현재 right에 있는 숫자보다 다음으로 작은 숫자로 합 줄여보기
                right -= 1
            else:
                # 현재 left에 있는 숫자보다 다음으로 큰 숫자로 합 키워보기
                bestCombine = max(bestCombine, combine)

                if bestCombine == M:
                    print(bestCombine)
                    return
                left += 1
    
    print(bestCombine)
if __name__ == "__main__":
    main()
