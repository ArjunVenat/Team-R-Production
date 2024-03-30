import { PrismaClient } from "database";

const prisma = new PrismaClient();

/**
 * Asynchronous function used to create an edge record in the Edges relation.
 * @param edgeIdCounter EdgeID field for edge record.
 * @param startNodeID StartNodeID field for edge record.
 * @param endNodeID EndNodeID field for edge record.
 */
export const createEdge = async (
  edgeIdCounter: number,
  startNodeID: string,
  endNodeID: string,
) => {
  //Create edge record in Edges table.
  await prisma.edges.create({
    data: {
      //Insert data table row (edgeID auto-incremented)
      EdgeID: edgeIdCounter,
      StartNodeID: startNodeID, //add StartNodeID to Edges table
      EndNodeID: endNodeID, //add EndNodeID to Edges table
    },
  });

  //Display successful data population message
  console.log(
    `Inserted data: StartNodeID - ${startNodeID}, endNodeID - ${endNodeID}`,
  );
};
