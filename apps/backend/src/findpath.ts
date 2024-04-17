import { BFS } from "./BFS.ts";
import { AStar } from "./AStar.ts";
import { DFS } from "./DFS.ts";
import { Dijkstra } from "./Dijkstra.ts";
import { Ipathfind } from "./Ipathfind.ts";
import { Graph } from "./graph.ts";
enum algoType {
  BFS,
  AStar,
  DFS,
  Dijkstra,
}
/**
 * findpath: a god class for all other algos(idk if it acually works how Wong wants)
 */
export class findpath {
  private static Algorithm: Ipathfind;

  /**
   *
   * @param graph the graph to be searched
   * @param AlgorithmType algo to be used
   * @param start start of grpah
   * @param end end of graph
   * returns the path from start to end
   */
  static doAlgo(
    graph: Graph,
    AlgorithmType: algoType,
    start: string,
    end: string,
  ): string[] {
    if (AlgorithmType == 1) {
      this.Algorithm = new AStar();
    } else if (AlgorithmType == 0) {
      this.Algorithm = new BFS();
    } else if (AlgorithmType == 2) {
      this.Algorithm = new DFS();
    } else if (AlgorithmType == 3) {
      this.Algorithm = new Dijkstra();
    } else {
      this.Algorithm = new AStar();
    }
    return this.Algorithm.pathfind(graph, start, end);
  }
}
