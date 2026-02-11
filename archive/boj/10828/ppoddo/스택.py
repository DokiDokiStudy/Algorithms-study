import sys

def main() -> None:
    input = sys.stdin.readline

    N = int(input().strip()) # 명령 수
    stack = []
    
    for _ in range(N):
        command = input().strip().split()
        if command[0] == "push":
            stack.append(int(command[1]))
        elif command[0] == "pop":
            if stack:
                print(stack.pop())
            else:
                print(-1)
        elif command[0] == "size":
            print(len(stack))
        elif command[0] == "empty":
            if stack:
                print(0)
            else:
                print(1)
        elif command[0] == "top":
            if stack:
                print(stack[-1])
            else:
                print(-1)
if __name__ == "__main__":
    main()
