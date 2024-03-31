import express, { Router, Request, Response } from "express";
const serviceRequestRouter: Router = express.Router();
import { serviceRequest } from "common/src/serviceRequest.ts";
import PrismaClient from "../bin/database-connection.ts";
import { FlowerRequest } from "database"

serviceRequestRouter.post("/", async function (req: Request, res: Response) {
  try {
    const receivedRequest: FlowerRequest = req.body;
    await PrismaClient.flowerRequest.create({
        data: receivedRequest
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

//Export the router.
export default serviceRequestRouter;
