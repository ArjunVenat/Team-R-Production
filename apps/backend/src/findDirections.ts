import { GraphNode } from "./graph.ts";
export class Directions {
  path: GraphNode[];
  constructor(path: GraphNode[]) {
    this.path = path;
  }

  public getAngle(point1: GraphNode, center: GraphNode, point3: GraphNode) {
    //const p1c = point1.getDistance(center);
    //const p3c = point3.getDistance(center);
    const x1: number = point1.x - center.x;
    const y1: number = point1.y - center.y;
    const x2: number = point3.x - center.x;
    const y2: number = point3.y - center.y;

    let angle = Math.atan2(y1, x1) - Math.atan2(y2, x2);
    angle = angle * (180 / Math.PI);

    if (angle < 0) {
      angle += 360;
    }

    return angle;
  }

  public getAngles() {
    const path = this.path;
    const angles: number[] = [];
    const directions: string[] = [];

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
    for (let i = 0; i < angles.length; i++) {
      if (angles[i] >= 0 && angles[i] < 60) {
        directions.push("sharp left at " + this.path[i + 1].id);
      } else if (angles[i] >= 60 && angles[i] <= 120) {
        directions.push("left at " + this.path[i + 1].id);
      } else if (angles[i] > 120 && angles[i] <= 165) {
        directions.push("slight left at " + this.path[i + 1].id);
      } else if (angles[i] > 165 && angles[i] <= 195) {
        directions.push("straight at " + this.path[i + 1].id);
      } else if (angles[i] > 195 && angles[i] <= 240) {
        directions.push("slight right at " + this.path[i + 1].id);
      } else if (angles[i] > 240 && angles[i] <= 300) {
        directions.push("right at " + this.path[i + 1].id);
      } else if (angles[i] >= 300 && angles[i] < 360) {
        directions.push("sharp right at " + this.path[i + 1].id);
      }
    }
    return directions;
  }
}
