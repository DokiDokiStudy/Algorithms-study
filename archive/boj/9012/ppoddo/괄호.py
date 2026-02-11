import sys
 
def main() -> None:
    input = sys.stdin.readline
    
    T = int(input().strip())
    for _ in range(T):
        ps = input().strip()

        if ps.count('(') != ps.count(')'):
            print("NO")
            continue
        
        # 짝이 보장되었다면 형태 검사
        stack = []
        is_vps = True
        
        for char in ps:
            if char == '(':
                stack.append(char)
            elif char == ')':
                if stack:
                    stack.pop()
                else:
                    is_vps = False
                    break
        
        if stack:
            is_vps = False
        
        print("YES" if is_vps else "NO")
if __name__ == "__main__":
    main()
