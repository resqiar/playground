function twoSum(nums: number[], target: number): number[] {
  let result: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current: number = nums[i];
    const complement: number = target - current;
    const exist: number | undefined = result.get(complement);

    // if the complement exist inside the hashmap
    if (exist !== undefined) return [exist, i];

    // else, save the current inside
    result.set(current, i);
  }

  return [];
}

const nums = [2, 7, 11, 15, 20, 21, 0, 8, 6, 12, 77, 99, 23, 1];
const target = 8;

// const nums = [10, 2, 3, 9];
// const target = 5;

console.time("time");
console.log(twoSum(nums, target));
console.timeEnd("time");
