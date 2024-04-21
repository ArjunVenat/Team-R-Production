import express, { Router, Request, Response } from "express";
const addEmployeeRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { Employee } from "database";

/**
 * Asyncrhonous function for handling an HTTP post request for creating an employee.
 * API route is /api/admin/employee/add
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
addEmployeeRouter.put("/", async function (req: Request, res: Response) {
  try {
    const receivedRequest: Employee = req.body;
    await PrismaClient.employee.create({
      data: receivedRequest,
    });
    console.log(`Added request to database!`);
    res.status(200).json({
      message: "added request to db",
    }); //successfully added data, send 200 OK
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(
      `Unable to enter employee from database, This employee likely already exists.`,
    );
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

export default addEmployeeRouter;
