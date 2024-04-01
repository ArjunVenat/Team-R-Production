import express, { Router, Request, Response } from "express";
import Graph from "../graph.ts";
import { PrismaClient } from "database";
const prisma = new PrismaClient();

const router: Router = express.Router();

// Whenever a get request is made, return the shortest path
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

    // Initialize the graph
    const graph = new Graph();

    // Get all the edges from the db
    const edges = await prisma.edges.findMany();

    // Add edges to the graph
    for (const edge of edges) {
      graph.addEdge(edge.StartNodeID, edge.EndNodeID);
    }

    const path: string[] = graph.BFS(startNodeID, endNodeID);

    // Check if the path is empty
    if (path.length === 0) {
      res.sendStatus(204); // and send 204, no data
      return;
    }

    // Synchronously get data
    // const data: Nodes[] = [];
    //
    // for (const nodeID of path) {
    //   data.push(
    //     await prisma.nodes.findUniqueOrThrow({
    //       where: {
    //         NodeID: nodeID,
    //       },
    //     }),
    //   );
    // }
    // res.send(data);

    // Asynchronously get data
    // This *should* work, but uncomment the previous section if not
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

export default router;
