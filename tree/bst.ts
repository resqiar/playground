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

  insert(value: number) {
    const newNode = new BSTNode();
    newNode.value = value;

    // Define a copy of the current root
    let ref = this.root;

    // If there is no main root, set the new node as
    // a root of the tree.
    if (!ref) {
      return (this.root = newNode);
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
        return ref.freq++;
      }

      // else just break
      else break;
    }
  }

  traverseLeft() {
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
}

const newBst = new BST();

let start = performance.now();
for (let i = 0; i < 1_000; i++) {
  newBst.insert(i + 2);
}
let end = performance.now();
console.log("LINEAR INSERT TOOK", (end - start) / 1000, "s");

start = performance.now();
for (let i = 0; i < 1_000; i++) {
  const rand = Math.floor(Math.random() * 1000);
  newBst.insert(rand);
}
end = performance.now();
console.log("BINARY INSERT TOOK", (end - start) / 1000, "s");

start = performance.now();
const res = newBst.search(69);
end = performance.now();

console.log(res);
console.log("SEARCH TOOK", end - start, "ms");
