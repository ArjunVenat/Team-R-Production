import express, { Router, Request, Response } from "express";
const downloadCSVRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";

downloadCSVRouter.get(
  "/:downloadType",
  async function (req: Request, res: Response) {
    try {
      const downloadType: string = req.params.downloadType;
      let csvContent: string = "";
      if (downloadType == "Edges") {
        const edges = await PrismaClient.edges.findMany();
        csvContent = "startNodeID,endNodeID\n".concat(
          edges
            .map((edge) => `${edge.StartNodeID},${edge.EndNodeID}`)
            .join("\n"),
        );
      } else if (downloadType == "Nodes") {
        const nodes = await PrismaClient.nodes.findMany();
        csvContent =
          "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName\n".concat(
            nodes
              .map(
                (node) =>
                  `${node.NodeID},${node.Xcoord},${node.Ycoord},${node.Floor},${node.Building},${node.NodeType},${node.LongName},${node.ShortName}`,
              )
              .join("\n"),
          );
      }
      const sendBlob = new Blob([csvContent], {
        type: "text/csv;encoding:utf-8",
      });
      console.log(await sendBlob.text());
      res.send(sendBlob);
    } catch (error) {
      console.error("Unable to download data from database");
      res.sendStatus(400); // Send error
      return; // Don't try to send duplicate statuses
    }
  },
);

// downloadCSVRouter.get("/", async function (req: Request, res: Response) {
//     try {
//         const options = {
//             root: path.join(__dirname),
//         };
//         const downloadType: string = req.body;
//         await writeCSVFile(downloadType, "output.csv");
//         res.sendFile("../output.csv", options, function (err) {
//             if (err) {
//                 console.log("Error sending ", downloadType, " file");
//             } else {
//                 console.log("Sent ", downloadType, " file");
//             }
//         });
//     } catch (error) {
//         console.error(`Unable to get all edge data from database`);
//         res.sendStatus(400); // Send error
//         return; // Don't try to send duplicate statuses
//     }
// });

//Export the router.
export default downloadCSVRouter;
