import express, { Router, Request, Response } from "express";
const delServiceRequestRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

/**
 * Asyncrhonous function for handling an HTTP post request for deleting a service request.
 * API route is /api/admin/service/del
 * Specified with /requestID (e.g. /api/admin/service/del/3)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 400 BAD REQUEST) including all edge data in json format.
 * Note that the HTTP response will not be 204 due to how prisma delete works! (It throws an exception upon failure).
 */
delServiceRequestRouter.post(
  "/:requestID",
  async function (req: Request, res: Response) {
    try {
      //Firstly, get the requestID parameter
      const requestID: number = parseInt(req.params.requestID);

      //Attempt to delete the request from the table (delete will throw an exception if no record in db).
      await PrismaClient.generalRequest.delete({
        where: {
          RequestID: requestID,
        },
      });

      //If request was deleted, return 200
      res.sendStatus(200);
    } catch (error) {
      console.error("Unable to delete service request.");
      res.sendStatus(400); // and send 204, no data
      return;
    }
  },
);

//Export the router.
export default delServiceRequestRouter;
