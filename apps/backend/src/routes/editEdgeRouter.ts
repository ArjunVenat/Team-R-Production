import express, { Router, Request, Response } from "express";
const editEdgeRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { Edges } from "database";
import { Nodes } from "database";

/**
 * Asyncrhonous function for handling an HTTP post request for editing an edge
 * API route is /api/admin/edge/edit
 * Specified with /edgeID/changeField/newVal (e.g. /api/admin/edge/edit/AHALL00202_AHALL00302/StartNodeID/AHALL00201)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
editEdgeRouter.post(
  "/:edgeID/:changeField/:newVal",
  async function (req: Request, res: Response) {
    try {
      //Firstly, get parameters
      const edgeID: string = req.params.edgeID;
      const changeField: string = req.params.changeField;
      const newVal: string = req.params.newVal;

      //Next, determine if newVal is a node that exists by attempting to read it
      const nodeExists: Nodes | null = await PrismaClient.nodes.findUnique({
        where: {
          NodeID: newVal,
        },
      });

      //Test to see if the node exists
      if (nodeExists == null) {
        console.log(
          "newVal is not indicative of a node that currently exists!",
        );
        res.sendStatus(204);
        return;
      }

      //Now that we know the node is valid, determine if changeField is of a supported type
      if (changeField != "StartNodeID" && changeField != "EndNodeID") {
        console.log(
          "changeField is not of a supported string! Must be StartNodeID or EndNodeID",
        );
        res.sendStatus(400);
        return;
      }

      //Ensure that the edge will not be changed to map a node to itself
      let changeEdge: Edges | null = await PrismaClient.edges.findUnique({
        where: {
          EdgeID: edgeID,
        },
      });

      //Determine if the edge was found
      if (changeEdge == null) {
        console.log("No edges with ID ${edgeID} found in database!");
        res.sendStatus(204);
        return;
      }

      //Now that we know the edge exists, check for faulty edge described above
      if (changeEdge.StartNodeID == newVal || changeEdge.EndNodeID == newVal) {
        console.log(
          "Could not update edge because it would be redundant or map a node to itself.",
        );
        res.sendStatus(400);
        return;
      }

      //Next, attempt to update the indicated edge
      if (changeField == "StartNodeID") {
        changeEdge = await PrismaClient.edges.update({
          where: {
            EdgeID: edgeID,
          },
          data: {
            StartNodeID: newVal,
          },
        });
      } else {
        changeEdge = await PrismaClient.edges.update({
          where: {
            EdgeID: edgeID,
          },
          data: {
            EndNodeID: newVal,
          },
        });
      }

      //If edge was updated properly, send 200 OK
      res.sendStatus(200);
    } catch (error) {
      console.error(`Unable to update edge in database`);
      console.log(error);
      res.sendStatus(400); // Send error
      return; // Don't try to send duplicate statuses
    }
  },
);

export default editEdgeRouter;
