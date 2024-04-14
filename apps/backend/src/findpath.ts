//import {Ipathfind} from "./Ipathfind.ts";

import { BFS } from "./BFS.ts";
import { AStar } from "./AStar.ts";
import { DFS } from "./DFS.ts";
import { Dijkstra } from "./Dijkstra.ts";
import { Ipathfind } from "./Ipathfind.ts";
import { Graph } from "./graph.ts";

export class findpath {
  private static Algorithm: Ipathfind;

  static doAlgo(
    graph: Graph,
    AlgorithmType: string,
    start: string,
    end: string,
  ): string[] {
    if (AlgorithmType == "AStar") {
      this.Algorithm = new AStar();
    } else if (AlgorithmType == "BFS") {
      this.Algorithm = new BFS();
    } else if (AlgorithmType == "DFS") {
      this.Algorithm = new DFS();
    } else if (AlgorithmType == "Dijkstra's") {
      this.Algorithm = new Dijkstra();
    } else {
      this.Algorithm = new AStar();
    }
    return this.Algorithm.pathfind(graph, start, end);
  }
}
