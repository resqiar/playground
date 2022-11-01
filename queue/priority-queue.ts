class PQN {
  constructor(public value: string, public priority: number = 10) {}
}

class PQ {
  constructor(public values: PQN[] = []) {}

  bubbleUp(index: number) {
    const curr = this.values[index];
    const parentIdx = Math.floor((index - 1) / 2);
    const parent = this.values[parentIdx];

    if (!parent) return;
    if (curr.priority < parent.priority) {
      this.values[parentIdx] = curr;
      this.values[index] = parent;
      this.bubbleUp(parentIdx);
    }
  }

  bubbleDown(parentIdx: number) {
    const parent = this.values[parentIdx];

    // Left child calculation
    const childLeftIdx = 2 * parentIdx + 1;
    const childLeft = this.values[childLeftIdx];

    // Right child calculation
    const childRightIdx = 2 * parentIdx + 2;
    const childRight = this.values[childRightIdx];

    if (childLeft && childLeft.priority < parent.priority) {
      swapLeft(this);
    } else if (childRight && childRight.priority < parent.priority) {
      swapRight(this);
    }

    function swapLeft(ctx: PQ) {
      ctx.values[childLeftIdx] = parent;
      ctx.values[parentIdx] = childLeft;

      ctx.bubbleDown(childLeftIdx);
    }

    function swapRight(ctx: PQ) {
      ctx.values[childRightIdx] = parent;
      ctx.values[parentIdx] = childRight;

      ctx.bubbleDown(childRightIdx);
    }
  }

  enqueue(node: PQN) {
    this.values.push(node);
    this.bubbleUp(this.values.length - 1);
  }

  dequeue() {
    const firstElem = this.values[0];
    const lastElem = this.values.pop();

    if (!lastElem) return;
    if (this.values.length !== 0) {
      this.values[0] = lastElem;
      this.bubbleDown(0);
    }

    return firstElem;
  }
}

const newPQ = new PQ();

newPQ.enqueue(new PQN("FirstCar"));
newPQ.enqueue(new PQN("Ambulance", 3));
newPQ.enqueue(new PQN("SecondCar"));

console.log(newPQ.values);
console.log(newPQ.dequeue());
console.log(newPQ.values);
newPQ.enqueue(new PQN("FireFighter", 2));
console.log(newPQ.dequeue());
console.log(newPQ.dequeue());
console.log(newPQ.dequeue());
