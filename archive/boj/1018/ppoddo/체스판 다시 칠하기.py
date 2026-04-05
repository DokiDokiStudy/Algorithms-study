import sys

def main() -> None:
    input = sys.stdin.readline
    N, M = map(int, input().strip().split())
    board = [input().strip() for _ in range(N)]

    result = 64

    for i in range(N - 7):
        for j in range(M - 7):
            white_start = 0
            black_start = 0
            for k in range(i, i + 8):
                for l in range(j, j + 8):
                    # 짝수
                    if (k + l) % 2 == 0:
                        if board[k][l] != 'W':
                            white_start += 1
                        if board[k][l] != 'B':
                            black_start += 1
                    # 홀수
                    else:
                        if board[k][l] != 'B':
                            white_start += 1
                        if board[k][l] != 'W':
                            black_start += 1
            result = min(result, white_start, black_start)

    print(result)
if __name__ == "__main__":
    main()