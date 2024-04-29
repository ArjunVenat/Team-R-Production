import { GraphNode } from "./graph.ts";
// import { Nodes } from "database";
// import PrismaClient from "../src/bin/database-connection.ts";
export class Directions {
  directions: string[][] = [];
  path: GraphNode[];
  constructor(path: GraphNode[]) {
    this.path = path;
    this.directions = [];
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
  public getAngles() {
    const path = this.path;
    const angles: number[] = [];
    //const directions: string[][] = [];
    let j: number = 0;
    //const i = 0;
    this.directions.push([]);
    this.directions[j].push(floorName(this.path[0].z));

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
    //puts strings in array  based on angles array
    // uses a 2d array to seperate floor by floor instructions
    for (let i = 0; i < angles.length; i++) {
      if (angles[i] > 0 && angles[i] < 60) {
        //angles detection
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          // does it chnage floors?
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("sharp right at " + this.path[i + 1].id); //message to be put into 2d array
      } else if (angles[i] >= 60 && angles[i] <= 120) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("right at " + this.path[i + 1].id);
      } else if (angles[i] > 120 && angles[i] <= 165) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("slight right at " + this.path[i + 1].id);
      } else if (angles[i] > 165 && angles[i] <= 195) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("straight at " + this.path[i + 1].id);
      } else if (angles[i] > 195 && angles[i] <= 240) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("slight left at " + this.path[i + 1].id);
      } else if (angles[i] > 240 && angles[i] <= 300) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("left at " + this.path[i + 1].id);
      } else if (angles[i] >= 300 && angles[i] < 360) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("sharp left at " + this.path[i + 1].id);
      } else if (angles[i] == 0 || angles[i] == 360) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          this.directions[j].push(
            this.floorChange(this.path[i - 1].id) +
              this.path[i - 1].id +
              " to " +
              this.path[i].id,
          );
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("take elevator at  " + this.path[i + 1].id);
      }
    }

    this.cleanDirections();
    if (angles.length == 0) {
      this.directions[this.directions.length - 1].push(
        this.floorChange(this.path[path.length - 1].id) +
          this.path[0].id +
          " to " +
          this.path[1].id,
      );
    }
    this.directions[this.directions.length - 1].push(
      "arrived at " + this.path[path.length - 1].id,
    );

    return this.directions;
  }

  public cleanDirections() {
    for (let i = 0; i < this.directions.length; i++) {
      if (this.directions[i].length > 2) {
        if (
          (this.directions[i][this.directions[i].length - 2].indexOf("ELEV") !=
            -1 ||
            this.directions[i][this.directions[i].length - 2].indexOf("STAI") !=
              -1) &&
          this.directions[i][this.directions[i].length - 2].indexOf(
            "take the",
          ) == -1
        ) {
          this.directions[i][this.directions[i].length - 2] =
            this.directions[i][this.directions[i].length - 1];
          this.directions[i].pop();
        }
      }
      if (this.directions[i].length > 2) {
        if (
          (this.directions[i][this.directions[i].length - 2].indexOf("ELEV") !=
            -1 ||
            this.directions[i][this.directions[i].length - 2].indexOf("STAI") !=
              -1) &&
          this.directions[i][this.directions[i].length - 2].indexOf(
            "take the",
          ) == -1
        ) {
          this.directions[i][this.directions[i].length - 2] =
            this.directions[i][this.directions[i].length - 1];
          this.directions[i].pop();
        }
      }
      if (this.directions[i].length > 2) {
        if (
          (this.directions[i][this.directions[i].length - 2].indexOf("ELEV") !=
            -1 ||
            this.directions[i][this.directions[i].length - 2].indexOf("STAI") !=
              -1) &&
          this.directions[i][this.directions[i].length - 2].indexOf(
            "take the",
          ) == -1
        ) {
          this.directions[i][this.directions[i].length - 2] =
            this.directions[i][this.directions[i].length - 1];
          this.directions[i].pop();
        }
      }
    }
  }

  public floorChange(type: string): string {
    if (type.includes("STAI")) {
      return "take the stairs/escalator at ";
    } else if (type.includes("ELEV")) {
      return "take the elevator at ";
    } else return "";
  }

  // async getNodeLongName(id: string): Promise<string> {
  //   const node: Nodes | null = await PrismaClient.nodes.findUnique({
  //     where: {
  //       NodeID: id,
  //     },
  //   });
  //   if (node) {
  //     return node.LongName;
  //   } else {
  //     return "";
  //   }
  // }
}

//Helper function for inserting floor name
const floorName = (zVal: number) => {
  switch (zVal) {
    case 600: {
      return "Third Floor";
    }
    case 400: {
      return "Second Floor";
    }
    case 200: {
      return "First Floor";
    }
    case 0: {
      return "Lower Level 1";
    }
    case -200: {
      return "Lower Level 2";
    }
    default: {
      return "";
    }
  }
};
