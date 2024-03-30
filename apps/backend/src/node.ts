import { PrismaClient } from "database";

const prisma = new PrismaClient();

/**
 * Asynchronous function used to create a node record in the Nodes relation.
 * @param nodeID NodeID field for node record.
 * @param xcoord Xcoord field for node record.
 * @param ycoord Ycoord field for node record.
 * @param floor Floor field for node record.
 * @param building Building field for node record.
 * @param nodeType NodeType field for node record.
 * @param longName LongName field for node record.
 * @param shortName ShortName field for node record.
 */
export const createNode = async (
  nodeID: string,
  xcoord: string,
  ycoord: string,
  floor: string,
  building: string,
  nodeType: string,
  longName: string,
  shortName: string,
) => {
  //Create node record in Nodes table.
  await prisma.nodes.create({
    data: {
      NodeID: nodeID,
      Xcoord: xcoord,
      Ycoord: ycoord,
      Floor: floor,
      Building: building,
      NodeType: nodeType,
      LongName: longName,
      ShortName: shortName,
    },
  });

  //Display successful data population message
  console.log(
    `Inserted data: NodeID - ${nodeID}, Xcoord - ${xcoord}, Ycoord - ${ycoord}, Floor - ${floor}, Building - ${building}, NodeType - ${nodeType}, LongName - ${longName}, ShortName - ${shortName}`,
  );
};
