class Graph {
  adjacencyList: { [vertex: string]: string[] } = {};

  addVertex(vertex: string) {
    // If the vertex does not exist, set to empty array, otherwise, do nothing
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  removeVertex(vertex: string) {
    if (!this.adjacencyList[vertex])
      throw new Error("Invalid vertex, vertex not exist");

    // Remove all edges related to current vertex
    while (this.adjacencyList[vertex].length) {
      this.removeEdge(vertex, this.adjacencyList[vertex][0]);
    }

    // Remove the key from the list
    delete this.adjacencyList[vertex];
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

  removeEdge(v1: string, v2: string) {
    if (!this.adjacencyList[v1] || !this.adjacencyList[v2])
      throw new Error("Invalid vertex, vertex not exist");

    /**
     * This is a method for undirected graph,
     * meaning that both direction must be set the connection.
     * If we want to do directed graph, we only need to bind once,
     * so the order of the parameter matters.
     **/
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((val) => val !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter((val) => val !== v1);
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

g.addEdge("JAKARTA", "SEMARANG");
g.addEdge("JAKARTA", "JOGJA");
g.addEdge("JAKARTA", "BEKASI");

g.addEdge("SEMARANG", "SURABAYA");
g.addEdge("SEMARANG", "SOLO");

g.addEdge("SOLO", "JOGJA");
g.addEdge("JOGJA", "MALANG");

g.addEdge("SURABAYA", "MALANG");

// remove comment to delete the vertex
// g.removeVertex("SOLO");

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
console.log(g.adjacencyList);
