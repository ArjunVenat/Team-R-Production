import minHeap from "./heap.ts";

/**
 * Represents a node within the graph.
 */
export class GraphNode {
  id: string;
  x: number;
  y: number;
  z: number;
  neighbors: GraphNode[];
  constructor(id: string, x: number, y: number, z: number) {
    this.id = id;
    this.neighbors = [];
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Adds a neighbor to add to this node
   * @param node The node to add as a neighbor
   */
  addNeighbor(node: GraphNode) {
    this.neighbors.push(node);
  }

  getDistance(other: GraphNode): number {
    return Math.sqrt(
      (this.x - other.x) ** 2 +
        (this.y - other.y) ** 2 +
        (this.z - other.z) ** 2,
    );
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
  addNode(id: string, x: number, y: number, z: number): void {
    const tempNode = new GraphNode(id, x, y, z);
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

  /**
   * Performs a BFS to find the shortest path between the start and end nodes
   * @param start A unique identifier representing the node to start from
   * @param end A unique identifier representing the node to end at.
   */
  BFS(start: string, end: string): string[] {
    const startNode = Graph.nodeMap.get(start);
    const endNode = Graph.nodeMap.get(end);

    // Check if the nodes are within the graph
    if (startNode === undefined || endNode === undefined) {
      return [];
    }

    const arrivedFrom = new Map<GraphNode, GraphNode>();
    // Use queue.push and queue.shift to perform queue operations (push and pop)
    const queue: GraphNode[] = [];

    // Initialize BFS
    arrivedFrom.set(startNode, startNode);
    queue.push(startNode);

    // Main BFS loop
    while (queue.length != 0) {
      // Grab the first node off of the queue
      const currNode = queue.shift()!;
      // We traversed to the destination
      if (currNode == endNode) {
        break;
      }
      // Keep searching for the destination node
      for (const neighbor of currNode.neighbors) {
        if (arrivedFrom.has(neighbor)) {
          continue;
        }
        arrivedFrom.set(neighbor, currNode);
        queue.push(neighbor);
      }
    }

    return Graph.backtrack(arrivedFrom, startNode, endNode);
  }

  /**
   * Uses the A* algorithm to find the shortest path between the start and end nodes
   * @param start A unique identifier representing the node to start from
   * @param end A unique identifier representing the node to end at.
   */
  AStar(start: string, end: string): string[] {
    const startNode = Graph.nodeMap.get(start);
    const endNode = Graph.nodeMap.get(end);

    // Check if the nodes are within the graph
    if (startNode === undefined || endNode === undefined) {
      return [];
    }

    const heap = new minHeap();
    const nodeSet = new Set<GraphNode>();

    const BASICALLY_INFINITY = 99999999999;
    const arrivedFrom = new Map<GraphNode, GraphNode>();
    const shortestPath = new Map<GraphNode, number>();

    arrivedFrom.set(startNode, startNode);
    shortestPath.set(startNode, 0);
    heap.insert(startNode, startNode.getDistance(endNode));
    nodeSet.add(startNode);

    while (!heap.isEmpty()) {
      const currNode = heap.pop();
      nodeSet.delete(currNode);

      // Terminate search if we find the target
      if (currNode == endNode) {
        break;
      }

      for (const tempNode of currNode.neighbors) {
        // We will know how far a node is before we explore its neighbors
        const dist =
          shortestPath.get(currNode)! + currNode.getDistance(tempNode);

        // Compare to best known path
        if (
          dist <
          (shortestPath.has(tempNode)
            ? shortestPath.get(tempNode)!
            : BASICALLY_INFINITY)
        ) {
          arrivedFrom.set(tempNode, currNode);
          shortestPath.set(tempNode, dist);

          // TODO: Add a hashset to check if the node exists instead of performing expensive delete operation
          heap.delete(tempNode);
          heap.insert(tempNode, dist + tempNode.getDistance(endNode));
        }
      }
    }

    return Graph.backtrack(arrivedFrom, startNode, endNode);
  }

  // TODO: IMPLEMENT THIS!!

  //Dijkstra(start: string, end: string): string[] {
  //  return [];
  //}

  DFS(start: string, end: string) {
    const startNode = Graph.nodeMap.get(start);
    const endNode = Graph.nodeMap.get(end);

    // Check if the nodes are within the graph
    if (startNode === undefined || endNode === undefined) {
      return [];
    }
    const visited: GraphNode[] = [];
    const arrivedFrom = new Map<GraphNode, GraphNode>();
    // Use queue.push and queue.shift to perform queue operations (push and pop)
    const stack: GraphNode[] = [];

    // Initialize BFS
    arrivedFrom.set(startNode, startNode);
    stack.push(startNode);

    // Main BFS loop
    while (stack.length != 0) {
      // Grab the first node off of the queue
      const currNode = stack.pop()!;
      // We traversed to the destination
      if (currNode == endNode) {
        break;
      }
      // Keep searching for the destination node
      for (const neighbor of currNode.neighbors) {
        if (arrivedFrom.has(neighbor)) {
          continue;
        }
        arrivedFrom.set(neighbor, currNode);
        if (visited.indexOf(neighbor) < 0) {
          stack.push(neighbor);
          visited.push(neighbor);
        }

        //arrivedFrom.set(neighbor, currNode);
      }
    }

    return Graph.backtrack(arrivedFrom, startNode, endNode);
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
