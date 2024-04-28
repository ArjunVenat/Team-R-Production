import express, { Router, Request, Response } from "express";
const allDoctorsRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

/**
 * Asyncrhonous function for handling an HTTP GET request for getting all Doctors.
 * API route is /api/admin/allDoctors
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
allDoctorsRouter.get("/", async function (req: Request, res: Response) {
  try {
    const allDoctors = await PrismaClient.doctor.findMany(); //get all doctor data
    if (allDoctors.length == 0) {
      //if there is no doctor data
      // Log that (it's a problem)
      console.error("No doctor data found in database!");
      res.sendStatus(204); // and send 204, no data
      return;
    }
    res.status(200).json(allDoctors); //If there is valid data, send it with 200 OK
  } catch (error) {
    //If there was an error with the HTTP request...
    console.error(`Unable to get all Doctor data from database`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

//Export the router.
export default allDoctorsRouter;
