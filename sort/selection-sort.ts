namespace selectionSort {
  function selection(arr: number[]) {
    for (let outerIdx = 0; outerIdx < arr.length; outerIdx++) {
      const current = arr[outerIdx];
      let minIdx = outerIdx;

      for (let innerIdx = outerIdx + 1; innerIdx < arr.length; innerIdx++) {
        const inner = arr[innerIdx];

        if (Math.min(inner, arr[minIdx]) === inner) {
          minIdx = innerIdx;
        }
      }

      if (arr[minIdx] !== current) {
        swap(outerIdx, minIdx);
      }
    }

    function swap(firstIdx: number, secondIdx: number) {
      const temp = arr[firstIdx];
      arr[firstIdx] = arr[secondIdx];
      arr[secondIdx] = temp;
    }

    return arr;
  }

  const a = [8, 5, 2, 4, 9, 12, 0, 1, 50, 32];
  console.log(selection(a));
}
