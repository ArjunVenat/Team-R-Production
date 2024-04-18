import express, { Router, Request, Response } from "express";
const delNodesRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

/**
 * Asyncrhonous function for handling an HTTP delete request for deleting all nodes.
 * API route is /api/admin/node/del
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
delNodesRouter.delete("/", async function (req: Request, res: Response) {
  try {
    //Attempt to delete al nodes in the database.
    console.log(req.body);
    await PrismaClient.generalRequest.deleteMany();
    await PrismaClient.nodes.deleteMany();

    //If successfully wiped Nodes DB, send 200 OK
    res.sendStatus(200);
  } catch (error) {
    console.log("unable to clear nodes database!");
    console.log(error);
    res.sendStatus(400);
  }
});

export default delNodesRouter;
