import express, { Router, Request, Response } from "express";
const delNodesRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

/**
 * Asyncrhonous function for handling an HTTP delete request for deleting all nodes.
 * API route is /api/admin/node/del
 * Specified with /delType/delID
 * (e.g. /api/admin/node/del/Single/FSERV00501 or /api/admin/node/del/All/none)
 * /delID is arbitrary when /delType is All
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
delNodesRouter.delete(
  "/:delType/:delID",
  async function (req: Request, res: Response) {
    try {
      //Firstly, get parameters
      const delType: string = req.params.delType;
      const delID: string = req.params.delID;

      //Attempt to delete al nodes in the database.
      if (delType == "All") {
        await PrismaClient.generalRequest.deleteMany();
        await PrismaClient.nodes.deleteMany();
      } else {
        await PrismaClient.nodes.delete({
          where: {
            NodeID: delID,
          },
        });
      }

      //If successfully wiped Nodes DB, send 200 OK
      res.sendStatus(200);
    } catch (error) {
      console.log("unable to clear nodes database!");
      console.log(error);
      res.sendStatus(400);
    }
  },
);

export default delNodesRouter;
