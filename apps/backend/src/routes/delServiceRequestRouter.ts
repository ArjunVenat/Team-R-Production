import express, { Router, Request, Response } from "express";
const delServiceRequestRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

/**
 * Asyncrhonous function for handling an HTTP delete request for deleting a service request.
 * API route is /api/admin/service/del
 * Specified with /delType/requestID (e.g. /api/admin/service/del/All/0 or /api/admin/service/del/Single/3)
 * /requestID is arbitrary when delType is All (deleting all service requests).
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 400 BAD REQUEST)
 * Note that the HTTP response will not be 204 due to how prisma delete works! (It throws an exception upon failure).
 */
delServiceRequestRouter.delete(
  "/:delType/:requestID",
  async function (req: Request, res: Response) {
    try {
      //Firstly, get the parameters
      const delType: string = req.params.delType;
      const requestID: number = parseInt(req.params.requestID);

      //Check if delType is "All"
      if (delType == "All") {
        await PrismaClient.generalRequest.deleteMany();
        res.sendStatus(200);
      } else if (delType == "Single") {
        //Attempt to delete the request from the table (delete will throw an exception if no record in db).
        await PrismaClient.generalRequest.delete({
          where: {
            RequestID: requestID,
          },
        });
        //If request was deleted, return 200
        res.sendStatus(200);
      } else {
        //If delType is of an unsupported string...
        console.log(
          "delType is of an invalid string! Must be 'Single' or 'All'",
        );
        res.sendStatus(400);
      }
    } catch (error) {
      console.error("Unable to delete service request.");
      res.sendStatus(400); // and send 204, no data
      return;
    }
  },
);

//Export the router.
export default delServiceRequestRouter;
