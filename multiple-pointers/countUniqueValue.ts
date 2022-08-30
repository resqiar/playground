function countUniqueValue(input: number[]) {
  // if the length is 0, immediately return 0
  if (!input.length) return 0;

  let firstPointer: number = 0;
  let secondPointer: number = 1;

  while (secondPointer < input.length) {
    const firstValue = input[firstPointer];
    const secondValue = input[secondPointer];

    // if value is the same, add one
    // to the second pointer to check the
    // next value, and continue the loop.
    if (firstValue === secondValue) {
      secondPointer++;
      continue;
    }

    // If the value is not the same (meaning we find another unique num)
    // first move the firstPointer one step, then update
    // that location based on firstPointer index with the current
    // unique value from secondPointer.
    firstPointer++;
    input[firstPointer] = input[secondPointer];

    // move again the secondPointer
    secondPointer++;
  }

  return (firstPointer += 1);
}

const inputA: number[] = [1, 1, 1, 2, 3, 3, 4, 4, 5, 6]; // 6
const inputB: number[] = [1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]; // 7
const inputC: number[] = []; // 0
const inputD: number[] = [-2, -1, -1, 0, 1]; // 4

console.log(countUniqueValue(inputA));
console.log(countUniqueValue(inputB));
console.log(countUniqueValue(inputC));
console.log(countUniqueValue(inputD));
