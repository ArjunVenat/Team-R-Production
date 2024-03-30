import fs from "fs";
import { PrismaClient } from "database";
import { createEdge } from "./edge"; // Importing edge database functions
import { createNode } from "./node";

//Prisma client constant
const prisma = new PrismaClient();

/**
 * Asyncrhonous function for reading information from a CSV file and returning
 * a promise for a 2D array of strings (rows and columns).
 *
 * @param filePath must be a string of a .csv file path (ex. "L1Edges.csv")
 */
export const readCSVFile = (filePath: string): Promise<string[][]> => {
  //declaration of function
  return new Promise((resolve, reject) => {
    //output of function
    fs.readFile(filePath, "utf8", (err, data) => {
      //utf8 for character encoding, and an error callback in case stuff messes up.
      if (err) {
        reject(err);
      } else {
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

        // We still have no data, reject the promise
        if (rows.length == 0) {
          reject("The given csv is empty or delimited improperly");
        }

        resolve(rows);
      }

      //takes data from csv, converts it from csv to normal text using \r\n as a newline delimiter and a
      //comma as an item separator and adds it to a created array.
    });
  });
};

/**
 * Asyncrhonous function for writing a CSV file at destination destFilePath from a database specified by sourceFilePath.
 * See important note about sourceFilePath parameter.
 * @param sourceFilePath used ONLY to specify what type of data is being retrieved from the database (edges or nodes).
 * Must be of name "L1Edges.csv" or "L1Nodes.csv".
 * @param destFilePath used to print database data to a .csv file destination. Must be a string denoting a .csv file.
 */
export const writeCSVFile = async (
  sourceFilePath: string,
  destFilePath: string,
) => {
  try {
    // This is inefficient, but we get all records for both edges and nodes, then use sourceFilePath to decide which we want to use

    // Fetches data from edges and nodes concurrently.
    // Note that Promise.all fails fast, so if any of the promises reject, the entire promise rejects
    // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel

    // Functionally equivalent to the following code, if no promises reject.
    // const edges = await prisma.edges.findMany(); // Retrieve all edges from the database
    // const nodes = await prisma.nodes.findMany(); // Retrieve all nodes from the database

    const [edges, nodes] = await Promise.all([
      await prisma.edges.findMany(),
      await prisma.nodes.findMany(),
    ]);

    //Check for no data
    if (edges.length === 0 && nodes.length == 0) {
      console.log("No data found in the database.");
      return;
    }

    //use sourceFilePath to determine which relation to use (edges or nodes)
    if (sourceFilePath === "L1Edges.csv") {
      //If we are reading edges data...
      const csvContent = edges
        .map((edge) => `${edge.StartNodeID},${edge.EndNodeID}`)
        .join("\n");
      fs.writeFileSync(destFilePath, csvContent); // Write CSV content to file
    } else if (sourceFilePath === "L1Nodes.csv") {
      //If we are reading nodes data...
      const csvContent = nodes
        .map(
          (node) =>
            `${node.NodeID},${node.Xcoord},${node.Ycoord},${node.Floor},${node.Building},${node.NodeType},${node.LongName},${node.ShortName}`,
        )
        .join("\n");
      fs.writeFileSync(destFilePath, csvContent); // Write CSV content to file
    } else {
      //sourceFilePath is neither of the above...
      console.log(
        `Error writing to ${destFilePath}. sourceFilePath must be L1Edges.csv or L1Nodes.csv`,
      );
      await prisma.$disconnect();
      return;
    }

    //Print completion message and disconnect from prisma
    console.log(`Data written to CSV file: ${destFilePath}`);
  } catch (error) {
    console.error("Error writing to CSV file:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const processFile = async (processFilePath: string) => {
  try {
    const csvData = await readCSVFile(processFilePath);
    console.log("CSV Data:", csvData);

    // Use Prisma to insert data into PostgreSQL database
    let edgeIdCounter: number = 1;
    for (const row of csvData) {
      try {
        if (processFilePath === "L1Edges.csv") {
          const [startNodeID, endNodeID] = row; //Parse each row of the .csv file into startNodeID and endNodeID
          await createEdge(edgeIdCounter, startNodeID, endNodeID);
          edgeIdCounter = edgeIdCounter + 1;
        } else if (processFilePath === "L1Nodes.csv") {
          const [
            nodeID,
            xcoord,
            ycoord,
            floor,
            building,
            nodeType,
            longName,
            shortName,
          ] = row; //Parse each row of the .csv file into startNodeID and endNodeID
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
          console.log(
            `Failed to insert data. CSV not supported. Must be L1Edges.csv`,
          ); //or L1Nodes.csv`);
        }
      } catch (error) {
        //Display error message
        console.error(
          `Error inserting data from ${processFilePath}. This record likely already exists.`,
        );
      }
    }
    //Display complete population message and disconnect from prisma
    console.log(
      "Data from CSV file inserted into PostgreSQL database successfully.",
    );
  } catch (error) {
    //Display error message
    console.error("Error processing CSV file:", error);
  } finally {
    // Close Prisma client connection
    await prisma.$disconnect();
  }
};
