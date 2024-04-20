import express, { Router, Request, Response } from "express";
const allEmployeesRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

/**
 * Asyncrhonous function for handling an HTTP GET request for getting all Employees.
 * API route is /api/admin/allEmployees
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
allEmployeesRouter.get("/", async function (req: Request, res: Response) {
  try {
    const allEmployees = await PrismaClient.employee.findMany(); //get all employee data
    if (allEmployees.length == 0) {
      //if there is no employee data
      // Log that (it's a problem)
      console.error("No employee data found in database!");
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.status(200).json(allEmployees); //If there is valid data, send it with 200 OK
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(`Unable to get all Employee data from database`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

//Export the router.
export default allEmployeesRouter;
