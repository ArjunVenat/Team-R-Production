import { PrismaClient } from "database";

const prisma = new PrismaClient();

/**
 * Asynchronous function used to create an edge record in the Edges relation.
 * @param edgeIdCounter EdgeID field for edge record.
 * @param startNodeID StartNodeID field for edge record.
 * @param endNodeID EndNodeID field for edge record.
 */
export const createEdge = async (
  edgeId: string,
  startNodeID: string,
  endNodeID: string,
) => {
  //Create edge record in Edges table.
  await prisma.edges.create({
    data: {
      //Insert data table row (edgeID auto-incremented)
      EdgeID: edgeId,
      StartNodeID: startNodeID, //add StartNodeID to Edges table
      EndNodeID: endNodeID, //add EndNodeID to Edges table
    },
  });

  //Display successful data population message
  console.log(
    `Inserted data: EdgeID - ${edgeId} StartNodeID - ${startNodeID}, endNodeID - ${endNodeID}`,
  );
};

export const insertEdgeIntoDB = async (row: string[]) => {
  const [edgeID, startNodeID, endNodeID] = row; //Parse each row of the .csv file into startNodeID and endNodeID
  await createEdge(edgeID, startNodeID, endNodeID);
};
