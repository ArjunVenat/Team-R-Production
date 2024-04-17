import express, { Router, Request, Response } from "express";
import { Graph } from "../graph.ts";
import { PrismaClient } from "database";
import { algoType, findpath } from "../findpath.ts";

const prisma = new PrismaClient();

const router: Router = express.Router();

// Return the shortest path when called. Defaults to A*
router.get(
  "/",
  async function (
    req: Request<
      object,
      object,
      object,
      {
        startNodeID?: string;
        endNodeID?: string;
      }
    >,
    res: Response,
  ): Promise<void> {
    const { startNodeID, endNodeID } = req.query;

    // Validate query params before continuing
    if (startNodeID == undefined || endNodeID == undefined) {
      res.status(400).send("startNodeID and/or endNodeID is required");
      return;
    }

    const graph = await createGraph();

    //const path: string[] = graph.AStar(startNodeID, endNodeID);
    const path: string[] = findpath.doAlgo(
      graph,
      algoType.AStar,
      startNodeID,
      endNodeID,
    );
    console.log(path);

    // Check if the path is empty
    if (path.length === 0) {
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.send(
      await Promise.all(
        path.map(async (nodeID) => {
          return prisma.nodes.findUniqueOrThrow({
            where: {
              NodeID: nodeID,
            },
          });
        }),
      ),
    );
  },
);

// Find a path to the end node using Dijkstra's
router.get(
  "/dijkstra",
  async function (
    req: Request<
      object,
      object,
      object,
      {
        startNodeID?: string;
        endNodeID?: string;
      }
    >,
    res: Response,
  ): Promise<void> {
    const { startNodeID, endNodeID } = req.query;

    // Validate query params before continuing
    if (startNodeID == undefined || endNodeID == undefined) {
      res.status(400).send("startNodeID and/or endNodeID is required");
      return;
    }

    const graph = await createGraph();

    const path: string[] = findpath.doAlgo(
      graph,
      algoType.Dijkstra,
      startNodeID,
      endNodeID,
    );
    console.log(path);

    // Check if the path is empty
    if (path.length === 0) {
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.send(
      await Promise.all(
        path.map(async (nodeID) => {
          return prisma.nodes.findUniqueOrThrow({
            where: {
              NodeID: nodeID,
            },
          });
        }),
      ),
    );
  },
);

// Find a path to the end node using a BFS
router.get(
  "/bfs",
  async function (
    req: Request<
      object,
      object,
      object,
      {
        startNodeID?: string;
        endNodeID?: string;
      }
    >,
    res: Response,
  ): Promise<void> {
    const { startNodeID, endNodeID } = req.query;

    // Validate query params before continuing
    if (startNodeID == undefined || endNodeID == undefined) {
      res.status(400).send("startNodeID and/or endNodeID is required");
      return;
    }

    const graph = await createGraph();

    const path: string[] = findpath.doAlgo(
      graph,
      algoType.BFS,
      startNodeID,
      endNodeID,
    );
    console.log(path);

    // Check if the path is empty
    if (path.length === 0) {
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.send(
      await Promise.all(
        path.map(async (nodeID) => {
          return prisma.nodes.findUniqueOrThrow({
            where: {
              NodeID: nodeID,
            },
          });
        }),
      ),
    );
  },
);

// Find a path to the end node using a DFS
router.get(
  "/dfs",
  async function (
    req: Request<
      object,
      object,
      object,
      {
        startNodeID?: string;
        endNodeID?: string;
      }
    >,
    res: Response,
  ): Promise<void> {
    const { startNodeID, endNodeID } = req.query;

    // Validate query params before continuing
    if (startNodeID == undefined || endNodeID == undefined) {
      res.status(400).send("startNodeID and/or endNodeID is required");
      return;
    }

    const graph = await createGraph();

    const path: string[] = findpath.doAlgo(
      graph,
      algoType.DFS,
      startNodeID,
      endNodeID,
    );
    console.log(path);

    // Check if the path is empty
    if (path.length === 0) {
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.send(
      await Promise.all(
        path.map(async (nodeID) => {
          return prisma.nodes.findUniqueOrThrow({
            where: {
              NodeID: nodeID,
            },
          });
        }),
      ),
    );
  },
);
async function createGraph(): Promise<Graph> {
  const floorToZMap = new Map<string, number>();
  floorToZMap.set("L1", -100);
  floorToZMap.set("L2", -200);
  floorToZMap.set("1", 100);
  floorToZMap.set("2", 200);
  floorToZMap.set("3", 300);

  // Initialize the graph
  const graph = new Graph();

  // Get all the nodes and edges and nodes from the db
  const nodes = await prisma.nodes.findMany();
  const edges = await prisma.edges.findMany();

  // Add nodes to graph
  for (const node of nodes) {
    graph.addNode(
      node.NodeID,
      +node.Xcoord,
      +node.Ycoord,
      floorToZMap.get(node.Floor)!,
    );
  }

  // Add edges to graph
  for (const edge of edges) {
    graph.addEdge(edge.StartNodeID, edge.EndNodeID);
  }

  return graph;
}
export default router;
