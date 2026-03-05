import sys

def main() -> None:
    input = sys.stdin.readline

    N = int(input().strip()) # 빌딩 수
    buildings = [int(input().strip()) for _ in range(N)] # 나머지 입력 전부
    stack = []

    answer = 0

    for h in buildings:
        # 현재 건물보다 낮은 빌딩들은 현재 건물한테 막힘
        while stack and stack[-1] <= h:
            stack.pop()

        answer += len(stack)

        stack.append(h)

    print(answer)    
if __name__ == "__main__":
    main()