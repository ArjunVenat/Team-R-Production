import express, { Router, Request, Response } from "express";
const CSVRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import multer from "multer";
import { insertNodeIntoDB } from "../node.ts"; // Importing node database functions
import { insertEdgeIntoDB } from "../edge"; // Importing edge database functions
import { insertEmployeeIntoDB } from "../employee.ts"; // Importing employee database functions
import { parseCSVFile } from "../fileUtils.ts";

const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * Asyncrhonous function for handling an HTTP get request for downloading a CSV.
 * API route is /api/admin/csv
 * Specified with /Edges or /Nodes or /Employees (e.g. /api/admin/csv/Edges)
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
    } else if (downloadType == "Employee") {
      const employees = await PrismaClient.employee.findMany(); // Get all employees
      csvContent = // Build csvString
        "userID,email,emailVerified,nickname,updatedAt\n".concat(
          employees
            .map((employee) => {
              const formattedUpdatedAt = employee.updatedAt.toISOString();
              return `${employee.userID},${employee.email},${employee.emailVerified},${employee.nickname},${formattedUpdatedAt}`;
            })
            .join("\n"),
        );
    }

    //Determine if the csvContent is empty or not
    if (csvContent == "") {
      console.log("No data in databse!");
      res.sendStatus(204);
      return;
    }

    //Send the CSV Content
    csvContent = csvContent + "\n";
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
 * Specified with /Edges or /Nodes or /Employees (e.g. /api/admin/csv/Edges)
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
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

      //Determine if data is not of the right type
      if (
        !data.includes("edgeID,startNode,endNode") &&
        !data.includes(
          "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName",
        ) &&
        !data.includes("userID,email,emailVerified,nickname,updatedAt")
      ) {
        console.log(
          "File uploaded is not of the right type! Must be edges data or nodes or employees data in proper csv format",
        );
        res.sendStatus(400); //send bad request
        return;
      }

      // Trying to use \r\n as a delimiter
      const rows = parseCSVFile(data);

      //If We still have no data, give an error
      if (rows.length == 0) {
        console.log("The given csv is empty or delimited improperly");
        res.sendStatus(400);
        return;
      }

      // Decide what type of CSV we are dealing with, then delete records accordingly
      if (rows[0].length == 3) {
        await PrismaClient.edges.deleteMany({});
      } else if (rows[0].length == 8) {
        await PrismaClient.generalRequest.deleteMany({});
        await PrismaClient.nodes.deleteMany({});
      } else if (rows[0].length == 5) {
        await PrismaClient.generalRequest.deleteMany({});
        await PrismaClient.employee.deleteMany({});
      }

      //Now, write file contents to CSV
      for (const row of rows) {
        if (rows[0].length == 3) {
          await insertEdgeIntoDB(row);
        } else if (rows[0].length == 8) {
          await insertNodeIntoDB(row);
        } else if (rows[0].length == 5) {
          await insertEmployeeIntoDB(row);
        } else {
          res.sendStatus(400);
          console.log(
            `Failed to insert data. CSV not supported. Must contains Edges or Nodes data`,
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
