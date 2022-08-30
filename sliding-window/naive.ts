function maxSubArraySumNaive(arr: number[], n: number) {
  // edge case if the array length is less than n
  if (arr.length < n) return null;

  // declare current max sub array
  let current = 0;

  // loop throughout all the array values
  for (let i = 0; i < arr.length - n + 1; i++) {
    // reset temporary value to 0 whenever -
    // second nested loop finish looping.
    let temp = 0;

    // second nested loop.
    // the purpose is to sum the value
    // between parent loop (i) and child loop (j)
    for (let j = 0; j < n; j++) {
      temp += arr[i + j];
    }

    // if the temporary value is greater than current,
    // update the current value.
    if (temp > current) {
      current = temp;
    }
  }

  return current;
}

let ex = [1, 2, 5, 2, 8, 1, 5];
let ex2 = [4, 2, 1, 6];
let ex3 = [4, 2, 1, 6, 2];

console.log(maxSubArraySumNaive(ex, 2));
console.log(maxSubArraySumNaive(ex, 4));
console.log(maxSubArraySumNaive(ex2, 1));
console.log(maxSubArraySumNaive(ex3, 4));
console.log(maxSubArraySumNaive([], 4));
