import sys

def main() -> None:
    input = sys.stdin.readline
    N = int(input().strip())
    A = list(map(int, input().strip().split()))

    stack = []
    result = [-1] * N
    # 인덱스 저장해놓고 한 번에 터트려 버리자
    for i in range(N):
        while stack and A[stack[-1]] < A[i]:
            result[stack.pop()] = A[i]
        stack.append(i)
    print(' '.join(map(str, result)))

if __name__ == "__main__":
    main()