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

  extractMax() {
    const firstElem = this.value[0];
    const lastElem = this.value.pop();

    if (!lastElem) return;
    if (this.value.length !== 0) {
      this.value[0] = lastElem;

      bh.bubbleDown(0);
    }

    return firstElem;
  }

  bubbleDown(parentIdx: number) {
    const parent = this.value[parentIdx];

    // Left child calculation
    const childLeftIdx = 2 * parentIdx + 1;
    const childLeft = this.value[childLeftIdx];

    // Right child calculation
    const childRightIdx = 2 * parentIdx + 2;
    const childRight = this.value[childRightIdx];

    // If the there are no childs
    if (!childLeft && !childRight) return;

    // if the childLeft is bigger than childRight,
    // while also bigger than parent.
    if (childLeft > childRight && childLeft > parent) {
      swapLeft(this);
    }

    // if the childRight is bigger than childLeft,
    // while also bigger than parent.
    else if (childLeft < childRight && childRight > parent) {
      swapRight(this);
    }

    // if the childLeft is the same with childRight,
    // while also bigger than parent.
    else if (childRight > parent) {
      swapRight(this);
    }

    function swapLeft(ctx: MaxBHeap) {
      ctx.value[childLeftIdx] = parent;
      ctx.value[parentIdx] = childLeft;

      ctx.bubbleDown(childLeftIdx);
    }

    function swapRight(ctx: MaxBHeap) {
      ctx.value[childRightIdx] = parent;
      ctx.value[parentIdx] = childRight;

      ctx.bubbleDown(childRightIdx);
    }
  }
}

const bh = new MaxBHeap();
bh.push(20);
bh.push(1);
bh.push(6);
bh.push(6);
bh.push(2);
bh.push(7);
console.log(bh.value);
console.log(bh.extractMax());
console.log(bh.extractMax());
console.log(bh.extractMax());
console.log(bh.extractMax());
console.log(bh.extractMax());
console.log(bh.extractMax());
console.log(bh.extractMax());
console.log(bh.extractMax());
console.log(bh.value);
