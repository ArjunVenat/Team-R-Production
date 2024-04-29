import express, { Router, Request, Response } from "express";
const doctorFieldRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

//Export the router.

/**
 * Asyncrhonous function for handling an HTTP GET request for getting all Doctors.
 * API route is /api/admin/allDoctors
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
doctorFieldRouter.get(
  "/departments",
  async function (req: Request, res: Response) {
    try {
      const allDepts = await PrismaClient.doctor.findMany({
        select: {
          department: true,
        },
        orderBy: {
          department: "asc",
        },
        distinct: ["department"],
      }); //get all dept data
      const toReturn = allDepts.map((dept) => dept["department"]);
      console.log(toReturn);

      if (toReturn.length == 0) {
        //if there is no doctor data
        // Log that (it's a problem)
        console.error("No doctor data found in database!");
        res.sendStatus(204); // and send 204, no data
        return;
      }
      res.status(200).json(toReturn); //If there is valid data, send it with 200 OK
    } catch (error) {
      //If there was an error with the HTTP request...
      console.error(`Unable to get all Doctor data from database`);
      res.sendStatus(400); // Send error
      return; // Don't try to send duplicate statuses
    }
  },
);

doctorFieldRouter.get(
  "/languages",
  async function (req: Request, res: Response) {
    try {
      const allLanguages = await PrismaClient.doctor.findMany({
        select: {
          languages: true,
        },
        orderBy: {
          languages: "asc",
        },
        distinct: ["languages"],
      }); //get all dept data
      const toReturn = allLanguages.map((language) => language["languages"]);
      console.log(toReturn);

      if (toReturn.length == 0) {
        //if there is no doctor data
        // Log that (it's a problem)
        console.error("No doctor data found in database!");
        res.sendStatus(204); // and send 204, no data
        return;
      }
      res.status(200).json(toReturn); //If there is valid data, send it with 200 OK
    } catch (error) {
      //If there was an error with the HTTP request...
      console.error(`Unable to get all Doctor data from database`);
      res.sendStatus(400); // Send error
      return; // Don't try to send duplicate statuses
    }
  },
);
export default doctorFieldRouter;
