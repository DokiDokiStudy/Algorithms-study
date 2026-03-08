def solution(nums):
    # 중복제거한 후 종류 수 VS 내가 가져갈 수 있는 수
    return min(len(set(nums)), len(nums) // 2)