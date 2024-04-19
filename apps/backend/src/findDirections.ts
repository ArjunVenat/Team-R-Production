import { GraphNode } from "./graph.ts";
export class Directions {
  path: GraphNode[];
  constructor(path: GraphNode[]) {
    this.path = path;
  }

  private getAngle(point1: GraphNode, center: GraphNode, point3: GraphNode) {
    const p1c = point1.getDistance(center);
    const p3c = point3.getDistance(center);
    console.log("p1c", p1c);
    console.log("p3c", p3c);
    const angle = 0;
    return angle;
  }

  public getAngles() {
    const path = this.path;
    const angles: number[] = [];

    for (let i = 0; i < path.length; i++) {
      const point1 = path[i];
      const center = path[i + 1];
      const point3 = path[i + 2];

      if (point1 && center && point3) {
        const angle = this.getAngle(point1, center, point3);
        angles.push(angle);
        console.log("findDirections", angle);
      }
    }
    return angles;
  }
}
