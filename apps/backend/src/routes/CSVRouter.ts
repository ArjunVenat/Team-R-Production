import express, { Router, Request, Response } from "express";
const CSVRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import multer from "multer";
import { createNode } from "../node.ts"; // Importing node database functions
import { createEdge } from "../edge"; // Importing edge database functions
const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * Asyncrhonous function for handling an HTTP get request for downloading a CSV.
 * API route is /api/admin/csv
 * Specified with /Edges or /Nodes (e.g. /api/admin/csv/Edges)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
CSVRouter.get("/:downloadType", async function (req: Request, res: Response) {
  try {
    // Get the download type
    const downloadType: string = req.params.downloadType;
    let csvContent: string = "";
    if (downloadType == "Edges") {
      // If the downlaod type is edges...
      const edges = await PrismaClient.edges.findMany(); // Get all edges
      csvContent = "startNodeID,endNodeID\n".concat(
        // Build csvString
        edges.map((edge) => `${edge.StartNodeID},${edge.EndNodeID}`).join("\n"),
      );
    } else if (downloadType == "Nodes") {
      // If the download type is nodes...
      const nodes = await PrismaClient.nodes.findMany(); // Get all nodes
      csvContent = // Build csvString
        "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName\n".concat(
          nodes
            .map(
              (node) =>
                `${node.NodeID},${node.Xcoord},${node.Ycoord},${node.Floor},${node.Building},${node.NodeType},${node.LongName},${node.ShortName}`,
            )
            .join("\n"),
        );
    }

    //Send the CSV Content
    res.send(csvContent);
  } catch (error) {
    console.error("Unable to download data from database");
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

/**
 * Asyncrhonous function for handling an HTTP post request for uploading a CSV.
 * API route is /api/admin/csv
 * Specified with /Edges or /Nodes (e.g. /api/admin/csv/Edges)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST) including all edge data in json format.
 */
CSVRouter.post(
  "/",
  upload.single("uploadFile.csv"),
  async function (req: Request, res: Response) {
    try {
      //Check if file was sent
      if (req.file === undefined) {
        console.log("Error, no file sent");
        res.sendStatus(400);
        return;
      }

      //Now that we know file exists, get the string
      const data: string = String(req.file.buffer);

      // Trying to use \r\n as a delimiter
      let rows = data
        .split("\r\n") // Files created in windows are terminated with \r\n
        .slice(1, -1) // Remove header and trailing null value
        .map((row) => row.split(","));

      // Check if data was read, try reading with \n as a delimiter if not
      if (rows.length == 0) {
        rows = data
          .split("\n") // Files created in windows are terminated with \r\n
          .slice(1, -1) // Remove header and trailing null value
          .map((row) => row.split(","));
      }

      //If We still have no data, give an error
      if (rows.length == 0) {
        console.log("The given csv is empty or delimited improperly");
        res.sendStatus(400);
        return;
      }

      // Decide what type of CSV we are dealing with, then delete according records
      if (rows[0].length == 2) {
        await PrismaClient.edges.deleteMany({});
      } else if (rows[0].length == 8) {
        await PrismaClient.flowerRequest.deleteMany({});
        await PrismaClient.nodes.deleteMany({});
      }

      //Now, write file contents to CSV
      let edgeIdCounter = 0;
      for (const row of rows) {
        if (rows[0].length == 2) {
          const [startNodeID, endNodeID] = row; //Parse each row of the .csv file into startNodeID and endNodeID
          await createEdge(edgeIdCounter, startNodeID, endNodeID);
          edgeIdCounter = edgeIdCounter + 1;
        } else if (rows[0].length == 8) {
          //Parse each row of the .csv file into startNodeID and endNodeID
          const [
            nodeID,
            xcoord,
            ycoord,
            floor,
            building,
            nodeType,
            longName,
            shortName,
          ] = row;
          await createNode(
            nodeID,
            xcoord,
            ycoord,
            floor,
            building,
            nodeType,
            longName,
            shortName,
          );
        } else {
          res.sendStatus(400);
          console.log(
            `Failed to insert data. CSV not supported. Must be uploadFile.csv`,
          );
          return;
        }
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Unable to upload data to database");
      res.sendStatus(400); // Send error
      return; // Don't try to send duplicate statuses
    }
  },
);

//Export the router.
export default CSVRouter;
