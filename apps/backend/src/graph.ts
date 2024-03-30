/**
 * Represents a node within the graph.
 */
class GraphNode {
  id: string;
  neighbors: GraphNode[];
  constructor(id: string) {
    this.id = id;
    this.neighbors = [];
  }

  /**
   * Adds a neighbor to add to this node
   * @param node The node to add as a neighbor
   */
  addNeighbor(node: GraphNode) {
    this.neighbors.push(node);
  }
}

/**
 * Represents a graph structure. Nodes are assumed to have unique names.
 */
class Graph {
  private nodeMap: Map<string, GraphNode>;

  constructor() {
    this.nodeMap = new Map<string, GraphNode>();
  }

  /**
   * Adds a node to the graph. Assumes the given id is unique.
   * @param id A unique identifier for the node to add to the graph.
   */
  addNode(id: string): void {
    const tempNode = new GraphNode(id);
    this.nodeMap.set(id, tempNode);
  }

  /**
   * Creates an edge connecting the two nodes. Adds the two nodes to the graph
   * if they do not already exist
   * @param id1 A unique identifier for the first node to connect.
   * @param id2 A unique identifier for the second node to connect.
   */
  addEdge(id1: string, id2: string): void {
    // Add nodes to the graph if they do not exist yet
    if (!this.nodeMap.has(id1)) {
      this.addNode(id1);
    }
    if (!this.nodeMap.has(id2)) {
      this.addNode(id2);
    }

    // use '!' to assert that nodeMap.get will not return undefined
    const node1 = this.nodeMap.get(id1)!;
    const node2 = this.nodeMap.get(id2)!;

    node1.addNeighbor(node2);
    node2.addNeighbor(node1);
  }

  /**
   * Performs a BFS to find the shortest path between the start and end nodes
   * @param start A unique identifier representing the node to start from
   * @param end A unique identifier representing the node to end at.
   */
  BFS(start: string, end: string): string[] {
    const startNode = this.nodeMap.get(start);
    const endNode = this.nodeMap.get(end);

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

    // Backtrack to find the path
    const path: GraphNode[] = [];
    let currNode = endNode;
    path.push(currNode);

    // Error handling in case a node cannot be reached
    if (!arrivedFrom.has(endNode)) {
      console.error(`endNode: ${endNode.id} cannot be reached`);
      return [];
    }

    while (currNode != startNode) {
      currNode = arrivedFrom.get(currNode)!;
      path.push(currNode);
    }

    // path contains the order of nodes from end to start
    path.reverse();
    return path.map((n) => n.id);
  }
}
export default Graph;
