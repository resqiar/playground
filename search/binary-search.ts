function binarySearch(arr: number[], target: number) {
  if (!arr.length) return -1;

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.round((left + right) / 2);

    if (arr[middle] === target) return middle;
    else if (arr[middle] < target) left = middle + 1;
    else if (arr[middle] > target) right = middle - 1;
  }

  return -1;
}

console.log(binarySearch([-20, -10, -2, 1, 3, 6, 7, 9, 10, 13, 20], -20)); // 0
console.log(binarySearch([1, 3, 6, 7, 9, 10, 13, 20], 20)); // 7
console.log(binarySearch([1, 3, 6, 7, 9, 10, 13, 20], 1)); // 0
console.log(binarySearch([1, 3, 6, 7, 9, 10, 13, 20], 10)); // 5
console.log(binarySearch([1, 3, 6, 7, 9, 10, 13, 20], 50)); // -1
