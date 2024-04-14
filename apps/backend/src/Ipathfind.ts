import { Graph } from "./graph.ts";

export interface Ipathfind {
  pathfind(graph: Graph, start: string, end: string): string[];
}
