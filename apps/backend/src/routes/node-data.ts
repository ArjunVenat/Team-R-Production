import express, { Router, Request, Response } from "express";
const allNodesRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { Nodes } from "database";

/**
 * Asyncrhonous function for handling an HTTP get rquest for getting all edges.
 * API route is /api/admin/alledges
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
allNodesRouter.get("/:filter", async function (req: Request, res: Response) {
  try {
    //Firstly, get the parameter
    const filter: string = req.params.filter;

    //Determine if filter is of a supported string
    if (filter != "All" && filter != "NoHall") {
      console.error(
        "filter parameter is not of a supported string! Must be either All or NoHall",
      );
      res.sendStatus(400);
      return;
    }

    //Now, get all nodes depending on the filter
    let allNodes: Nodes[];
    if (filter == "All") {
      allNodes = await PrismaClient.nodes.findMany(); //get all node data
    } else {
      allNodes = await PrismaClient.nodes.findMany({
        where: {
          NodeType: {
            not: "HALL",
          },
        },
      }); //get all data
    }

    //Determine if any nodes were retrieved from database
    if (allNodes.length == 0) {
      //if there is no node data...
      // Log that (it's a problem)
      console.error("No nodes data found in database!");
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.status(200).json(allNodes); //If there is valid data, send it with 200 OK
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(`Unable to get all node data from database`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

//Export the router.
export default allNodesRouter;
