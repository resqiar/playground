namespace matrix {
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
}
