function solution(nums) {
  const numSet = new Set();

  for (const num of nums) {
    numSet.add(num);
  }

  return Math.min(numSet.size, nums.length / 2);
}
