import { GraphNode } from "./graph.ts";
import { Graph } from "./graph.ts";
import { Ipathfind } from "./Ipathfind.ts";

/**
 * DFS: A class that contains the DFS algorithm
 */
export class DFS implements Ipathfind {
  pathfind(graph: Graph, start: string, end: string) {
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
