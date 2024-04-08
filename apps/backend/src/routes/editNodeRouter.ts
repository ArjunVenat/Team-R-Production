import express, { Router, Request, Response } from "express";
const editNodeRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { Nodes } from "database";

/**
 * Asyncrhonous function for handling an HTTP post request for editing a node
 * API route is /api/admin/node/edit
 * Specified with /nodeID/changeField/newVal (e.g. /api/admin/nodeID/edit/AELEV00S01/Floor/L3)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
editNodeRouter.post(
  "/:nodeID/:changeField/:newVal",
  async function (req: Request, res: Response) {
    try {
      //Firstly, get parameters
      const nodeID: string = req.params.nodeID;
      const changeField: string = req.params.changeField;
      const newVal: string = req.params.newVal;

      //Determine if changeField is of a supported field
      if (
        changeField != "Xcoord" &&
        changeField != "Ycoord" &&
        changeField != "Floor" &&
        changeField != "Building" &&
        changeField != "NodeType" &&
        changeField != "LongName" &&
        changeField != "ShortName"
      ) {
        console.log(
          "changeField is not of a supported string! Must be Xcoord, Ycoord, Floor, Building, NodeType, LongName, or ShortName",
        );
        res.sendStatus(400);
        return;
      }

      //Next, determine if nodeID is a node that exists by attempting to read it
      let changeNode: Nodes | null = await PrismaClient.nodes.findUnique({
        where: {
          NodeID: nodeID,
        },
      });

      //Test to see if the node exists
      if (changeNode == null) {
        console.log(
          "nodeID is not indicative of a node that currently exists!",
        );
        res.sendStatus(204);
        return;
      }

      //Now that we know that changeField is of a supported type and Node exists, attempt to edit the node
      switch (changeField) {
        case "Xcoord":
          changeNode = await PrismaClient.nodes.update({
            where: {
              NodeID: nodeID,
            },
            data: {
              Xcoord: newVal,
            },
          });
          break;
        case "Ycoord":
          changeNode = await PrismaClient.nodes.update({
            where: {
              NodeID: nodeID,
            },
            data: {
              Ycoord: newVal,
            },
          });
          break;
        case "Floor":
          changeNode = await PrismaClient.nodes.update({
            where: {
              NodeID: nodeID,
            },
            data: {
              Floor: newVal,
            },
          });
          break;
        case "Building":
          changeNode = await PrismaClient.nodes.update({
            where: {
              NodeID: nodeID,
            },
            data: {
              Building: newVal,
            },
          });
          break;
        case "NodeType":
          changeNode = await PrismaClient.nodes.update({
            where: {
              NodeID: nodeID,
            },
            data: {
              NodeType: newVal,
            },
          });
          break;
        case "LongName":
          changeNode = await PrismaClient.nodes.update({
            where: {
              NodeID: nodeID,
            },
            data: {
              LongName: newVal,
            },
          });
          break;
        case "ShortName":
          changeNode = await PrismaClient.nodes.update({
            where: {
              NodeID: nodeID,
            },
            data: {
              ShortName: newVal,
            },
          });
          break;
      }

      //If node was edited OK, send 200
      res.sendStatus(200);
    } catch (error) {
      console.error(`Unable to update node in database`);
      console.log(error);
      res.sendStatus(400); // Send error
      return; // Don't try to send duplicate statuses
    }
  },
);

export default editNodeRouter;
