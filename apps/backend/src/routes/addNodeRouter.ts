import express, { Router, Request, Response } from "express";
const addNodeRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { Nodes } from "database";

/**
 * Asyncrhonous function for handling an HTTP put request for adding a node.
 * API route is /api/admin/node/add
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
addNodeRouter.put("/", async function (req: Request, res: Response) {
  try {
    //Get the received Node
    console.log(req.body);
    const receivedNode: Nodes = req.body;

    //Attempt to add to database
    await PrismaClient.nodes.create({
      data: receivedNode,
    });

    //If sent OK, sent 200 OK status
    console.log(`Added node to database!`);
    res.status(200).json({
      message: "added node to db",
    });
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(`Unable to enter node data to database`);
    console.log(error);
    res.sendStatus(400); // Send error
  }
});

export default addNodeRouter;
