import { Graph } from "./graph.ts";

/**
 * Ipathfind: An interface to handle algorithm functions
 */
export interface Ipathfind {
  //generic pathfind stub for any algo.
  pathfind(graph: Graph, start: string, end: string): string[];
}
