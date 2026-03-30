import sys
def main() -> None:
    input = sys.stdin.readline

    N = int(input())
    start = max(1, N - 9 * len(str(N)))

    # 분해합 식을 거꾸로 보면 생성자 후보의 하한을 구할 수 있다.
    for m in range(start, N):
        if m + sum(map(int, str(m))) == N:
            print(m)
            return

    print(0)

if __name__ == "__main__":
    main()
