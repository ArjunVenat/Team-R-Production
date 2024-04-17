import { GraphNode } from "./graph.ts";

/**
 * A class that describes a minimum heap data structure
 */
class minHeap {
  //functions will operate on these two arrays in parallel
  public nodeheap: Array<GraphNode> = new Array<GraphNode>();
  public weightheap: Array<number> = new Array<number>();

  /**
   * constructor: for now, a heap is defined as an array of weights, and an array fo nodes.
   */
  public constructor() {
    this.nodeheap = new Array<GraphNode>();
    this.weightheap = new Array<number>();
  }

  // Public methods

  public isEmpty(): boolean {
    return this.nodeheap[0] === undefined;
  }

  /**
   * Insert: inserts a node at the next available space, then sorts it in the min-heap
   * @param node
   * @param weight
   */
  public insert(node: GraphNode, weight: number): void {
    //adds weight and node to their respective graphs
    this.weightheap.push(weight);
    this.nodeheap.push(node);
    //if the element inserted isn't the first
    if (this.weightheap.length > 1) {
      let currentIndex = this.weightheap.length - 1; //starts at end of heap

      while (
        currentIndex > 0 &&
        this.weightheap[Math.floor((currentIndex - 1) / 2)] >
          this.weightheap[currentIndex]
      ) {
        //Math.floor(currentIndex - 1) / 2) is how to get from an index to its parent in a heap
        this.swapIndex(Math.floor((currentIndex - 1) / 2), currentIndex);
        currentIndex = Math.floor((currentIndex - 1) / 2);
      }
    }
  }

  /**
   * swapIndex: helper function to swap two numbers in a both heaps
   * @param a first node to be swapped
   * @param b second node to be swapped
   */
  private swapIndex = (a: number, b: number) => {
    [this.weightheap[a], this.weightheap[b]] = [
      this.weightheap[b],
      this.weightheap[a],
    ];
    [this.nodeheap[a], this.nodeheap[b]] = [this.nodeheap[b], this.nodeheap[a]];
  };

  /**
   * delete: deletes the requested node and then adjusts the heap accordingly
   * @param node the node to be deleted
   */
  delete(node: GraphNode) {
    const n = this.weightheap.length;

    if (this.isEmpty()) {
      return;
    }
    let i = 0;
    //Finds the node to delete, i is the index of it
    while (i < n && node !== this.nodeheap[i]) {
      i++;
    }

    if (i === n) {
      return;
    }
    this.weightheap[i] = this.weightheap[n - 1];
    this.weightheap.pop();

    this.nodeheap[i] = this.nodeheap[n - 1];
    this.nodeheap.pop();

    this.heapify(i);
  }

  heapify(i: number) {
    const n = this.weightheap.length;
    let smallest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && this.weightheap[l] < this.weightheap[smallest]) {
      smallest = l;
    }

    if (r < n && this.weightheap[r] < this.weightheap[smallest]) {
      smallest = r;
    }

    if (smallest !== i) {
      this.swapIndex(i, smallest);

      this.heapify(smallest);
    }
  }

  /**
   * peek: Returns the value at the top but does not remove it
   */
  peek(): GraphNode {
    return this.nodeheap[0];
  }

  /**
   * Returns the value at the top AND removes it
   */
  pop(): GraphNode {
    // const r = this.nodeheap[0];
    // delete this.nodeheap[0];
    // return r;
    const r = this.peek();
    this.delete(r);
    return r;
  }
}

export default minHeap;
