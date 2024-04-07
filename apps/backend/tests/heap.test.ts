import { expect, test } from "vitest";
import minHeap from "../src/heap.ts";
import { GraphNode } from "../src/graph.ts";

//const weightheap: Array<number> = new Array<number>;
// const g = new GraphNode("test", 2, 2, 2); //graph nodes to test with
const g2 = new GraphNode("test", 4, 6, 2);

const heap = new minHeap();

//TEST BATCHES: different ways of populating the heap
//test batch 1. No repeat numbers
/*
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
*/
//heap.delete(g2);

//test batch 2 repeat numbers
/*
heap.insert(g2, 10);
heap.insert(g2, 10);
heap.insert(g2, 27);
heap.insert(g2, 27);
heap.insert(g2, 15);
heap.insert(g2, 15);
heap.insert(g2, 10);
*/
//Test batch 3. Worst case scenario insert

heap.insert(g2, 100);
heap.insert(g2, 99);
heap.insert(g2, 98);
heap.insert(g2, 97);
heap.insert(g2, 96);
heap.insert(g2, 95);
heap.insert(g2, 94);
heap.insert(g2, 93);
heap.insert(g2, 92);
heap.insert(g2, 91);
heap.insert(g2, 90);
heap.insert(g2, 89);
heap.insert(g2, 88);
heap.insert(g2, 87);
heap.insert(g2, 86);

//TESTS: change the toBe of each index test to be what you expect to test heap order
test("node", (): void => {
  expect(heap.nodeheap[0]).toBe(g2);
});
test("index 0", (): void => {
  expect(heap.weightheap[0]).toBe(86);
});

test("index 1", (): void => {
  expect(heap.weightheap[1]).toBe(91);
});

test("index 2", (): void => {
  expect(heap.weightheap[2]).toBe(87);
});

test("index 3", (): void => {
  expect(heap.weightheap[3]).toBe(94);
});

test("index 4", (): void => {
  expect(heap.weightheap[4]).toBe(92);
});

test("index 5", (): void => {
  expect(heap.weightheap[5]).toBe(90);
});

test("index 6", (): void => {
  expect(heap.weightheap[6]).toBe(88);
});

test("index 7", (): void => {
  expect(heap.weightheap[7]).toBe(100);
});

test("index 8", (): void => {
  expect(heap.weightheap[8]).toBe(97);
});

test("index 9", (): void => {
  expect(heap.weightheap[9]).toBe(98);
});

test("index 10", (): void => {
  expect(heap.weightheap[10]).toBe(93);
});

test("index 11", (): void => {
  expect(heap.weightheap[11]).toBe(99);
});

test("index 12", (): void => {
  expect(heap.weightheap[12]).toBe(95);
});

test("index 13", (): void => {
  expect(heap.weightheap[13]).toBe(96);
});
test("index 14", (): void => {
  expect(heap.weightheap[14]).toBe(89);
});

test("peek", (): void => {
  expect(heap.peek()).toBe(g2);
});

test("pop", (): void => {
  expect(heap.pop()).toBe(g2);
});
