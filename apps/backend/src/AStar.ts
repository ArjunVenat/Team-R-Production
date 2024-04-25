import { HeapSearch } from "./HeapSearch.ts";
import { GraphNode } from "./graph.ts";

export class AStar extends HeapSearch {
  heuristic(tempNode: GraphNode, endNode: GraphNode): number {
    return tempNode.getDistance(endNode);
  }
}
