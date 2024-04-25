import { Ipathfind } from "./Ipathfind.ts";
import { Graph, GraphNode } from "./graph.ts";
import minHeap from "./heap.ts";

export abstract class HeapSearch implements Ipathfind {
  static BASICALLY_INFINITY = 99999999999;
  heap: minHeap = new minHeap();
  nodeSet = new Set<GraphNode>();
  arrivedFrom = new Map<GraphNode, GraphNode>();
  shortestPath = new Map<GraphNode, number>();

  pathfind(graph: Graph, start: string, end: string) {
    const startNode = Graph.nodeMap.get(start);
    const endNode = Graph.nodeMap.get(end);

    // Check if the nodes are within the graph
    if (startNode === undefined || endNode === undefined) {
      return [];
    }

    // Fill various datastructures with initial values
    this.init_search(startNode, endNode);

    // Iterate through the heap
    while (!this.heap.isEmpty()) {
      const currNode = this.heap.pop();
      this.nodeSet.delete(currNode);

      // Terminate search if we find the target
      if (currNode == endNode) {
        break;
      }

      for (const tempNode of currNode.neighbors) {
        // We will know how far a node is before we explore its neighbors
        const dist =
          this.shortestPath.get(currNode)! + currNode.getDistance(tempNode);

        // Compare to best known path
        if (
          dist <
          (this.shortestPath.has(tempNode)
            ? this.shortestPath.get(tempNode)!
            : HeapSearch.BASICALLY_INFINITY)
        ) {
          this.arrivedFrom.set(tempNode, currNode);
          this.shortestPath.set(tempNode, dist);

          // TODO: Add a hashset to check if the node exists instead of performing expensive delete operation
          this.heap.delete(tempNode);
          this.heap.insert(tempNode, dist + this.heuristic(tempNode, endNode));
        }
      }
    }

    return Graph.backtrack(this.arrivedFrom, startNode, endNode);
  }

  init_search(startNode: GraphNode, endNode: GraphNode) {
    this.arrivedFrom.set(startNode, startNode);
    this.shortestPath.set(startNode, 0);
    this.heap.insert(startNode, startNode.getDistance(endNode));
    this.nodeSet.add(startNode);
  }

  abstract heuristic(tempNode: GraphNode, endNode: GraphNode): number;
}
