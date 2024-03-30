import express from "express";
import PrismaClient from "../bin/database-connection.ts";

const AllNodesDatarouter = express.Router();
/**
 * Route handler function to retrieve all nodes data in the Nodes table.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response containing all nodes data.
 */

AllNodesDatarouter.get("/", async (req, res) => {
  try {
    // Fetch all nodes from the database
    const allNodes = await PrismaClient.nodes.findMany();

    // If there are no nodes, return an empty array
    if (allNodes.length === 0) {
      return res.json({ allNodes: [] });
    }

    // Map the data to the desired format
    const formattedNodes = allNodes.map((node) => ({
      nodeID: node.NodeID,
      xcoord: node.Xcoord,
      ycoord: node.Ycoord,
      floor: node.Floor,
      building: node.Building,
      nodeType: node.NodeType,
      longName: node.LongName,
    }));

    // Return the formatted nodes as a 2D array
    return res.json({ allNodes: formattedNodes });
  } catch (error) {
    console.error("Error retrieving nodes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default AllNodesDatarouter;
