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
 * Specified with /column/sortDirection/nameFilter/typeFilter/priorityFilter/locationFilter/employeefilter/dateFilter/statusFilter
 * /column describes the column to be sorted by
 * /sortDirection describes the sorting direction (asc or desc)
 * nameFilter is the requester name to filter by (or "All")
 * typeFilter is the request type to filter by (or "All")
 * priorityFilter is the request priority to filter by (or "All")
 * locationFilter is the request location node ID to filter by (or "All")
 * employeeFilter is the request employee user ID to filter by (or "All")
 * dateFilter is the request delivery date (expressed as a string) to filter by (or "All")
 * statusFilter is the request status to filter by (or "All")
 * (e.g. /api/service/create/RequestID/asc/All/All/All/All/All/All/All)
 * (e.g. /api/service/create/DeliveryDate/desc/thom yorke/Gifts/High/WELEV00F01/google-oauth2|116542305867955288154/2024-05-04T18:17:00.000Z/InProgress)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
serviceRequestRouter.get(
  "/:column/:sortDirection/:nameFilter/:typeFilter/:priorityFilter/:locationFilter/:employeeFilter/:dateFilter/:statusFilter",
  async function (req: Request, res: Response) {
    try {
      // Get the parameters (there are many parameters)

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

      const nameFilter: string = req.params.nameFilter;

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

      const locationFilter: string = req.params.locationFilter;

      //no checks for employee filter since the userID can be anything!
      const employeeFilter: string = req.params.employeeFilter;

      const dateFilter: string = req.params.dateFilter;

      const statusFilter: string = req.params.statusFilter;
      if (
        statusFilter != "Unassigned" &&
        statusFilter != "Assigned" &&
        statusFilter != "InProgress" &&
        statusFilter != "Closed" &&
        statusFilter != "All"
      ) {
        console.log("statusFilter is not of a supported string!");
        console.log(
          "statusFilter must be Unassigned, Assigned, InProgress, or Closed",
        );
        res.sendStatus(400);
        return;
      }

      //Now that we have all the parameters, get all requests (sorted accordingly)
      let requests: GeneralRequest[] =
        await PrismaClient.generalRequest.findMany({
          orderBy: [
            {
              [column]: sortDirection,
            },
          ],
        });

      //Now, time to apply filters (if filter is not set to "All")
      if (nameFilter != "All") {
        requests = requests.filter((req) => req.RequesterName == nameFilter);
      }
      if (typeFilter != "All") {
        requests = requests.filter((req) => req.RequestType == typeFilter);
      }
      if (priorityFilter != "All") {
        requests = requests.filter((req) => req.Priority == priorityFilter);
      }
      if (locationFilter != "All") {
        requests = requests.filter(
          (req) => req.LocationNodeID == locationFilter,
        );
      }
      if (employeeFilter != "All") {
        requests = requests.filter((req) => req.EmployeeID == employeeFilter);
      }
      if (dateFilter != "All") {
        requests = requests.filter(
          (req) => req.DeliveryDate.toISOString() == dateFilter,
        );
      }
      if (statusFilter != "All") {
        requests = requests.filter((req) => req.Status == statusFilter);
      }

      //If there is no data to be found in requests table
      if (requests.length == 0) {
        //if there is no request data...
        console.error("No requests data found in database!");
        res.sendStatus(204); // and send 204, no data
        return;
      }

      //Send all requests
      res.json(requests);
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
