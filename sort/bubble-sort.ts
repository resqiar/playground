namespace bsort {
  function bubbleSort(arr: number[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        const current = arr[j];
        const next = arr[j + 1];

        if (current > next) {
          swap(j, j + 1);
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

  const a = [12, 6, 8, 1, 9, 15];
  const b = [2, 3, 99, 15, 0, 88, 45, 1];
  console.log(bubbleSort(a));
  console.log(bubbleSort(b));
}
