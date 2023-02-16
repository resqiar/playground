namespace insertionSort {
  function insertion(arr: number[]) {
    for (let outerIdx = 1; outerIdx < arr.length; outerIdx++) {
      let tempIdx = outerIdx;

      for (
        let innerIdx = tempIdx - 1;
        innerIdx >= 0 && arr[innerIdx] > arr[tempIdx];
        innerIdx--
      ) {
        const inner = arr[innerIdx];

        if (inner > arr[tempIdx]) {
          swap(innerIdx, tempIdx);
          tempIdx = innerIdx;
        }
      }
    }

    function swap(firstIdx: number, secondIdx: number) {
      const temp = arr[firstIdx];
      arr[firstIdx] = arr[secondIdx];
      arr[secondIdx] = temp;
    }

    return arr;
  }

  const a = [8, 5, 2, 4, 6, 9, 11, 0, 1];
  console.log(insertion(a));
}
