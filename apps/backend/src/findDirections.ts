import { GraphNode } from "./graph.ts";
export class Directions {
  path: GraphNode[];
  constructor(path: GraphNode[]) {
    this.path = path;
  }
  /**
   * function to get an angles given 3 points, where one acts as the pivot
   * to find the angle at
   */
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

  /**
   * Function that uses getAngles on all nodes in a path
   */
  public getAngles(): string[][] {
    const path = this.path;
    const angles: number[] = [];
    const directions: string[][] = [];
    let j: number = 0;
    directions.push([]);
    //pushes that list of angles to a seperate array
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
    //puts strings in array  based on angles aray
    // uses a 2d array to seperate floor by floor instructions
    for (let i = 0; i < angles.length; i++) {
      if (angles[i] > 0 && angles[i] < 60) {
        //angles detection
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          // does it chnage floors?
          directions.push([]);
          j++;
        }
        directions[j].push("sharp left at " + this.path[i + 1].id); //message to be put into 2d array
      } else if (angles[i] >= 60 && angles[i] <= 120) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          directions.push([]);
          j++;
        }
        directions[j].push("left at " + this.path[i + 1].id);
      } else if (angles[i] > 120 && angles[i] <= 165) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          directions.push([]);
          j++;
        }
        directions[j].push("slight left at " + this.path[i + 1].id);
      } else if (angles[i] > 165 && angles[i] <= 195) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          directions.push([]);
          j++;
        }
        directions[j].push("straight at " + this.path[i + 1].id);
      } else if (angles[i] > 195 && angles[i] <= 240) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          directions.push([]);
          j++;
        }
        directions[j].push("slight right at " + this.path[i + 1].id);
      } else if (angles[i] > 240 && angles[i] <= 300) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          directions.push([]);
          j++;
        }
        directions[j].push("right at " + this.path[i + 1].id);
      } else if (angles[i] >= 300 && angles[i] < 360) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          directions.push([]);
          j++;
        }
        directions[j].push("sharp right at " + this.path[i + 1].id);
      } else if (angles[i] == 0 || angles[i] == 360) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          directions.push([]);
          j++;
        }
        directions[j].push("take elevator at  " + this.path[i + 1].id);
      }
    }
    return directions;
  }
}
