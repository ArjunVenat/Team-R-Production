import { expect, test, beforeAll } from "vitest";
import { readCSVFile } from "../src/fileUtils.ts";
import { Graph } from "../src/graph.ts";

const graph = new Graph();

beforeAll(async () => {
  const nodeData = await readCSVFile("apps/backend/nodes.csv");

  // Insert nodes into DB
  for (const row of nodeData) {
    const [nodeID, xcoord, ycoord, floor] = row;
    let floornum = -99999;
    switch (floor) {
      case "3": {
        floornum = 300;
        break;
      }
      case "2": {
        floornum = 200;
        break;
      }
      case "1": {
        floornum = 100;
        break;
      }
      case "L1": {
        floornum = -100;
        break;
      }
      case "L2": {
        floornum = -200;
        break;
      }
    }
    // Cast string to number
    graph.addNode(nodeID, +xcoord, +ycoord, floornum);
  }

  const edgeData = await readCSVFile("apps/backend/edges.csv");

  // Insert edges into DB
  for (const row of edgeData) {
    graph.addEdge(row[1], row[2]);
  }
});

test("pathfind to self", () => {
  expect(graph.AStar("IREST00403", "IREST00403")).toEqual(
    graph.BFS("IREST00403", "IREST00403"),
  );
  // expect(graph.BFS("WELEV00HL1", "IREST00403")).toBe(false);
});

test("longer test", () => {
  expect(graph.AStar("WELEV00HL1", "IREST00403")).toEqual(
    graph.BFS("WELEV00HL1", "IREST00403"),
  );
  // expect(graph.BFS("WELEV00HL1", "IREST00403")).toBe(false);
});
