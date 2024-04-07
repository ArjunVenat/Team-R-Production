import express, { Router, Request, Response } from "express";
import { Graph } from "../graph.ts";
import { PrismaClient } from "database";
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

    const path: string[] = graph.AStar(startNodeID, endNodeID);

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

    const path: string[] = graph.BFS(startNodeID, endNodeID);

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
  // Initialize the graph
  const graph = new Graph();

  // Get all the edges and nodes from the db
  const edges = await prisma.edges.findMany();

  // Add edges to the graph
  for (const edge of edges) {
    graph.addEdge(edge.StartNodeID, edge.EndNodeID);
  }

  return graph;
}
export default router;
