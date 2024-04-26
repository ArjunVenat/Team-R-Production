// import { expect, test } from "vitest";
// import { Directions } from "../src/findDirections.ts";
// import * as path from "path";
// import { GraphNode } from "../src/graph.ts";
// import { GraphNode } from "../src/graph.ts";
// import { Directions } from "../src/findDirections.ts";
//
// const L: GraphNode[] = [];
// const L2: GraphNode[] = [];

// test("basic right angle, vectors same length", () => {
//   const center = new GraphNode("q", 1, 1, 1);
//   const s = new GraphNode("q", 0, 1, 1);
//   const e = new GraphNode("q", 1, 2, 1);
//   expect(d.getAngle(s, center, e)).toBe(90);
// });
//
// test("basic line, vectors same length", () => {
//   const center = new GraphNode("q", 1, 1, 1);
//   const s = new GraphNode("q", 1, 0, 1);
//   const e = new GraphNode("q", 1, 2, 1);
//   expect(d.getAngle(s, center, e)).toBe(180);
// });

// test("angle, vectors differnt length", () => {
//   const center = new GraphNode("q", 0, 0, 1);
//   const s = new GraphNode("q", -2, 2.3, 1);
//   const e = new GraphNode("q", 1.3, 1.5, 1);
//   expect(d.getAngle(s, center, e)).toBe(81.92347012159536);
// });

// test("tests a longer path", () => {
//   const d = new Directions(L);
//   const s = new GraphNode("1", 2275, 785, 1);
//
//   const center1 = new GraphNode("2", 2275, 830, 2);
//
//   const center2 = new GraphNode("3", 2275, 910, 2);
//   const center22 = new GraphNode("3", 2275, 910, 4);
//   const center3 = new GraphNode("4", 2290, 910, 1);
//   const center4 = new GraphNode("5", 2385, 910, 3);
//   const center5 = new GraphNode("6", 2385, 860, 1);
//   const e = new GraphNode("8", 2335, 860, 1);
//   d.path.push(s);
//
//   d.path.push(center1);
//
//   d.path.push(center2);
//   d.path.push(center22);
//
//   d.path.push(center3);
//   d.path.push(center4);
//   d.path.push(center5);
//   d.path.push(e);
//   expect(d.getAngles()).toStrictEqual([["left"], ["right"], ["straight"]]);
// });
//
// test("tests a longer path", () => {
//   const a = new Directions(L2);
//   const s = new GraphNode("1", 2275, 900, 1);
//   const s1 = new GraphNode("1", 2275, 780, 9);
//   const s2 = new GraphNode("1", 2275, 785, 1);
//   const s3 = new GraphNode("1", 2275, 785, 6);
//   const s4 = new GraphNode("1", 2275, 785, 1);
//
//   a.path.push(s);
//   a.path.push(s1);
//   a.path.push(s2);
//   a.path.push(s3);
//   a.path.push(s4);
//
//   expect(a.getAngles()).toStrictEqual([["left"], ["right"], ["straight"]]);
// });
//
// test("tests", () => {
//   const c = new Directions(L2);
//   const s = new GraphNode("1", 0, 0, 100);
//   const s1 = new GraphNode("1", 1, 0, 100);
//   const s2 = new GraphNode("1", 1, 1, 100);
//   const s3 = new GraphNode("1", 2, 1, 100);
//
//   c.path.push(s);
//   c.path.push(s1);
//   c.path.push(s2);
//   c.path.push(s3);
//
//   expect(c.getAngles()).toStrictEqual([["left"], ["right"], ["straight"]]);
// });
//
// test("2d array test", () => {
//   const directions: string[][] = [];
//   const p: GraphNode[] = [];
//   const s = new GraphNode("1", 0, 0, 100);
//   const s1 = new GraphNode("2", 1, 0, 100);
//   const s2 = new GraphNode("3", 1, 1, 100);
//   const s3 = new GraphNode("4", 2, 1, 100);
//   p.push(s);
//   p.push(s1);
//   p.push(s2);
//   p.push(s3);
//   const d = new Directions(p);
//   // d.directions.push([]);
//   d.directions.push([]);
//   d.directions[0].push("1");
//   d.directions.push([]);
//   d.directions[1].push("2");
//   d.directions.push([]);
//   d.directions[2].push("3");
//   d.directions.push([]);
//   d.directions[3].push("aliwufEVEawkf");
//   d.directions.push([]);
//   d.directions[4].push("alisufhEVE");
//   d.cleanDirections();
//   expect(directions).toStrictEqual([["1", "2", "3"]]);
// });
