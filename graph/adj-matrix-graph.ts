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
    vtx: string;
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
      this.matrix[v1Idx][v2Idx] = { vtx: v2, weight };
      this.matrix[v2Idx][v1Idx] = { vtx: v1, weight };
    }

    shortestPath(start: string, end: string) {
      if (!this.indices[start] && !this.indices[end])
        throw new Error("vertices not found");

      const pq = new PriorityQueue();
      const distance: { [vtx: string]: number } = {};
      const from: { [vtx: string]: string | null } = {};

      // set initial value
      for (let i = 0; i < this.vertices.length; i++) {
        if (this.vertices[i] === start) {
          pq.enqueue(this.vertices[i], 0);
          distance[this.vertices[i]] = 0;
        } else {
          pq.enqueue(this.vertices[i], Infinity);
          distance[this.vertices[i]] = Infinity;
        }

        from[this.vertices[i]] = null;
      }

      while (pq.heap.length) {
        const dequeued = pq.dequeue();

        if (!dequeued) return;

        // ...if it's the end vertex. If it is, then construct
        // the path by tracing back the previous vertices from the end to the start.
        if (dequeued.vtx === end) {
          const result = [end];

          let temp = end;

          // Trace back (Backtracking) the from value until
          // it found the starting vertex.
          while (true) {
            if (temp === start) break;

            const current = from[temp];
            if (!current) break;

            result.push(current);
            temp = current;
          }

          return result.reverse();
        }

        const temp = this.matrix[this.indices[dequeued.vtx]];

        // loop current rows
        for (let i = 0; i < temp.length; i++) {
          if (typeof temp[i] === "object") {
            const current = temp[i] as Edge;
            // ...calculate the new distance of each vertex.
            // distance of previous dequeued value + current vertex weight
            const calculated = distance[dequeued.vtx] + current.weight;

            // 5.3 If the calculated distance is less than the current distance
            // of the adjacent vertex...
            if (calculated < distance[current.vtx]) {
              // update it in the "distance" object, set the previous vertex
              // in the "from" object...
              distance[current.vtx] = calculated;
              from[current.vtx] = dequeued.vtx;

              // ...and enqueue the updated vertex in the priority queue with new priority.
              // should be optimized instead of enqueing a new result
              pq.enqueue(current.vtx, calculated);
            }
          }
        }
      }
    }
  }

  const g = new Graph();

  g.addVertex("SBY");
  g.addVertex("JKT");
  g.addVertex("BKS");
  g.addVertex("YGY");
  g.addVertex("SOLO");
  g.addVertex("SMG");
  g.addVertex("MLG");

  g.addEdge("JKT", "SMG", 200);
  g.addEdge("JKT", "YGY", 450);
  g.addEdge("JKT", "BKS", 30);

  g.addEdge("SMG", "SBY", 350);
  g.addEdge("SMG", "SOLO", 70);

  g.addEdge("SOLO", "YGY", 20);
  g.addEdge("YGY", "MLG", 150);

  g.addEdge("SBY", "MLG", 75);

  // RESULT SHOULD BE
  // ["JKT", "SMG", "SOLO", "YGY", "MLG", "SBY"]
  console.log(g.shortestPath("JKT", "SBY"));

  // console.log("======= V E R T I C E S =======");
  // console.log(g.vertices);

  // console.log("======= M A R T I X =======");
  // console.log(g.matrix);

  // console.log("======= I N D I C E S =======");
  // console.log(g.indices);
}
