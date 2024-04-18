import express, { Router, Request, Response } from "express";
const addEdgeRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { Edges, Nodes } from "database";

/**
 * Asyncrhonous function for handling an HTTP put request for adding a edge.
 * API route is /api/admin/edge/add
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
addEdgeRouter.put("/", async function (req: Request, res: Response) {
  try {
    //Get the received Edge
    console.log(req.body);
    const receivedEdge: Edges = req.body;

    //Determine if the startNode exists
    const startNodeExists: Nodes | null = await PrismaClient.nodes.findUnique({
      where: {
        NodeID: receivedEdge.StartNodeID,
      },
    });

    //Determine if the startNode exists
    const endNodeExists: Nodes | null = await PrismaClient.nodes.findUnique({
      where: {
        NodeID: receivedEdge.EndNodeID,
      },
    });

    //Test to see if the node exists
    if (startNodeExists == null || endNodeExists == null) {
      console.log(
        "a given node is not indicative of a node that currently exists!",
      );
      res.sendStatus(204);
      return;
    }

    //Determine if given nodes are the same (identifying a redundant edge)
    if (receivedEdge.StartNodeID == receivedEdge.EndNodeID) {
      console.log(
        "given edge is redundant. This means that it maps a node to itself and is considered invalid.",
      );
      res.sendStatus(400);
      return;
    }

    //Determine if there is already an edge that exists
    const alikeEdgeExists: Edges | null = await PrismaClient.edges.findFirst({
      where: {
        StartNodeID: receivedEdge.StartNodeID,
        EndNodeID: receivedEdge.EndNodeID,
      },
    });

    //Test to see if the edge already exists
    if (alikeEdgeExists != null) {
      console.log("The given edge already exists!");
      res.sendStatus(400);
      return;
    }

    //Attempt to add edge to database, If this fails, the edge likely already exists in the database.
    await PrismaClient.edges.create({
      data: receivedEdge,
    });

    //If sent OK, sent 200 OK status
    console.log(`Added edge to database!`);
    res.status(200).json({
      message: "added edge to db",
    });
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(`Unable to enter edge data to database`);
    console.log(error);
    res.sendStatus(400); // Send error
  }
});

export default addEdgeRouter;
