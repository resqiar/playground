class MaxBHeap {
  constructor(public value: number[] = []) {}

  bubble(index: number) {
    const parentIndex = Math.floor((index - 1) / 2);

    const curr = this.value[index];
    const parent = this.value[parentIndex];

    if (!parent) return;
    if (parent > curr) return;
    // swap parent and curr
    this.value[index] = parent;
    this.value[parentIndex] = curr;
    // call this function recursively with parentIndex
    this.bubble(parentIndex);
  }

  push(n: number) {
    this.value.push(n);
    this.bubble(this.value.length - 1);
  }
}

const bh = new MaxBHeap();
bh.push(20);
bh.push(1);
bh.push(5);
bh.push(6);
console.log(bh.value);
