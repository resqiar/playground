// Time complexity of the algo is O(N)
// Space complexity is constant O(1)
function sumZero(sortedArray: number[]): number[] | undefined {
  let left: number = 0;
  let right: number = sortedArray.length - 1;

  // while left side of an array not meet
  // the right side yet, do calculations.
  while (left < right) {
    let sum: number = sortedArray[left] + sortedArray[right];

    // If the sum is equal to zero
    // meaning the left side is match with right side,
    // e.g left = -3 + right = 3 === 0
    if (sum === 0) return [sortedArray[left], sortedArray[right]];
    // if the sum is more than zero,
    // reduce the right side and continue the loop.
    if (sum > 0) {
      right--;
      continue;
    }
    // otherwise if the sum is less than zero,
    // add +1 to the left side,
    left++;
  }
}

// NOTE: input parameter must be sorted
const a: number[] = [-4, -3, 1, 0, 2, 3, 5]; // [-3, 3]
const b: number[] = [-4, -2, 1, 0, 2, 3, 5]; // [-2, 2]
const c: number[] = [-4, -1, 1, 0, 2, 3, 5]; // undefined

console.log(sumZero(a));
console.log(sumZero(b));
console.log(sumZero(c));
