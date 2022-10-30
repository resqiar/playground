class QNode {
  constructor(
    public bst: BSTNode | null = null,
    public next: QNode | null = null,
    public prev: QNode | null = null
  ) {}
}

class BSTQueue {
  constructor(
    private front: QNode | null = null,
    private rear: QNode | null = null,
    public length: number = 0
  ) {}

  enqueue(value: BSTNode): BSTNode {
    const newNode = new QNode();
    newNode.bst = value;

    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
      this.length++;
      return newNode.bst;
    }

    const temp = this.rear;
    temp!.next = newNode;
    this.rear = newNode;
    newNode.prev = temp;
    this.length++;
    return newNode.bst;
  }

  dequeue(): BSTNode | null {
    if (!this.front) return null;

    const temp = this.front;

    if (this.length === 1) {
      this.front = null;
      this.rear = null;
      this.length--;
      return temp.bst;
    }

    this.front = temp.next;
    this.front!.prev = null;
    this.length--;
    return temp.bst;
  }
}

class BSTNode {
  constructor(
    public value: number | null = null,
    public left: BSTNode | null = null,
    public right: BSTNode | null = null,
    public freq: number = 1
  ) {}
}

class BST {
  constructor(public root: BSTNode | null = null) {}

  insert(value: number): void {
    const newNode = new BSTNode();
    newNode.value = value;

    // Define a copy of the current root
    let ref = this.root;

    // If there is no main root, set the new node as
    // a root of the tree.
    if (!ref) {
      this.root = newNode;
      return;
    }

    while (ref && ref.value) {
      // If the value is bigger than current root ref
      if (value > ref.value) {
        if (ref.right) {
          ref = ref.right;
          continue;
        }
        ref.right = newNode;
        break;
      }

      // If the value is smaller than current root ref
      else if (value < ref.value) {
        if (ref.left) {
          ref = ref.left;
          continue;
        }
        ref.left = newNode;
        break;
      }

      // Increment the freq of the node by 1
      else if (ref.value === value) {
        ref.freq++;
        return;
      }

      // else just break
      else break;
    }
  }

  traverseLeft(): void {
    if (!this.root) return;

    let ref = this.root;

    while (ref && ref.value) {
      console.log(ref.value);

      if (ref.left) {
        ref = ref.left;
      } else {
        break;
      }
    }
  }

  search(value: number): BSTNode | null {
    if (!this.root) return null;
    let ref = this.root;

    while (ref && ref.value) {
      if (value === ref.value) {
        return ref;
      } else if (value > ref.value) {
        if (ref.right) {
          ref = ref.right;
          continue;
        }
        break;
      } else if (value < ref.value) {
        if (ref.left) {
          ref = ref.left;
          continue;
        }
        break;
      }
    }

    return null;
  }

  BFS() {
    if (!this.root) return;
    // This array will be the result
    // after traversing the tree.
    const result = [];
    // Create new Queue
    const q = new BSTQueue();

    // Set initial value of current as this root
    let current: BSTNode | null = this.root;

    // Push the current root into the queue
    q.enqueue(current);

    // While there is a value inside the queue, iterate
    // TAKE A NOTE HERE THAT THE ITERATIONS HERE
    // HAS A CHANCE FOR DUPLICATES, SO IT WILL NOT EXACTLY
    // ITERATES THROUGH ALL YOUR INPUT THAT BASED ON RANDOMIZATION.
    while (q.length) {
      // set current pointer as the one that has been dequeued
      current = q.dequeue();
      // then push the dequeued value to the array
      result.push(current?.value);
      // Check if current value (BSTNode) has left,
      // If it has a left, push that left node into the queue
      if (current?.left) q.enqueue(current.left);
      // Check if current value (BSTNode) has right,
      // If it has a left, push that right node into the queue
      if (current?.right) q.enqueue(current.right);
    }

    // finally return the result
    return result;
  }

  DFS() {
    if (!this.root) return;

    // This array will be the result
    // after traversing the tree.
    const result: number[] = [];

    function preOrd(node: BSTNode) {
      if (!node.value) return;
      // push the value to the result
      result.push(node.value);
      // recursively search left and right node,
      // the invocation of the recursion will happen
      // on the left side first until the end of the nodes (reaches a leaf),
      // then back to the top and do the same with right nodes.
      if (node.left) preOrd(node.left);
      if (node.right) preOrd(node.right);
    }

    function postOrd(node: BSTNode) {
      if (!node.value) return;
      // recursively search left and right node,
      // the invocation of the recursion will happen
      // on the left side first until the end of the nodes (reaches a leaf),
      // then back to the top and do the same with right nodes.
      if (node.left) postOrd(node.left);
      if (node.right) postOrd(node.right);
      // push the value to the result
      result.push(node.value);
    }

    function inOrd(node: BSTNode) {
      if (!node.value) return;
      // recursively search left and right node,
      // the invocation of the recursion will happen
      // on the left side first until the end of the nodes (reaches a leaf),
      // then back to the top and do the same with right nodes.
      if (node.left) inOrd(node.left);
      // push the value to the result
      result.push(node.value);
      if (node.right) inOrd(node.right);
    }

    // invoke from the root
    // preOrd(this.root);
    // postOrd(this.root);
    inOrd(this.root);
    return result;
  }
}

const q = new BSTQueue();

console.log("========= E N Q U E U I N G ============");

for (let i = 0; i < 5; i++) {
  const node = new BSTNode();
  node.value = i;

  console.log(q.enqueue(node));
}

console.log("========= D E Q U E U I N G ============");

for (let i = 0; i < 5; i++) {
  console.log(q.dequeue());
}

console.log("========= B S T ============");

const newBst = new BST();

// let start = performance.now();
// for (let i = 0; i < 10_000; i++) {
//   newBst.insert(i + 2);
// }
// let end = performance.now();
// console.log("LINEAR INSERT TOOK", (end - start) / 1000, "s");

// let start = performance.now();
// for (let i = 0; i < 100_000; i++) {
//   const rand = Math.floor(Math.random() * 100_000);
//   newBst.insert(rand);
// }
// let end = performance.now();
// console.log("BINARY INSERT TOOK", (end - start) / 1000, "s");

// start = performance.now();
// const res = newBst.search(69);
// end = performance.now();

// console.log(res);
// console.log("SEARCH TOOK", end - start, "ms");

// console.log(newBst.BFS());

newBst.insert(20);
newBst.insert(17);
newBst.insert(8);
newBst.insert(18);
newBst.insert(19);

newBst.insert(26);
newBst.insert(25);
newBst.insert(30);

console.log(newBst.DFS());
