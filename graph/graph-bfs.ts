class BFSNode {
  constructor(
    public value: string,
    public next: BFSNode | null = null,
    public prev: BFSNode | null = null
  ) {}
}

class BFSQueue {
  head: BFSNode | null;
  tail: BFSNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value: string) {
    const newNode = new BFSNode(value);

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

class BFSGTraversal {
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

  breadth(vertex: string) {
    const breadthQueue = new BFSQueue();

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

const bfs = new BFSGTraversal();

bfs.addVertex("A");
bfs.addVertex("B");
bfs.addVertex("C");
bfs.addVertex("D");
bfs.addVertex("E");
bfs.addVertex("F");

// Order matters
bfs.addEdge("A", "B");
bfs.addEdge("A", "C");
bfs.addEdge("B", "D");
bfs.addEdge("C", "E");
bfs.addEdge("D", "E");
bfs.addEdge("D", "F");
bfs.addEdge("E", "F");

console.log(bfs.adjacencyList);

// should be [A, B, C, D, E, F]
console.log("RESULT = ", bfs.breadth("A"));
