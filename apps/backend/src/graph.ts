/**
 * Represents a node within the graph.
 */
export class GraphNode {
  id: string;
  longName: string;
  x: number;
  y: number;
  z: number;
  neighbors: GraphNode[];
  weights: Map<GraphNode, number>;
  constructor(id: string, longName: string, x: number, y: number, z: number) {
    this.id = id;
    this.neighbors = [];
    this.x = x;
    this.longName = longName;
    this.y = y;
    this.z = z;
    this.weights = new Map<GraphNode, number>();
  }

  /**
   * Adds a neighbor to add to this node
   * @param node The node to add as a neighbor
   */
  addNeighbor(node: GraphNode) {
    this.neighbors.push(node);
  }

  addWeight(other: GraphNode, weight: number) {
    this.weights.set(other, weight);
  }

  getDistance(other: GraphNode): number {
    let weight = this.weights.get(other);
    if (!weight) {
      weight = 1;
    }

    return (
      weight *
      Math.sqrt(
        (this.x - other.x) ** 2 +
          (this.y - other.y) ** 2 +
          (this.z - other.z) ** 2,
      )
    );
  }

  getTime(other: GraphNode): number {
    // 3 units per foot, assumes walking speed of 4.7ft/s
    // Conveniently works out to also take 14 seconds per floor change with elevator
    return this.getDistance(other) / (3 * 4.7);
  }
}

class StairNode extends GraphNode {
  getDistance(other: GraphNode): number {
    let out = Math.sqrt(
      (this.x - other.x) ** 2 +
        (this.y - other.y) ** 2 +
        (this.z - other.z) ** 2,
    );
    if (other instanceof StairNode) {
      out *= 3;
    }
    return out;
  }

  getTime(other: GraphNode): number {
    if (other instanceof StairNode) {
      // Take 28 seconds per floor change with stairs
      return this.getDistance(other) / (1.5 * 3 * 4.7);
    } else {
      return super.getDistance(other) / (3 * 4.7);
    }
    // 3 units per foot, assumes walking speed of 4.7ft/s
    // Conveniently works out to also take 14 seconds per floor change with elevator
  }
}
/**
 * Represents a graph structure. Nodes are assumed to have unique names.
 */
export class Graph {
  public static nodeMap: Map<string, GraphNode>;

  constructor() {
    Graph.nodeMap = new Map<string, GraphNode>();
  }

  /**
   * Adds a node to the graph. Assumes the given id is unique.
   * @param id A unique identifier for the node to add to the graph.
   * @param x the x coordinate of the node.
   * @param y the y coordinate of the node.
   * @param z the z coordinate of the node.
   */
  addNode(id: string, longName: string, x: number, y: number, z: number): void {
    const tempNode = new GraphNode(id, longName, x, y, z);
    Graph.nodeMap.set(id, tempNode);
  }

  addStairNode(
    id: string,
    longName: string,
    x: number,
    y: number,
    z: number,
  ): void {
    const tempNode = new StairNode(id, longName, x, y, z);
    Graph.nodeMap.set(id, tempNode);
  }

  /**
   * Creates an edge connecting two nodes. Throws an error if the nodes do not exist
   * @param id1 A unique identifier for the first node to connect.
   * @param id2 A unique identifier for the second node to connect.
   */
  addEdge(id1: string, id2: string): void {
    const node1 = Graph.nodeMap.get(id1)!;
    const node2 = Graph.nodeMap.get(id2)!;

    node1.addNeighbor(node2);
    node2.addNeighbor(node1);
  }

  addEdgeWeight(edgeid: string, weight: number): void {
    const [id1, id2] = edgeid.split("_");
    const node1 = Graph.nodeMap.get(id1)!;
    const node2 = Graph.nodeMap.get(id2)!;

    node1.addWeight(node2, weight);
    node2.addWeight(node1, weight);
  }

  /**
   * Helper method to find a path from startNode to endNode given a mapping of nodes.
   * @param arrivedFrom A mapping of nodes to the previous node on the path
   * @param startNode The node to start the path from
   * @param endNode The node to end the path at
   */
  public static backtrack(
    arrivedFrom: Map<GraphNode, GraphNode>,
    startNode: GraphNode,
    endNode: GraphNode,
  ): string[] {
    // Error handling in case a node cannot be reached
    if (!arrivedFrom.has(endNode)) {
      console.error(`endNode: ${endNode.id} cannot be reached`);
      return [];
    }

    // Backtrack to find the path
    const path: GraphNode[] = [];
    let currNode = endNode;
    path.push(currNode);

    while (currNode != startNode) {
      currNode = arrivedFrom.get(currNode)!;
      path.push(currNode);
    }

    // path contains the order of nodes from end to start
    path.reverse();
    return path.map((n) => n.id);
  }

  public calculateTime(path: string[]) {
    const nodes = path.map((s) => Graph.nodeMap.get(s)!);
    let out = 0;
    for (let i = 0; i < nodes.length - 1; i++) {
      out += nodes[i].getTime(nodes[i + 1]);
    }
    return out;
  }
}

/* Code from Brannon's test
//let S = new GraphNode("1",1,1,1);
//let g1 = new GraphNode("2",1,1,1);
//let g2 = new GraphNode("3",1,1,1);
//let E = new GraphNode("4",1,1,1);
const testGraph = new Graph();

testGraph.addNode("START", 1, 1, 1);

testGraph.addNode("E", 1, 1, 1);
testGraph.addNode("F", 1, 1, 1);
testGraph.addNode("G", 1, 1, 1);
testGraph.addNode("H", 1, 1, 1);
testGraph.addNode("I", 1, 1, 1);
testGraph.addNode("J", 1, 1, 1);
testGraph.addNode("K", 1, 1, 1);
testGraph.addNode("GOAL", 1, 1, 1);
testGraph.addNode("Brannon", 1, 1, 1);

testGraph.addEdge("START", "E");
testGraph.addEdge("START", "H");
testGraph.addEdge("H", "G");
testGraph.addEdge("G", "I");
testGraph.addEdge("I", "J");
testGraph.addEdge("J", "K");
testGraph.addEdge("K", "GOAL");
testGraph.addEdge("E", "GOAL");

testGraph.DFS("START", "GOAL");
testGraph.BFS("START", "Brannon");
 */
