import { expect, test, describe, beforeEach } from "vitest";
import minHeap from "../src/heap.ts";
import { GraphNode } from "../src/graph.ts";

const testNodes: GraphNode[] = [];
let heap = new minHeap();

// Populate test nodes
for (let i = 0; i < 10; i++) {
  testNodes[i] = new GraphNode(`${i}`, 0, 0, 0);
}

// Clear the heap before each test
beforeEach(() => {
  heap = new minHeap();
});

describe("peek", () => {
  test("peek returns a value", () => {
    heap.insert(testNodes[0], 20);
    expect(heap.peek()).toBe(testNodes[0]);
  });

  test("peek returns the min value", () => {
    heap.insert(testNodes[0], 2);
    heap.insert(testNodes[1], 3);
    heap.insert(testNodes[2], 18);
    heap.insert(testNodes[3], 1);
    heap.insert(testNodes[4], 23);
    expect(heap.peek()).toBe(testNodes[3]);
  });

  test("peek does not remove value", () => {
    heap.insert(testNodes[0], 92);
    heap.peek();
    heap.peek();
    heap.peek();
    heap.peek();
    expect(heap.peek()).toBe(testNodes[0]);
  });
});

describe("pop", () => {
  test("pop returns a value", () => {
    heap.insert(testNodes[0], 29);
    expect(heap.pop()).toBe(testNodes[0]);
  });

  test("pop returns the min value", () => {
    heap.insert(testNodes[0], 29);
    heap.insert(testNodes[1], 2);
    heap.insert(testNodes[2], 12);
    heap.insert(testNodes[3], 14);
    expect(heap.pop()).toBe(testNodes[1]);
  });

  test("popping multiple times returns min values in ascending order", () => {
    heap.insert(testNodes[0], 29);
    heap.insert(testNodes[1], 2);
    heap.insert(testNodes[2], 12);
    heap.insert(testNodes[3], 14);
    expect(heap.pop()).toBe(testNodes[1]);
    expect(heap.pop()).toBe(testNodes[2]);
    expect(heap.pop()).toBe(testNodes[3]);
    expect(heap.pop()).toBe(testNodes[0]);
  });

  test("popping multiple times returns min values in ascending order 2", () => {
    heap.insert(testNodes[0], 29);
    heap.insert(testNodes[1], 2);
    heap.insert(testNodes[2], 12);
    heap.insert(testNodes[3], 14);
    expect(heap.pop()).toBe(testNodes[1]);
    expect(heap.pop()).toBe(testNodes[2]);
    heap.insert(testNodes[4], 4);
    heap.insert(testNodes[5], 9);
    expect(heap.pop()).toBe(testNodes[4]);
    heap.insert(testNodes[6], 12);
    expect(heap.pop()).toBe(testNodes[5]);
    expect(heap.pop()).toBe(testNodes[6]);
    expect(heap.pop()).toBe(testNodes[3]);
    expect(heap.pop()).toBe(testNodes[0]);
  });
});

describe("isEmpty", () => {
  test("new heap is empty", () => {
    expect(heap.isEmpty()).toBe(true);
  });

  test("heap with data is not empty", () => {
    heap.insert(testNodes[0], 10);
    expect(heap.isEmpty()).toBe(false);
  });

  test("heap with data is not empty 2", () => {
    heap.insert(testNodes[0], 10);
    heap.insert(testNodes[3], 2);
    heap.pop();
    expect(heap.isEmpty()).toBe(false);
  });

  test("emptying a heap makes it empty", () => {
    heap.insert(testNodes[0], 10);
    heap.pop();
    expect(heap.isEmpty()).toBe(true);
  });

  test("emptying a heap makes it empty 2", () => {
    heap.insert(testNodes[0], 10);
    heap.insert(testNodes[1], 10);
    heap.insert(testNodes[2], 10);
    heap.pop();
    heap.pop();
    heap.insert(testNodes[4], 10);
    heap.pop();
    heap.pop();
    expect(heap.isEmpty()).toBe(true);
  });
});

describe("delete", () => {
  test("value gets deleted", () => {
    heap.insert(testNodes[0], 9);
    heap.delete(testNodes[0]);
    expect(heap.isEmpty()).toBe(true);
  });

  test("innocent value stays alive", () => {
    heap.insert(testNodes[0], 1);
    heap.delete(testNodes[9]);
    expect(heap.isEmpty()).toBe(false);
  });

  test("minHeap reordered after deletion", () => {
    heap.insert(testNodes[0], 9);
    heap.insert(testNodes[1], 2);
    heap.delete(testNodes[0]);
    expect(heap.isEmpty()).toBe(false);
    expect(heap.peek()).toBe(testNodes[1]);
  });

  test("minHeap reordered after deletion 2", () => {
    heap.insert(testNodes[4], 4);
    heap.insert(testNodes[2], 2);
    heap.insert(testNodes[1], 1);
    heap.insert(testNodes[3], 3);
    heap.insert(testNodes[6], 6);
    heap.insert(testNodes[5], 5);
    heap.delete(testNodes[4]);
    expect(heap.peek()).toBe(testNodes[1]);
    heap.delete(testNodes[1]);
    heap.delete(testNodes[2]);
    expect(heap.peek()).toBe(testNodes[3]);
    heap.delete(testNodes[3]);
    expect(heap.peek()).toBe(testNodes[5]);
  });
});
