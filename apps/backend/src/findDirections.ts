import { GraphNode } from "./graph.ts";
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

  // public getCardDirection(start: GraphNode, end: GraphNode) {
  //   const g1: GraphNode = new GraphNode("id", start.x, start.y - 50, 1);
  // }

  /**
   * Function that uses getAngles on all nodes in a path
   */
  public getAngles(): string[][] {
    const path = this.path;
    const angles: number[] = [];
    //const directions: string[][] = [];
    let j: number = 0;
    //const i = 0;
    this.directions.push([]);
    this.directions[j].push(floorName(this.path[0].z));
    // for (let i = 0; i < 2; i++) {
    //   if (
    //     this.path[i] &&
    //     this.path[i + 1] &&
    //     this.path[i].z === this.path[i + 1].z
    //   ) {
    //       const g1 = new GraphNode(i.toString(), this.path[i].x, this.path[i].y - 50, this.path[i].z);
    //       const dir = this.getAngle(g1, this.path[i], this.path[i+1]);
    //       if(dir <= 22.5 && dir >= 337.5){
    //         this.directions[i].push("head south towards " + this.path[1]);
    //       }else if(dir > 22.5 && dir < 67.5){
    //           this.directions[i].push("head southwest towards " + this.path[1]);
    //       }else if(dir >= 67.5 && dir <= 112.5){
    //           this.directions[i].push("head west towards " + this.path[1]);
    //       }else if(dir > 112.5 && dir < 157.5){
    //           this.directions[i].push("head northwest towards " + this.path[1]);
    //       }else if(dir >= 157.5 && dir <= 202.5){
    //           this.directions[i].push("head north towards " + this.path[1]);
    //       }else if(dir > 202.5 && dir < 247.5){
    //           this.directions[i].push("head northeast towards " + this.path[1]);
    //       }else if(dir >= 247.5 && dir <= 292.5){
    //           this.directions[i].push("head east towards " + this.path[1]);
    //       }else if(dir > 292.5 && dir < 337.5){
    //           this.directions[i].push("head southeast towards " + this.path[1]);
    //       }
    //
    //   }
    // }
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
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("sharp right at " + this.path[i + 1].id); //message to be put into 2d array
      } else if (angles[i] >= 60 && angles[i] <= 120) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("right at " + this.path[i + 1].id);
      } else if (angles[i] > 120 && angles[i] <= 165) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("slight right at " + this.path[i + 1].id);
      } else if (angles[i] > 165 && angles[i] <= 195) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("straight at " + this.path[i + 1].id);
      } else if (angles[i] > 195 && angles[i] <= 240) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("slight left at " + this.path[i + 1].id);
      } else if (angles[i] > 240 && angles[i] <= 300) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("left at " + this.path[i + 1].id);
      } else if (angles[i] >= 300 && angles[i] < 360) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("sharp left at " + this.path[i + 1].id);
      } else if (angles[i] == 0 || angles[i] == 360) {
        if (path[i] && path[i - 1] && path[i].z != path[i - 1].z) {
          this.directions.push([]);
          j++;
          this.directions[j].push(floorName(this.path[i].z));
        }
        this.directions[j].push("take the elevator at  " + this.path[i + 1].id);
      }
    }
    this.cleanDirections();
    this.directions[this.directions.length - 1].push(
      "arrived at " + this.path[path.length - 1].id,
    );
    return this.directions;
  }

  public cleanDirections() {
    for (let i = 0; i < this.directions.length; i++) {
      if (this.directions[i].length >= 2) {
        if (
          this.directions[i][this.directions[i].length - 2].indexOf("ELE") !=
            -1 ||
          this.directions[i][this.directions[i].length - 2].indexOf("STAI") !=
            -1
        ) {
          this.directions[i].pop();
        }
      }
      if (this.directions[i].length >= 3) {
        if (
          this.directions[i][this.directions[i].length - 3].indexOf("ELE") !=
            -1 ||
          this.directions[i][this.directions[i].length - 3].indexOf("STAI") !=
            -1
        ) {
          this.directions[i].pop();
        }
      }
      if (
        this.directions[i][this.directions[i].length - 1].indexOf("ELE") !=
          -1 ||
        this.directions[i][this.directions[i].length - 1].indexOf("STAI") != -1
      ) {
        this.directions[i].pop();
      }
    }
    //if(this.directions[0][1]) {
    if (
      this.directions[0].length == 1 //&&
      //(this.directions[0][1].indexOf("ELE") != -1 ||
      //this.directions[0][1].indexOf("STAI") != -1)
    ) {
      //this.directions[0].pop();
      if (this.path[0].id.indexOf("ELEV")) {
        this.directions[0].push("take the elevator at " + this.path[0].id);
      } else if (this.path[0].id.indexOf("STAI")) {
        this.directions[0].push(
          "take the stairs/escalator at " + this.path[0].id,
        );
      }
    }
  }
  //}
}

//Helper function for inserting floor name
const floorName = (zVal: number) => {
  switch (zVal) {
    case 300: {
      return "Third Floor";
    }
    case 200: {
      return "Second Floor";
    }
    case 100: {
      return "First Floor";
    }
    case -100: {
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
