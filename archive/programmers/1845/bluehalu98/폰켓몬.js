function solution(nums) {
    const a = new Set(nums);
    return a.size > nums.length / 2 ? nums.length / 2 : a.size;
}