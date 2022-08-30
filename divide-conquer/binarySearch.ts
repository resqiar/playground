function binarySearch(arr: number[], n: number) {
  // define the minimum pointer
  let min = 0;

  // define the maximum pointer
  let max = arr.length - 1;

  while (min <= max) {
    // define the middle point from the current threshold
    // between the minimum pointer and the maximum pointer.
    let mid = Math.floor((min + max) / 2);

    // if the middle value is higher than the n,
    // set the max value to the left part.
    if (arr[mid] > n) {
      max = mid - 1;
    }

    // if the middle value is lower than the n,
    // set the min value to the right part.
    else if (arr[mid] < n) {
      min = mid + 1;
    }

    // if the middle value is the same, than that's
    // the value we looking for. return min.
    else {
      return min;
    }
  }

  // no value is available, return -1.
  return -1;
}

console.log(binarySearch([1, 4, 6, 7, 10], 7)); // 3
console.log(binarySearch([1, 4, 6, 7, 10], 10)); // 4
console.log(binarySearch([1, 4, 6, 7, 10], 100)); // -1
