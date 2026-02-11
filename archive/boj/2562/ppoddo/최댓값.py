import sys

def main() -> None:
    input = sys.stdin.readline
    nums =[int(sys.stdin.readline().strip()) for _ in range(9)]
    max_value = max(nums)
    idx = nums.index(max_value) + 1 # index + 1
    print(max_value)
    print(idx)

if __name__ == "__main__":
    main()
