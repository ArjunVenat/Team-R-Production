import { GraphNode } from "./graph.ts";
import { Graph } from "./graph.ts";
import minHeap from "./heap.ts";
import { Ipathfind } from "./Ipathfind.ts";

/**
 * Dijkstra: A class that contains the Dijkstra algorithm
 */
export class Dijkstra implements Ipathfind {
  pathfind(graph: Graph, start: string, end: string): string[] {
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
    heap.insert(startNode, 0);
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
          heap.insert(tempNode, dist);
        }
      }
    }

    return Graph.backtrack(arrivedFrom, startNode, endNode);
  }
}
