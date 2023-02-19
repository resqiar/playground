namespace quickSort {
  function sort(
    arr: number[],
    startIdx: number = 0,
    endIdx: number = arr.length - 1
  ) {
    if (startIdx < endIdx) {
      const mid = pivot(arr, startIdx, endIdx);
      // sort left side
      sort(arr, startIdx, mid);
      // sort right side
      sort(arr, mid + 1, endIdx);
    }

    return arr;
  }

  function pivot(arr: number[], startIdx: number, endIdx: number) {
    let captainIdx = startIdx;
    let scouterIdx = captainIdx + 1;
    let lessIdx = startIdx;

    while (scouterIdx <= endIdx) {
      if (arr[scouterIdx] < arr[captainIdx]) {
        lessIdx++;
        swap(lessIdx, scouterIdx);
      }

      scouterIdx++;
    }

    swap(lessIdx, captainIdx);

    function swap(firstIdx: number, secondIdx: number) {
      const temp = arr[firstIdx];
      arr[firstIdx] = arr[secondIdx];
      arr[secondIdx] = temp;
    }

    return lessIdx;
  }

  const e = [4, 8, 2, 1, 5, 7, 6, 3];
  sort(e);
  console.log(e);
}
