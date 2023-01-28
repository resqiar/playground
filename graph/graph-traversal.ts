class GNode {
  constructor(
    public value: string,
    public next: GNode | null = null,
    public prev: GNode | null = null
  ) {}
}

class GQueue {
  head: GNode | null;
  tail: GNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value: string) {
    const newNode = new GNode(value);

    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
      return this.length++;
    }

    const current = this.tail;
    current!.next = newNode;
    newNode.prev = current;

    this.tail = newNode;
    this.length++;
  }

  dequeue() {
    if (!this.length) return null;
    if (this.length === 1) {
      const current = this.head;

      this.head == null;
      this.tail == null;
      this.length--;

      return current!.value;
    }

    const current = this.head;

    this.head = current!.next;
    this.length--;

    return current!.value;
  }
}

class DFTGraph {
  adjacencyList: { [vertex: string]: string[] } = {};

  addVertex(vertex: string) {
    // If the vertex does not exist, set to empty array, otherwise, do nothing
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1: string, v2: string) {
    if (!this.adjacencyList[v1] || !this.adjacencyList[v2])
      throw new Error("Invalid vertex, vertex not exist");

    /**
     * This is a method for undirected graph,
     * meaning that both direction must be set the connection.
     * If we want to do directed graph, we only need to bind once,
     * so the order of the parameter matters.
     **/
    if (!this.adjacencyList[v1].includes(v2)) {
      this.adjacencyList[v1].push(v2);
    }

    if (!this.adjacencyList[v2].includes(v1)) {
      this.adjacencyList[v2].push(v1);
    }
  }

  depth(vertex: string) {
    const result: string[] = [];
    const visited: Set<string> = new Set();
    const list = this.adjacencyList;

    (function helper(v: string) {
      if (!v) return null;

      // push current vertex to visited
      visited.add(v);

      // push to result
      result.push(v);

      for (let i = 0; i < list[v].length; i++) {
        const val = list[v][i];
        // if current node is not visited, otherwise ignore
        if (!visited.has(val)) helper(val);
      }
    })(vertex);

    return result;
  }

  breadth(vertex: string) {
    const breadthQueue = new GQueue();
    // enqueue the first vertex (specified root)
    breadthQueue.enqueue(vertex);

    const result: string[] = [];
    const visited: Set<string> = new Set();

    // mark first vertex as visited
    visited.add(vertex);

    // loop while queue is not empty
    while (breadthQueue.length) {
      // dequeue value
      const dequeued = breadthQueue.dequeue();

      if (!dequeued) return;

      // after dequeueing value, push to the result
      result.push(dequeued);

      // loop the adjacency list based on the current dequeued value
      for (let i = 0; i < this.adjacencyList[dequeued].length; i++) {
        const val = this.adjacencyList[dequeued][i];

        if (!visited.has(val)) {
          // set visited for current iteration value
          visited.add(val);

          // push to the queue for current iteration value
          breadthQueue.enqueue(val);
        }
      }
    }

    return result;
  }
}

const dg = new DFTGraph();

dg.addVertex("A");
dg.addVertex("B");
dg.addVertex("C");
dg.addVertex("D");
dg.addVertex("E");
dg.addVertex("F");

// Order matters
dg.addEdge("A", "B");
dg.addEdge("A", "C");
dg.addEdge("B", "D");
dg.addEdge("C", "E");
dg.addEdge("D", "E");
dg.addEdge("D", "F");
dg.addEdge("E", "F");

console.log(dg.adjacencyList);

// should be [A, B, D, E, C, F]
console.log("RESULT = ", dg.depth("A"));

// should be [A, B, C, D, E, F]
console.log("RESULT = ", dg.breadth("A"));
