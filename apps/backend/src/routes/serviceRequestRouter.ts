import express, { Router, Request, Response } from "express";
const serviceRequestRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { FlowerRequest } from "database";

/**
 * Asyncrhonous function for handling an HTTP post request for sending a service request.
 * API route is /api/service/create
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
serviceRequestRouter.post("/", async function (req: Request, res: Response) {
  try {
    console.log(req.body);
    const receivedRequest: FlowerRequest = req.body;
    await PrismaClient.flowerRequest.create({
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
 * sends all service requests as a json from backend
 * database to frontend
 */
serviceRequestRouter.get(
  "/",
  async function (req: Request, res: Response): Promise<void> {
    try {
      const flowerrequests: FlowerRequest[] =
        await PrismaClient.flowerRequest.findMany();
      if (flowerrequests.length == 0) {
        //if there is no flower request data...
        // Log that (it's a problem)
        console.error("No requests data found in database!");
        res.sendStatus(204); // and send 204, no data
        return;
      }
      res.json(flowerrequests);
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
