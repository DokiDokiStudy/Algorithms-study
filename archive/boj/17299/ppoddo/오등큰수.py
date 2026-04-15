import sys

def main() -> None:
    input = sys.stdin.readline

    N = int(input().strip())
    A = list(map(int, input().strip().split()))
    result = [-1] * N
    stack = []

    # 빈도수를 저장
    F = {}
    for x in A:
        F[x] = F.get(x, 0) + 1

    for i in range(N):
        while stack and F[A[stack[-1]]] < F[A[i]]:
            result[stack.pop()] = A[i]
        stack.append(i)
            
    print(' '.join(map(str, result)))
   
if __name__ == "__main__":
    main()
