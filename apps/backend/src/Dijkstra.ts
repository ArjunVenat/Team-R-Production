import { HeapSearch } from "./HeapSearch.ts";

export class Dijkstra extends HeapSearch {
  heuristic(): number {
    return 0;
  }
}
