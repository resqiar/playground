namespace dijkstra {
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

  class DGraph {
    adjacencyList: { [vertex: string]: { vertex: string; weight: number }[] } =
      {};

    addVertex(vertex: string) {
      // If the vertex does not exist, set to empty array, otherwise, do nothing
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1: string, v2: string, weight: number) {
      if (!this.adjacencyList[v1] || !this.adjacencyList[v2])
        throw new Error("Invalid vertex, vertex not exist");

      const objV1 = { vertex: v2, weight: weight };
      const objV2 = { vertex: v1, weight: weight };

      const indexV1 = this.adjacencyList[v1].findIndex((v) => v.vertex === v2);
      const indexV2 = this.adjacencyList[v2].findIndex((v) => v.vertex === v1);

      /**
       * This is a method for undirected graph,
       * meaning that both direction must be set the connection.
       * If we want to do directed graph, we only need to bind once,
       * so the order of the parameter matters.
       **/
      if (indexV1 === -1) {
        this.adjacencyList[v1].push(objV1);
      } else {
        this.adjacencyList[v1][indexV1] = objV1;
      }

      if (indexV2 === -1) {
        this.adjacencyList[v2].push(objV2);
      } else {
        this.adjacencyList[v2][indexV2] = objV2;
      }
    }

    shortest(start: string, end: string) {
      const pq = new PQueue();

      const distance: { [vertex: string]: number } = {};
      const prev: { [vertex: string]: string | null } = {};

      // Initial State
      for (const vtx in this.adjacencyList) {
        if (vtx === start) {
          distance[vtx] = 0;
          pq.enqueue({ vertex: vtx, priority: 0 });
        } else {
          distance[vtx] = Infinity;
          pq.enqueue({ vertex: vtx, priority: Infinity });
        }

        prev[vtx] = null;
      }

      while (pq.heap.length) {
        const dequeued = pq.dequeue();

        if (!dequeued) return;
        if (dequeued === end) {
          // Array to hold the result
          let result = [end];

          // temporary variable with the initial value of end
          let temp = end;

          // Trace back the prev value until
          // it found the start vertex
          while (true) {
            if (temp === start) break;

            const current = prev[temp];
            if (!current) break;

            result.push(current);

            temp = current;
          }

          return result.reverse();
        }

        for (let i = 0; i < this.adjacencyList[dequeued].length; i++) {
          // Current iterated vertex in adjacency list
          const current = this.adjacencyList[dequeued][i];

          // distance of previous dequeued value + current vertex weight
          const calculated = distance[dequeued] + current.weight;

          if (calculated < distance[current.vertex]) {
            // update the distance inside the obj
            distance[current.vertex] = calculated;
            // update the previous "FROM" obj to the previous dequeued vertex
            prev[current.vertex] = dequeued;
            // enqueue a new value containing current vertex with new calculated weight (priority)
            // PERFORMANCE IMPROVEMENT: Instead of enqueuing a new value, why not just update the priority?
            pq.enqueue({ vertex: current.vertex, priority: calculated });
          }
        }
      }
    }
  }

  const dijkGraph = new DGraph();

  // dijkGraph.addVertex("SURABAYA");
  // dijkGraph.addVertex("JAKARTA");
  // dijkGraph.addVertex("BEKASI");
  // dijkGraph.addVertex("JOGJA");
  // dijkGraph.addVertex("SOLO");
  // dijkGraph.addVertex("SEMARANG");
  // dijkGraph.addVertex("MALANG");

  // dijkGraph.addVertex("A");
  // dijkGraph.addVertex("B");
  // dijkGraph.addVertex("C");
  // dijkGraph.addVertex("D");
  // dijkGraph.addVertex("E");
  // dijkGraph.addVertex("F");

  // dijkGraph.addEdge("A", "B", 2);
  // dijkGraph.addEdge("A", "C", 3);
  // dijkGraph.addEdge("B", "D", 1);
  // dijkGraph.addEdge("B", "F", 5);
  // dijkGraph.addEdge("C", "D", 1);
  // dijkGraph.addEdge("D", "E", 2);
  // dijkGraph.addEdge("E", "F", 1);

  // console.log(dijkGraph.adjacencyList);
  // console.log(dijkGraph.shortest("A", "F"));

  dijkGraph.addVertex("SURABAYA");
  dijkGraph.addVertex("JAKARTA");
  dijkGraph.addVertex("BEKASI");
  dijkGraph.addVertex("JOGJA");
  dijkGraph.addVertex("SOLO");
  dijkGraph.addVertex("SEMARANG");
  dijkGraph.addVertex("MALANG");

  dijkGraph.addEdge("JAKARTA", "SEMARANG", 200);
  dijkGraph.addEdge("JAKARTA", "JOGJA", 450);
  dijkGraph.addEdge("JAKARTA", "BEKASI", 30);

  dijkGraph.addEdge("SEMARANG", "SURABAYA", 350);
  dijkGraph.addEdge("SEMARANG", "SOLO", 70);

  dijkGraph.addEdge("SOLO", "JOGJA", 20);
  dijkGraph.addEdge("JOGJA", "MALANG", 150);

  dijkGraph.addEdge("SURABAYA", "MALANG", 75);
  // dijkGraph.addEdge("SURABAYA", "MALANG", 750);

  /**
   * RESULT SHOULD BE:
   *  {
   *    SURABAYA: [ 'SEMARANG', 'MALANG' ],
   *    JAKARTA: [ 'SEMARANG', 'JOGJA', 'BEKASI' ],
   *    BEKASI: [ 'JAKARTA' ],
   *    JOGJA: [ 'JAKARTA', 'SOLO', 'MALANG' ],
   *    SOLO: [ 'SEMARANG', 'JOGJA' ],
   *    SEMARANG: [ 'JAKARTA', 'SURABAYA', 'SOLO' ],
   *    MALANG: [ 'JOGJA', 'SURABAYA' ]
   *  }
   **/
  // console.log(dijkGraph.adjacencyList);

  console.log(dijkGraph.shortest("JAKARTA", "SURABAYA"));
}
