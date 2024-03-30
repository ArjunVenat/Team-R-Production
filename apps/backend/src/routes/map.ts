import express, { Router, Request, Response } from "express";
import Graph from "../graph.ts";
import { PrismaClient } from "database";
const prisma = new PrismaClient();

const router: Router = express.Router();

// Whenever a get request is made, return the shortest path
router.get("/pathfind", async function (req: Request, res: Response) {
  const graph = new Graph();

  const edges = await prisma.edges.findMany();

  for (const edge of edges) {
    graph.addEdge(edge.StartNodeID, edge.EndNodeID);
  }
  const path: string[] = graph.BFS(req.body.startNodeID, req.body.endNodeID);

  // Check if the path is empty
  if (path.length === 0) {
    res.sendStatus(204); // and send 204, no data
  } else {
    res.send(JSON.stringify({ pathNodeIDs: path }));
  }
});

export default router;
