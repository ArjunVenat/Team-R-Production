import { expect, test } from "vitest";
import { GraphNode } from "../src/graph.ts";
import { Directions } from "../src/findDirections.ts";

const L: GraphNode[] = [];
const d = new Directions(L);

test("basic right angle, vectors same length", () => {
  const center = new GraphNode("q", 1, 1, 1);
  const s = new GraphNode("q", 0, 1, 1);
  const e = new GraphNode("q", 1, 2, 1);
  expect(d.getAngle(s, center, e)).toBe(90);
});

test("basic line, vectors same length", () => {
  const center = new GraphNode("q", 1, 1, 1);
  const s = new GraphNode("q", 1, 0, 1);
  const e = new GraphNode("q", 1, 2, 1);
  expect(d.getAngle(s, center, e)).toBe(180);
});

test("angle, vectors differnt length", () => {
  const center = new GraphNode("q", 0, 0, 1);
  const s = new GraphNode("q", -2, 2.3, 1);
  const e = new GraphNode("q", 1.3, 1.5, 1);
  expect(d.getAngle(s, center, e)).toBe(81.92347012159536);
});

test("tests a longer path", () => {
  const s = new GraphNode("q", 2275, 785, 1);
  const center1 = new GraphNode("q", 2275, 830, 1);
  const center2 = new GraphNode("q", 2275, 910, 1);
  const center3 = new GraphNode("q", 2290, 910, 1);
  const center4 = new GraphNode("q", 2385, 910, 1);
  const center5 = new GraphNode("q", 2385, 860, 1);
  const e = new GraphNode("q", 2335, 860, 1);
  d.path.push(s);
  d.path.push(center1);
  d.path.push(center2);
  d.path.push(center3);
  d.path.push(center4);
  d.path.push(center5);
  d.path.push(e);
  expect(d.getAngles()).toStrictEqual(["slight left", "left"]);
});
