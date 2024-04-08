import express, { Router, Request, Response } from "express";
const editServiceRequestRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { GeneralRequest } from "database";

/**
 * Asyncrhonous function for handling an HTTP post request for editing the status of a service request.
 * API route is /api/admin/service/edit
 * Specified with /requestID and /newStatus (e.g. /api/admin/csv/3/InProgress)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
editServiceRequestRouter.post(
  "/:requestID/:newStatus",
  async function (req: Request, res: Response) {
    try {
      //Firstly, get parameters
      const requestID: number = parseInt(req.params.requestID);
      const newStatus: string = req.params.newStatus;

      //Next, make sure that newStatus is of a supported string
      if (
        newStatus != "Unassigned" &&
        newStatus != "Assigned" &&
        newStatus != "InProgress" &&
        newStatus != "Closed"
      ) {
        console.log("newStatus is not of a supported string!");
        console.log(
          "newStatus must be Unassigned, Assigned, InProgress, or Closed",
        );
        res.sendStatus(400);
        return;
      }

      //Attempt to update the request with the new status;
      const changeRequest: GeneralRequest =
        await PrismaClient.generalRequest.update({
          where: {
            RequestID: requestID,
          },
          data: {
            Status: newStatus,
          },
        });

      //Determine if there was a request found
      if (changeRequest == null) {
        console.log("No requests with given requestID found in database!");
        res.sendStatus(204);
        return;
      }

      //If request was updated, return 200
      res.sendStatus(200);
    } catch (error) {
      console.error("Unable to change status of service request.");
      res.sendStatus(400); // and send 204, no data
      return;
    }
  },
);

//Export the router.
export default editServiceRequestRouter;
