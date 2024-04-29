import express, { Request, Response, Router } from "express";
import { Graph } from "../graph.ts";
import { PrismaClient, Nodes } from "database";
import { algoType, findpath } from "../findpath.ts";
import { Directions } from "../findDirections.ts";

interface EdgeWeight {
  edgeID: string;
  weight: number;
}
const prisma = new PrismaClient();

const router: Router = express.Router();

// Return the shortest path when called. Defaults to A*
router.post(
  "/:algoType",
  async function (req: Request, res: Response): Promise<void> {
    const { startNodeID, endNodeID } = req.query as {
      startNodeID: string;
      endNodeID: string;
    };

    // Determine which algorithm to use for pathfinding
    let algo: algoType;
    switch (req.params.algoType) {
      case "dijkstra":
        algo = algoType.Dijkstra;
        break;
      case "bfs":
        algo = algoType.BFS;
        break;
      case "dfs":
        algo = algoType.DFS;
        break;
      case "a-star":
        algo = algoType.AStar;
        break;
      default:
        algo = algoType.AStar;
        break;
    }
    // Validate query params before continuing
    if (startNodeID == undefined || endNodeID == undefined) {
      res.status(400).send("startNodeID and/or endNodeID is required");
      return;
    }

    const graph = await createGraph();
    let parsedEdgeWeights: EdgeWeight[] | undefined;
    if (req.body.edgeWeights) {
      try {
        parsedEdgeWeights = req.body.edgeWeights;
        console.log("here rn", parsedEdgeWeights);
        parsedEdgeWeights!.forEach((edgeWeight) => {
          graph.addEdgeWeight(edgeWeight.edgeID, edgeWeight.weight);
        });
      } catch (error) {
        res.status(400).send("Invalid edgeWeights format");
        return;
      }
    }

    console.log("here 2", graph);

    //const path: string[] = graph.AStar(startNodeID, endNodeID);
    const pathDirections: string[] = findpath.doAlgo(
      graph,
      algo,
      startNodeID,
      endNodeID,
    );
    console.log(pathDirections);

    // Check if the path is empty
    if (pathDirections.length === 0) {
      res.sendStatus(204); // and send 204, no data
      return;
    }

    const dir = new Directions(
      pathDirections.map((nodeID) => Graph.nodeMap.get(nodeID)!),
    );
    const angles = dir.getAngles();

    const pathNodes: Nodes[] = await Promise.all(
      pathDirections.map(async (nodeID) => {
        return prisma.nodes.findUniqueOrThrow({
          where: {
            NodeID: nodeID,
          },
        });
      }),
    );

    res.send({
      path: pathNodes,
      directions: angles,
    });
  },
);

export async function createGraph(): Promise<Graph> {
  const floorToZMap = new Map<string, number>();
  floorToZMap.set("L2", -200);
  floorToZMap.set("L1", 0);
  floorToZMap.set("1", 200);
  floorToZMap.set("2", 400);
  floorToZMap.set("3", 600);

  // Initialize the graph
  const graph = new Graph();

  // Get all the nodes and edges and nodes from the db
  const nodes = await prisma.nodes.findMany();
  const edges = await prisma.edges.findMany();

  // Add nodes to graph
  for (const node of nodes) {
    if (node.NodeType == "STAI") {
      graph.addStairNode(
        node.NodeID,
        node.LongName,
        +node.Xcoord,
        +node.Ycoord,
        floorToZMap.get(node.Floor)!,
      );
    } else {
      graph.addNode(
        node.NodeID,
        node.LongName,
        +node.Xcoord,
        +node.Ycoord,
        floorToZMap.get(node.Floor)!,
      );
    }
  }

  // Add edges to graph
  for (const edge of edges) {
    graph.addEdge(edge.StartNodeID, edge.EndNodeID);
  }

  return graph;
}
export default router;
