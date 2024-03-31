import express, { Router, Request, Response } from "express";
const allNodesRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

/**
 * Asyncrhonous function for handling an HTTP get rquest for getting all edges.
 * API route is /api/admin/alledges
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
allNodesRouter.get("/", async function (req: Request, res: Response) {
  try {
    const allNodes = await PrismaClient.nodes.findMany(); //get all edge data
    if (allNodes.length == 0) {
      //if there is no edge data...
      // Log that (it's a problem)
      console.error("No nodes data found in database!");
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.status(200).json(allNodes); //If there is valid data, send it with 200 OK
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(`Unable to get all edge data from database`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

//Export the router.
export default allNodesRouter;
