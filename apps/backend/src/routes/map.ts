import express, { Router, Request, Response } from "express";
import Graph from "../graph.ts";
// import { Prisma } from "database";
// import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// Whenever a get request is made, return the shortest path
router.get("/pathfind", async function (req: Request, res: Response) {
  const graph = new Graph();

  // TODO: Add all nodes to graph

  // TODO: Add all edges to graph

  const path: string[] = graph.BFS(req.body.startNodeID, req.body.endNodeID);
  // const path = ["this", "is", "a", "fake", "path", "for", "testing"];

  // Check if the path is empty
  if (path.length === 0) {
    res.sendStatus(204); // and send 204, no data
  } else {
    res.send(JSON.stringify({ pathNodeIDs: path }));
  }
});

export default router;
