class GraphTraversal {
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
}

const gt = new GraphTraversal();

gt.addVertex("A");
gt.addVertex("B");
gt.addVertex("C");
gt.addVertex("D");
gt.addVertex("E");
gt.addVertex("F");

// Order matters
gt.addEdge("A", "B");
gt.addEdge("A", "C");
gt.addEdge("B", "D");
gt.addEdge("C", "E");
gt.addEdge("D", "E");
gt.addEdge("D", "F");
gt.addEdge("E", "F");

console.log(gt.adjacencyList);

// should be [A, B, D, E, C, F]
console.log("RESULT = ", gt.depth("A"));
