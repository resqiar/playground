namespace mergeSort {
  function sort(arr: number[]) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);

    const sortLeft: number[] = sort(arr.slice(0, mid));
    const sortRight: number[] = sort(arr.slice(mid));

    return merge(sortLeft, sortRight);
  }

  console.log(sort([2, 5, 6, 1, 8]));

  function merge(firstArr: number[], secondArr: number[]) {
    const result = [];

    let firstPointer = 0;
    let secondPointer = 0;

    while (firstPointer < firstArr.length) {
      if (secondArr[secondPointer] < firstArr[firstPointer]) {
        result.push(secondArr[secondPointer]);
        secondPointer++;
      } else {
        result.push(firstArr[firstPointer]);
        firstPointer++;
      }
    }

    while (secondPointer < secondArr.length) {
      result.push(secondArr[secondPointer]);
      secondPointer++;
    }

    return result;
  }

  console.log(merge([1, 10, 50], [2, 14, 99, 100]));
  console.log(merge([], [2, 14, 99, 100]));
}
