import sys
from collections import deque

def main() -> None:
    input = sys.stdin.readline

    N, T, W = map(int, input().strip().split())
    queue = deque()
    for _ in range(N):
        P, t = map(int, input().strip().split())
        queue.append((P, t))
    M = int(input().strip())
    late = []
    for _ in range(M):
        P, t, c = map(int, input().split())
        late.append((c, P, t))
    late.sort()

    j = 0
    current_time = 0
    result = []

    while current_time < W and (queue or j < M):
        if not queue:
            current_time = late[j][0]
            while j < M and late[j][0] <= current_time:
                queue.append((late[j][1], late[j][2]))
                j += 1
            continue

        P, t = queue.popleft()
        serve = min(t, T)

        result.extend([P] * min(serve, W - current_time))

        current_time += serve

        while j < M and late[j][0] <= current_time:
            queue.append((late[j][1], late[j][2]))
            j += 1

        if t > T:
            queue.append((P, t - T))

    print("\n".join(map(str, result)))

if __name__ == "__main__":
    main()
