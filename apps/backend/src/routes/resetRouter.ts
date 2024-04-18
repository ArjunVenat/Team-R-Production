import express, { Router, Request, Response } from "express";
const resetRouter: Router = express.Router();
import { processFile, writeCSVFile } from "../fileUtils.ts";

/**
 * Asyncrhonous function for handling an HTTP put request for resetting the nodes and edges tables.
 * API route is /api/admin/reset
 * @param req HTTP request information
 * @param res HTTP response information (200 OK, 204 NO CONTENT, 400 BAD REQUEST)
 */
resetRouter.put("/", async function (req: Request, res: Response) {
  try {
    //execution of processFile() for edges
    const inFilePathEdges: string = "edges.csv"; // constant for input csv file path
    const writeFilePathEdges: string = "outputEdges.csv"; // constant for output csv file path
    processFile(inFilePathEdges).then(
      () => writeCSVFile(inFilePathEdges, writeFilePathEdges), // .then because it is asychronous and we need to do the process first then the write
    );

    //execution of processFile() for nodes
    const inFilePathNodes: string = "nodes.csv"; // constant for input csv file path
    const writeFilePathNodes: string = "outputNodes.csv"; // constant for output csv file path
    processFile(inFilePathNodes).then(() =>
      writeCSVFile(inFilePathNodes, writeFilePathNodes),
    ); // .then because it is asychronous and we need to do the process first then the write

    res.sendStatus(200); //If data reset ok, send 200 OK
  } catch (error) {
    console.log("there was an error resetting the data for nodes and edges!");
    res.sendStatus(400);
    return;
  }
});

export default resetRouter;
