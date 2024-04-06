import express, { Router, Request, Response } from "express";
const editServiceRequestRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { GeneralRequest } from "database";

/**
 * Asyncrhonous function for handling an HTTP get request for editing the status of a service request.
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
        console.log("No requests with ID ${requestID} found in database!");
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

//NOTE:
//I'm an idiot who wrote the wrong function. The commented out code here allows to get all requests of a certain type
//(or all requests), though I don't want to delete because this is still something we'll want for later!

// editServiceRequestRouter.post("/:requestType", async function (req: Request, res: Response) {
//     try {
//         // Get the request type
//         const requestType: string = req.params.requestType;
//
//         // Determine if requestType is not of a supported name
//         if(requestType != "Security" &&
//             requestType != "Sanitation" &&
//             requestType != "Gift" &&
//             requestType != "Medicine" &&
//             requestType != "Flowers" &&
//             requestType != "Religious" &&
//             requestType != "Food" &&
//             requestType != "All") {
//             console.log("Request type is not of a supported name!");
//             res.sendStatus(400);
//             return;
//         }
//
//         //Now that we know that request is of a supported name, get all requests
//         let allRequests: GeneralRequest[] = [];
//         if(requestType == "All")  {
//             allRequests = await PrismaClient.generalRequest.findMany();
//         } else {
//             allRequests = await PrismaClient.generalRequest.findMany({
//                 where: {
//                     RequestType: {
//                         equals: requestType,
//                     },
//                 },
//             });
//         }
//
//         //If there is no data to be found in requests table
//         if (allRequests.length == 0) {
//             //if there is no request data...
//             console.error("No requests data found in database!");
//             res.sendStatus(204); // and send 204, no data
//             return;
//         }
//
//         //Send all requests
//         res.json(allRequests);
//     } catch (error) {
//         //If there was an error with the HTTP request...
//         console.error(`Unable to get all service request data from database`);
//         res.sendStatus(400); // Send error
//         return; // Don't try to send duplicate statuses
//     }
// });

//Export the router.
export default editServiceRequestRouter;
