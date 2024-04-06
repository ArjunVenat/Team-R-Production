import express, { Router, Request, Response } from "express";
const serviceRequestRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { GeneralRequest } from "database";

/**
 * Asyncrhonous function for handling an HTTP post request for sending a service request.
 * API route is /api/service/create
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
serviceRequestRouter.post("/", async function (req: Request, res: Response) {
  try {
    console.log(req.body);
    const receivedRequest: GeneralRequest = req.body;
    await PrismaClient.generalRequest.create({
      data: receivedRequest,
    });
    console.log(`Added request to database!`);
    res.status(200).json({
      message: "added request to db",
    }); //successfully added data, send 200 OK
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(`Unable to enter service request data from database`);
    console.log(error);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

/**
 * Asyncrhonous function for handling an HTTP get request for getting all service requests
 * API route is /api/service/create
 * Specified with /requestType (e.g. /api/service/create/All or /api/service/create/Flowers)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
serviceRequestRouter.get(
  "/:requestType",
  async function (req: Request, res: Response) {
    try {
      // Get the request type
      const requestType: string = req.params.requestType;

      // Determine if requestType is not of a supported name
      if (
        requestType != "Security" &&
        requestType != "Sanitation" &&
        requestType != "Gift" &&
        requestType != "Medicine" &&
        requestType != "Flowers" &&
        requestType != "Religious" &&
        requestType != "Food" &&
        requestType != "All"
      ) {
        console.log("Request type is not of a supported name!");
        res.sendStatus(400);
        return;
      }

      //Now that we know that request is of a supported name, get all requests
      let allRequests: GeneralRequest[];
      if (requestType == "All") {
        allRequests = await PrismaClient.generalRequest.findMany();
      } else {
        allRequests = await PrismaClient.generalRequest.findMany({
          where: {
            RequestType: {
              equals: requestType,
            },
          },
        });
      }

      //If there is no data to be found in requests table
      if (allRequests.length == 0) {
        //if there is no request data...
        console.error("No requests data found in database!");
        res.sendStatus(204); // and send 204, no data
        return;
      }

      //Send all requests
      res.json(allRequests);
    } catch (error) {
      //If there was an error with the HTTP request...
      console.error(`Unable to get all service request data from database`);
      res.sendStatus(400); // Send error
      return; // Don't try to send duplicate statuses
    }
  },
);

//Export the router.
export default serviceRequestRouter;
