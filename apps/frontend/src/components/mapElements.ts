import thirdFloorMap from "../assets/maps/03_thethirdfloor.png";
import secondFloorMap from "../assets/maps/02_thesecondfloor.png";
import firstFloorMap from "../assets/maps/01_thefirstfloor.png";
import lowerLevel1Map from "../assets/maps/00_thelowerlevel1.png";
import lowerLevel2Map from "../assets/maps/00_thelowerlevel2.png";

export const defaultFloor = {
  name: "First Floor",
  map: firstFloorMap,
  level: "1",
};

export const floors = [
  { name: "Third Floor", map: thirdFloorMap, level: "3" },
  { name: "Second Floor", map: secondFloorMap, level: "2" },
  { name: "First Floor", map: firstFloorMap, level: "1" },
  { name: "Lower Level 1", map: lowerLevel1Map, level: "L1" },
  { name: "Lower Level 2", map: lowerLevel2Map, level: "L2" },
];

export const pathfindingAlgorithms = [
  { name: "A*", path: "/api/map/pathfind/a-star" },
  { name: "Breadth-First Search", path: "/api/map/pathfind/bfs" },
  { name: "Depth-First Search", path: "/api/map/pathfind/dfs" },
  { name: "Dijkstra's", path: "/api/map/pathfind/dijkstra" },
];
