import sys

def main() -> None:
    input = sys.stdin.readline

    N = int(input().strip())
    numbers = list(map(int, input().strip().split()))

    print(min(numbers), max(numbers))

if __name__ == "__main__":
    main()
