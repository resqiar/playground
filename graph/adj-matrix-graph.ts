namespace matrix {
  class PriorityQueue {
    constructor(public heap: { vtx: string; priority: number }[] = []) {}

    enqueue(vtx: string, priority: number) {
      this.heap.push({ vtx, priority });

      // Bubble Up
      this.bubbleUp(this.heap.length - 1);
    }

    dequeue() {
      // save the first and last element of the array
      const dequeued = this.heap[0];
      const lastElem = this.heap.pop();

      if (!lastElem) return;

      // swap the last index of the heap array to
      // the first index
      if (this.heap.length !== 0) {
        this.heap[0] = lastElem;

        // bubble down the first index
        this.bubbleDown(0);
      }

      return dequeued;
    }

    bubbleUp(idx: number) {
      const parentIdx = Math.floor((idx - 1) / 2);

      const parent = this.heap[parentIdx];
      const current = this.heap[idx];

      if (!parent) return;

      if (current.priority < parent.priority) {
        this.heap[parentIdx] = current;
        this.heap[idx] = parent;
        this.bubbleUp(parentIdx);
      }
    }

    bubbleDown(idx: number) {
      const parent = this.heap[idx];

      const leftChildIdx = 2 * idx + 1;
      const leftChild = this.heap[leftChildIdx];

      const rightChildIdx = 2 * idx + 2;
      const rightChild = this.heap[rightChildIdx];

      // if there is no children of the current parent
      if (!leftChild && !rightChild) return;

      if (
        rightChild &&
        leftChild.priority < parent.priority &&
        leftChild.priority < rightChild.priority
      ) {
        swapLeft(this);
      } else if (
        rightChild &&
        rightChild.priority < parent.priority &&
        rightChild.priority < leftChild.priority
      ) {
        swapRight(this);
      } else if (leftChild.priority < parent.priority) {
        swapLeft(this);
      }

      function swapLeft(ctx: PriorityQueue) {
        ctx.heap[idx] = leftChild;
        ctx.heap[leftChildIdx] = parent;
        ctx.bubbleDown(leftChildIdx);
      }

      function swapRight(ctx: PriorityQueue) {
        ctx.heap[idx] = rightChild;
        ctx.heap[rightChildIdx] = parent;
        ctx.bubbleDown(rightChildIdx);
      }
    }
  }

  interface Edge {
    weight: number;
  }

  class Graph {
    constructor(
      public vertices: string[] = [],
      public matrix: Edge[][] | number[][] = [],
      public indices: { [key: string]: number } = {}
    ) {}

    addVertex(vtx: string) {
      // push to vertices
      this.vertices.push(vtx);

      // push vertex index to indices
      this.indices[vtx] = this.vertices.length - 1;

      // Push a new vertex as column in matrix
      this.matrix.push(Array(this.vertices.length).fill(0));

      // Loop through vertices and update matrix columns
      for (let i = 0; i < this.vertices.length; i++) {
        this.matrix[i][this.vertices.length - 1] = 0;
      }
    }

    addEdge(v1: string, v2: string, weight: number) {
      // get target indices from hashmap
      const v1Idx = this.indices[v1];
      const v2Idx = this.indices[v2];

      // update undirected graph's edges
      this.matrix[v1Idx][v2Idx] = { weight };
      this.matrix[v2Idx][v1Idx] = { weight };
    }
  }

  const g = new Graph();

  g.addVertex("SBY");
  g.addVertex("JKT");

  g.addEdge("SBY", "JKT", 2);

  g.addVertex("BKS");

  console.log("======= V E R T I C E S =======");
  console.log(g.vertices);

  console.log("======= M A R T I X =======");
  console.log(g.matrix);

  console.log("======= I N D I C E S =======");
  console.log(g.indices);

  const pq = new PriorityQueue();
  console.log(pq.enqueue("SBY", 5));
  console.log(pq.enqueue("JKT", 2));
  console.log(pq.enqueue("BKS", 3));
  console.log(pq.enqueue("MLG", 7));
  console.log(pq.enqueue("BWN", 1));

  console.log(pq.heap);

  while (pq.heap.length) {
    console.log(pq.dequeue());
  }
}
