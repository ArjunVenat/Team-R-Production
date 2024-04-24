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
 * Specified with query params (column, sortDirection, nameFilter, typeFilter,
 * priorityFilter, locationFilter, employeefilter, dateFilter, and statusFilter)
 * column describes the column to be sorted by
 * sortDirection describes the sorting direction (asc, desc, or undefined)
 * nameFilter is the requester name to filter by (or undefined)
 * typeFilter is the request type to filter by (or undefined)
 * priorityFilter is the request priority to filter by (or undefined)
 * locationFilter is the request location node ID to filter by (or undefined)
 * employeeFilter is the request employee user ID to filter by (or undefined)
 * dateFilter is the request delivery date (expressed as a string) to filter by (or undefined)
 * statusFilter is the request status to filter by (or undefined)
 * (e.g. /api/service/create)
 * (e.g. /api/service/create?priorityFilter=High&statusFilter=Unassigned)
 * (e.g. /api/service/create?nameFilter=thom yorke&typeFilter=Gifts&priorityFilter=High&locationFilter=BDEPT00802&employeeFilter=auth0|66229c74e354a375d9a2ef58&dateFilter=2024-04-10 23:20:00.000&statusFilter=InProgress)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
serviceRequestRouter.get("/", async function (req: Request, res: Response) {
  try {
    // Get the parameters (there are many parameters)
    const {
      nameFilter,
      typeFilter,
      priorityFilter,
      locationFilter,
      employeeFilter,
      dateFilter,
      statusFilter,
    } = req.query as {
      nameFilter: string;
      typeFilter: string;
      priorityFilter: string;
      locationFilter: string;
      employeeFilter: string;
      dateFilter: string;
      statusFilter: string;
    };

    let { column, sortDirection } = req.query as {
      column: string;
      sortDirection: string;
    };

    //Determine if the parameters are correct by performing a series of checks
    if (column == undefined) {
      column = "RequestID";
    }
    if (sortDirection == undefined) {
      sortDirection = "asc";
    }

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

    if (sortDirection != "asc" && sortDirection != "desc") {
      console.log("sort direction type is not of a supported name!");
      res.sendStatus(400);
      return;
    }

    if (
      priorityFilter != "Low" &&
      priorityFilter != "Medium" &&
      priorityFilter != "High" &&
      priorityFilter != "Emergency" &&
      priorityFilter != undefined
    ) {
      console.log("priorityFilter type is not of a supported name!");
      res.sendStatus(400);
      return;
    }

    if (
      typeFilter != "Flowers" &&
      typeFilter != "Gifts" &&
      typeFilter != "Entertainment" &&
      typeFilter != "Medicine" &&
      typeFilter != "Maintenance" &&
      typeFilter != "Medical Equipment" &&
      typeFilter != undefined
    ) {
      console.log("typeFilter type is not of a supported name!");
      res.sendStatus(400);
      return;
    }

    if (
      statusFilter != "Unassigned" &&
      statusFilter != "Assigned" &&
      statusFilter != "InProgress" &&
      statusFilter != "Closed" &&
      statusFilter != undefined
    ) {
      console.log("statusFilter is not of a supported string!");
      console.log(
        "statusFilter must be Unassigned, Assigned, InProgress, or Closed",
      );
      res.sendStatus(400);
      return;
    }

    //Now that we have all the parameters, get all requests (sorted accordingly)
    let requests: GeneralRequest[] = await PrismaClient.generalRequest.findMany(
      {
        orderBy: [
          {
            [column]: sortDirection,
          },
        ],
      },
    );

    //Now, time to apply filters (if filter is not set to "All")
    if (nameFilter != undefined) {
      requests = requests.filter((req) => req.RequesterName == nameFilter);
    }
    if (typeFilter != undefined) {
      requests = requests.filter((req) => req.RequestType == typeFilter);
    }
    if (priorityFilter != undefined) {
      requests = requests.filter((req) => req.Priority == priorityFilter);
    }
    if (locationFilter != undefined) {
      requests = requests.filter((req) => req.LocationNodeID == locationFilter);
    }
    if (employeeFilter != undefined) {
      requests = requests.filter((req) => req.EmployeeID == employeeFilter);
    }
    if (dateFilter != undefined) {
      requests = requests.filter(
        (req) => req.DeliveryDate.toISOString() == dateFilter,
      );
    }
    if (statusFilter != undefined) {
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
});

//Export the router.
export default serviceRequestRouter;
