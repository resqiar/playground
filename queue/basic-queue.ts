class QueueNode {
  constructor(public value: number, public next: QueueNode | null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  head: QueueNode | null;
  tail: QueueNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value: number) {
    const newNode = new QueueNode(value, null);

    if (!this.length || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    const currentTail = this.tail;

    currentTail.next = newNode;
    this.tail = newNode;
    this.length++;

    return newNode;
  }

  dequeue() {
    if (!this.length) return;
    if (this.length === 1) {
      const current = this.head;

      this.head = null;
      this.tail = null;
      this.length--;

      return current;
    }

    const currentHead = this.head;

    this.head = currentHead!.next;
    this.length--;

    return currentHead;
  }

  traverse() {
    if (!this.head) return;

    const res = [];

    let current = this.head;

    while (current) {
      res.push(current.value);
      current = current.next as QueueNode;
    }

    return res;
  }
}

const qw = new Queue();

for (let i = 1; i <= 5; i++) {
  console.log("<++++ ENQUEUE", qw.enqueue(i));
}

for (let i = 1; i <= 10; i++) {
  console.log("<---- DEQUEUE", qw.dequeue()?.value);
}
