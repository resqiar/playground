namespace exerciseDijk {
  class PQueue {
    constructor(public heap: { vertex: string; priority: number }[] = []) {}

    enqueue(value: { vertex: string; priority: number }) {
      this.heap.push(value);

      // BubbleUp
      this.bubbleUp(this.heap.length - 1);
    }

    dequeue() {
      const head = this.heap[0];
      const tail = this.heap.pop();

      if (!tail) return;

      if (this.heap.length !== 0) {
        this.heap[0] = tail;
        this.bubbleDown(0);
      }

      return head.vertex;
    }

    private bubbleUp(index: number) {
      const parentIdx = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIdx];

      if (!parent) return;

      const current = this.heap[index];

      if (current.priority < parent.priority) {
        this.heap[parentIdx] = current;
        this.heap[index] = parent;

        // Bubble Up
        this.bubbleUp(parentIdx);
      }
    }

    private bubbleDown(index: number) {
      const parent = this.heap[index];

      const childLeftIdx = 2 * index + 1;
      const childLeft = this.heap[childLeftIdx];

      const childRightIdx = 2 * index + 2;
      const childRight = this.heap[childRightIdx];

      if (!childLeft && !childRight) return;

      // If child left is less than parent
      // AND is less than its sibling (child childRight).
      if (
        childRight &&
        childLeft.priority < parent.priority &&
        childLeft.priority < childRight.priority
      ) {
        swapLeft(this);
      }

      // If child right is less than parent
      // AND is less than its sibling (child childLeft).
      else if (
        childRight &&
        childRight.priority < parent.priority &&
        childRight.priority < childLeft.priority
      ) {
        swapRight(this);
      }

      // Otherwise, if child left is less than parent.
      // WHY we only need to do this to child left?
      // because the rule of Binary Heap is to fill the childLeft first,
      // this rule prevent childLeft to be null while childRight present.
      else if (childLeft.priority < parent.priority) {
        swapLeft(this);
      }

      function swapLeft(ctx: PQueue) {
        ctx.heap[index] = childLeft;
        ctx.heap[childLeftIdx] = parent;

        // recursively bubbleDown
        ctx.bubbleDown(childLeftIdx);
      }

      function swapRight(ctx: PQueue) {
        ctx.heap[index] = childRight;
        ctx.heap[childRightIdx] = parent;

        // recursively bubbleDown
        ctx.bubbleDown(childRightIdx);
      }
    }
  }

  interface Edge {
    vtx: string;
    weight: number;
  }

  interface AdjList {
    [key: string]: Edge[];
  }

  class Graph {
    constructor(public list: AdjList = {}) {}

    addVertex(vtx: string) {
      if (!this.list[vtx]) this.list[vtx] = [];
    }

    addEdge(v1: string, v2: string, weight: number) {
      if (!this.list[v1] || !this.list[v2])
        throw new Error("Specified vertex does not exist");

      const e1: Edge = { vtx: v2, weight };
      const e2: Edge = { vtx: v1, weight };

      // Find index of vertex inside adj list
      const v1Index = this.list[v1].findIndex((v) => v.vtx === v2);
      const v2Index = this.list[v2].findIndex((v) => v.vtx === v1);

      if (v1Index === -1) {
        this.list[v1].push(e1);
      } else {
        this.list[v1][v1Index] = e1;
      }

      if (v2Index === -1) {
        this.list[v2].push(e2);
      } else {
        this.list[v2][v2Index] = e2;
      }
    }

    shortestPath(start: string, end: string) {
      // 1. Check if the vertices exist in the graph. If not, throw an error.
      if (!this.list[start] || !this.list[end])
        throw new Error("Specified vertex does not exist");

      // 2. Initialize a priority queue (Min Binary Heap) to store the vertices
      const pq = new PQueue();
      // 3. Create two objects "distance" and "from" to store the distance of each vertex...
      const distance: { [vtx: string]: number } = {};
      const from: { [vtx: string]: string | null } = {};

      // Set all initial state
      for (const key in this.list) {
        // 4. Define initial state of PQ and Distance Obj to Infinity,
        // except for the start vertex, which is set to 0...
        if (key === start) {
          distance[key] = 0;
          pq.enqueue({ vertex: key, priority: 0 });
        } else {
          distance[key] = Infinity;
          pq.enqueue({ vertex: key, priority: Infinity });
        }

        // ...Also define initial state for "from" obj to null.
        from[key] = null;
      }

      // 5. Loop as long as there is a value inside the queue
      while (pq.heap) {
        // 5.1 dequeue the next vertex from the priority...
        const dequeued = pq.dequeue();

        if (!dequeued) return;

        // ...if it's the end vertex. If it is, then construct
        // the path by tracing back the previous vertices from the end to the start.
        if (dequeued === end) {
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

        // 5.2 If the dequeued vertex is not the end vertex,
        // then loop through its adjacent vertices
        for (let i = 0; i < this.list[dequeued].length; i++) {
          // Current iterated vertex in adjacency list
          const current = this.list[dequeued][i];

          // ...calculate the new distance of each vertex.
          // distance of previous dequeued value + current vertex weight
          const calculated = distance[dequeued] + current.weight;

          // 5.3 If the calculated distance is less than the current distance
          // of the adjacent vertex...
          if (calculated < distance[current.vtx]) {
            // update it in the "distance" object, set the previous vertex
            // in the "from" object...
            distance[current.vtx] = calculated;
            from[current.vtx] = dequeued;

            // ...and enqueue the updated vertex in the priority queue with new priority.
            // should be optimized instead of enqueing a new result
            const updatedVtx = { vertex: current.vtx, priority: calculated };
            pq.enqueue(updatedVtx);
          }
        }
      }
    }
  }

  const g = new Graph();

  g.addVertex("SURABAYA");
  g.addVertex("JAKARTA");
  g.addVertex("BEKASI");
  g.addVertex("JOGJA");
  g.addVertex("SOLO");
  g.addVertex("SEMARANG");
  g.addVertex("MALANG");

  g.addEdge("JAKARTA", "SEMARANG", 200);
  g.addEdge("JAKARTA", "JOGJA", 450);
  g.addEdge("JAKARTA", "BEKASI", 30);

  g.addEdge("SEMARANG", "SURABAYA", 350);
  g.addEdge("SEMARANG", "SOLO", 70);

  g.addEdge("SOLO", "JOGJA", 20);
  g.addEdge("JOGJA", "MALANG", 150);

  g.addEdge("SURABAYA", "MALANG", 75);

  // RESULT SHOULD BE
  // ["JAKARTA", "SEMARANG", "SOLO", "JOGJA", "MALANG", "SURABAYA"]
  console.log(g.shortestPath("JAKARTA", "SURABAYA"));
}
