import fs from "fs";
import { PrismaClient } from "database";
import { insertEdgeIntoDB } from "./edge"; // Importing edge database functions
import { insertNodeIntoDB } from "./node";

//Prisma client constant
const prisma = new PrismaClient();

/**
 * Asyncrhonous function for reading information from a CSV file and returning
 * a promise for a 2D array of strings (rows and columns).
 * @param filePath must be a string of a .csv file path (ex. "edges.csv")
 */
export const readCSVFile = async (filePath: string): Promise<string[][]> => {
  //declaration of function
  return new Promise((resolve, reject) => {
    //output of function
    fs.readFile(filePath, "utf8", (err, data) => {
      //utf8 for character encoding, and an error callback in case stuff messes up.
      if (err) {
        reject(err);
      } else {
        // Trying to use \r\n as a delimiter
        const rows = parseCSVFile(data);

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
 * Must be of name "edges.csv" or "nodes.csv".
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
    if (sourceFilePath === "edges.csv") {
      //If we are reading edges data...
      const csvContent = edges
        .map((edge) => `${edge.StartNodeID},${edge.EndNodeID}`)
        .join("\n");
      fs.writeFileSync(destFilePath, csvContent); // Write CSV content to file
    } else if (sourceFilePath === "nodes.csv") {
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
        `Error writing to ${destFilePath}. sourceFilePath must be edges.csv or nodes.csv`,
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

/**
 * Function for processing a CSV file and inserting its contents into the PostgreSQL DB.
 * @param processFilePath Specifies what file is to be processed. Must be of names edges.csv or nodes.csv
 */
export const processFile = async (processFilePath: string) => {
  try {
    const csvData = await readCSVFile(processFilePath);
    console.log("CSV Data:", csvData);

    // Use Prisma to insert data into PostgreSQL database
    for (const row of csvData) {
      try {
        if (processFilePath === "edges.csv") {
          await insertEdgeIntoDB(row);
        } else if (processFilePath === "nodes.csv") {
          await insertNodeIntoDB(row);
        } else {
          console.log(
            `Failed to insert data. CSV not supported. Must be edges.csv or nodes.csv`,
          ); //or nodes.csv`);
        }
      } catch (error) {
        //Display error message
        console.error(
          `Could not insert data from ${processFilePath}. This record likely already exists.`,
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

/**
 * Function for parsing a CSV file and returning a 2D array of strings representing its contents
 * @param data the raw string of CSV content.
 */
export const parseCSVFile = (data: string): string[][] => {
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
  return rows;
};
