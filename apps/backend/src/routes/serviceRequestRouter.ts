import express, { Router, Request, Response } from "express";
const serviceRequestRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { GeneralRequest } from "database";

/**
 * Asyncrhonous function for handling an HTTP post request for sending a service request.
 * API route is /api/service/create
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
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
 * Specified with /column/sortDirection/typeFilter/priorityFilter
 * (e.g. /api/service/create/RequestID/asc/Medical Equipment/Low or /api/service/create/LocationNodeID/desc/All/All)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
serviceRequestRouter.get(
  "/:column/:sortDirection/:typeFilter/:priorityFilter",
  async function (req: Request, res: Response) {
    try {
      // Get the parameters
      const column: string = req.params.column;
      if (
        column != "RequestID" &&
        column != "RequesterName" &&
        column != "RequestType" &&
        column != "Priority" &&
        column != "LocationNodeID" &&
        column != "Details1" &&
        column != "Details2" &&
        column != "Details3" &&
        column != "DeliveryDate" &&
        column != "Status" &&
        column != "EmployeeID"
      ) {
        console.log("column is not of a supported name!");
        res.sendStatus(400);
        return;
      }

      const sortDirection: string = req.params.sortDirection;
      if (sortDirection != "asc" && sortDirection != "desc") {
        console.log("sort direction type is not of a supported name!");
        res.sendStatus(400);
        return;
      }

      const priorityFilter: string = req.params.priorityFilter;
      // Determine if filterType is not of a supported name
      if (
        priorityFilter != "Low" &&
        priorityFilter != "Medium" &&
        priorityFilter != "High" &&
        priorityFilter != "Emergency" &&
        priorityFilter != "All"
      ) {
        console.log("priorityFilter type is not of a supported name!");
        res.sendStatus(400);
        return;
      }

      const typeFilter: string = req.params.typeFilter;
      if (
        typeFilter != "Flowers" &&
        typeFilter != "Gifts" &&
        typeFilter != "Medicine" &&
        typeFilter != "Maintenance" &&
        typeFilter != "Medical Equipment" &&
        typeFilter != "All"
      ) {
        console.log("typeFilter type is not of a supported name!");
        res.sendStatus(400);
        return;
      }

      //Now that we know that request is of a supported name, get all requests
      let allRequests: GeneralRequest[];
      if (typeFilter == "All" && priorityFilter == "All") {
        allRequests = await PrismaClient.generalRequest.findMany({
          orderBy: [
            {
              [column]: sortDirection,
            },
          ],
        });
      } else if (typeFilter == "All" && priorityFilter != "All") {
        allRequests = await PrismaClient.generalRequest.findMany({
          orderBy: [
            {
              [column]: sortDirection,
            },
          ],
          where: {
            Priority: priorityFilter,
          },
        });
      } else if (typeFilter != "All" && priorityFilter == "All") {
        allRequests = await PrismaClient.generalRequest.findMany({
          orderBy: [
            {
              [column]: sortDirection,
            },
          ],
          where: {
            RequestType: typeFilter,
          },
        });
      } else {
        allRequests = await PrismaClient.generalRequest.findMany({
          orderBy: [
            {
              [column]: sortDirection,
            },
          ],
          where: {
            Priority: priorityFilter,
            RequestType: typeFilter,
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
