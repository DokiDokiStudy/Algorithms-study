import sys
def main() -> None:
    input = sys.stdin.readline
    n, m = map(int, input().split())
    s = set(input().strip() for _ in range(n))
    # n + m 줄의 입력이 들어고 n개의 문자열은 그룹 s, 그 외 나머지는 검사 그룹
    count = 0
    for _ in range(m):
        if input().strip() in s:
            count += 1
    print(count)
if __name__ == "__main__":
    main()
