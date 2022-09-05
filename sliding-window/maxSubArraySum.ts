function maxSubArraySum(arr: number[], n: number) {
  // edge case if the array length is less than n
  if (arr.length < n) return null;

  // declare current max sub array
  let current = 0;

  // first step we loop through the first n,
  // and get the sum of all the number inside that threshold.
  for (let i = 0; i < n; i++) {
    current += arr[i];
  }

  // declare temporary variable to do arithmatic
  // NOTE: IMPORTANT TO SET THE DEFAULT TO CURRENT VALUE NOT 0
  let temp = current;

  // second we loop through the rest number after the first n
  for (let j = n; j < arr.length; j++) {
    // compute the current value - value before + value after
    temp = temp - arr[j - n] + arr[j];

    // if the temporary value is greater that current -
    // max sub array, update the current value.
    if (temp > current) {
      current = temp;
    }
  }

  // return back
  return current;
}

console.log(maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log(maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 4)); // 17
console.log(maxSubArraySum([], 4)); // null
console.log(maxSubArraySum([-3, 4, 0, -2, 6, -1], 2)); // 5
