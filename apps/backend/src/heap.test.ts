import { expect, test } from "vitest";
import minHeap from "./heap.ts";
import { GraphNode } from "./graph.ts";

//const weightheap: Array<number> = new Array<number>;
const g = new GraphNode("test", 2, 2, 2);
const g2 = new GraphNode("test", 4, 6, 2);
const weightheap = new Array<GraphNode>();
const nodeheap = new Array<number>();
const heap = new minHeap(weightheap, nodeheap);

//NOT ALL TESTS SHOULD PASS

heap.insert(g, 23);
heap.insert(g2, 10);

heap.insert(g, 36);

heap.insert(g, 32);
heap.insert(g, 48);
heap.insert(g, 45);

heap.insert(g, 57);

heap.insert(g, 56);
heap.insert(g, 33);
heap.insert(g, 49);
heap.insert(g, 50);
heap.insert(g, 51);
heap.insert(g, 52);
heap.insert(g, 61);
heap.insert(g, 62);
//heap.delete(g2);

test("node", (): void => {
  expect(heap.nodeheap[0]).toBe(g);
});
test("index 0", (): void => {
  expect(heap.weightheap[0]).toBe(10);
});

test("index 1", (): void => {
  expect(heap.weightheap[1]).toBe(23);
});

test("index 2", (): void => {
  expect(heap.weightheap[2]).toBe(36);
});

test("index 3", (): void => {
  expect(heap.weightheap[3]).toBe(32);
});

test("index 4", (): void => {
  expect(heap.weightheap[4]).toBe(48);
});

test("index 5", (): void => {
  expect(heap.weightheap[5]).toBe(45);
});

test("index 6", (): void => {
  expect(heap.weightheap[6]).toBe(57);
});

test("index 7", (): void => {
  expect(heap.weightheap[7]).toBe(56);
});

test("index 8", (): void => {
  expect(heap.weightheap[8]).toBe(33);
});

test("index 9", (): void => {
  expect(heap.weightheap[9]).toBe(49);
});

test("index 10", (): void => {
  expect(heap.weightheap[10]).toBe(50);
});

test("index 11", (): void => {
  expect(heap.weightheap[11]).toBe(51);
});

test("index 12", (): void => {
  expect(heap.weightheap[12]).toBe(52);
});

test("index 13", (): void => {
  expect(heap.weightheap[13]).toBe(61);
});
test("index 14", (): void => {
  expect(heap.weightheap[14]).toBe(62);
});

test("peek", (): void => {
  expect(heap.peek()).toBe(g);
});

test("pop", (): void => {
  expect(heap.pop()).toBe(g);
});
