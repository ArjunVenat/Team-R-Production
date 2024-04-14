import { GraphNode } from "./graph.ts";
import { Graph } from "./graph.ts";
import { Ipathfind } from "./Ipathfind.ts";
//import {Ipathfind} from "./Ipathfind.ts";

/**
 * BFS: A class that contains the BFS algorithm
 */
export class BFS implements Ipathfind {
  pathfind(graph: Graph, start: string, end: string) {
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
}
