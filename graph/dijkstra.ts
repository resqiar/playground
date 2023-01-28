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
}

const dijkGraph = new DGraph();

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

dijkGraph.addEdge("SEMARANG", "SURABAYA", 250);
dijkGraph.addEdge("SEMARANG", "SOLO", 70);

dijkGraph.addEdge("SOLO", "JOGJA", 20);
dijkGraph.addEdge("JOGJA", "MALANG", 150);

dijkGraph.addEdge("SURABAYA", "MALANG", 75);
dijkGraph.addEdge("SURABAYA", "MALANG", 750);

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
console.log(dijkGraph.adjacencyList);
