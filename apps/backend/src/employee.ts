import { PrismaClient } from "database";

const prisma = new PrismaClient();

/**
 * Asynchronous function used to create a node record in the Nodes relation.
 * @param userID userID field for employee record.
 * @param email email field for employee record.
 * @param emailVerified emailVerified field for employee record.
 * @param nickname nickname field for employee record.
 * @param updatedAt updatedAt field for employee record.
 */
export const createEmployee = async (
  userID: string,
  email: string,
  emailVerified: boolean,
  nickname: string,
  updatedAt: Date,
) => {
  //Create node record in Nodes table.
  await prisma.employee.create({
    data: {
      userID: userID,
      email: email,
      emailVerified: emailVerified,
      nickname: nickname,
      updatedAt: updatedAt,
    },
  });
};
export const insertEmployeeIntoDB = async (row: string[]) => {
  //Parse each row of the .csv file into Employee
  const [userID, email, emailVerified, nickname, updatedAt] = row;
  await createEmployee(
    userID,
    email,
    Boolean(emailVerified),
    nickname,
    new Date(updatedAt),
  );
};
