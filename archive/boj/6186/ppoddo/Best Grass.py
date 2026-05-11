import sys

# 정리하자면 풀 덩어리는 한 칸, 가로 두개, 세로 두개로 이루어진 조합을 가짐

def main() -> None:
    input = sys.stdin.readline
    R, C = map(int, input().split())
    pasture = [input().rstrip() for _ in range(R)]
    count = 0
    for i in range(R):
        for j in range(C):
            if pasture[i][j] == "#":
                up = (i > 0 and pasture[i - 1][j] == '#')
                left = (j > 0 and pasture[i][j - 1] == '#')

                if not up and not left:
                    count += 1
    print(count)

if __name__ == "__main__":
    main()
