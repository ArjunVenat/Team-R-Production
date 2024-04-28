import { PrismaClient } from "database";
const prisma = new PrismaClient();

/**
 * Asynchronous function used to create a doctor record in the Doctor relation.
 * @param userID userID field for doctor record.
 * @param name name field for doctor record.
 * @param department department field for doctor record.
 * @param yearsWorked yearsWorked field for doctor record.
 * @param rating rating field for doctor record.
 * @param specialtyTraining specialtyTraining field for doctor record.
 * @param boardCertification boardCertification field for doctor record.
 * @param languages languages field for doctor record.
 */
export const createDoctor = async (
  userID: number,
  name: string,
  department: string,
  yearsWorked: number,
  rating: number,
  specialtyTraining: boolean,
  boardCertification: boolean,
  languages: string[],
) => {
  // Create doctor record in Doctor table.
  await prisma.doctor.create({
    data: {
      userID: userID,
      name: name,
      department: department,
      yearsWorked: yearsWorked,
      rating: rating,
      specialtyTraining: specialtyTraining,
      boardCertification: boardCertification,
      languages: languages,
    },
  });
};

/**
 * Asynchronous function to insert doctor data into the database.
 * @param row Array containing doctor data from CSV row.
 */
export const insertDoctorIntoDB = async (row: string[]) => {
  // Parse each row of the CSV file into Doctor
  const [
    userID,
    name,
    department,
    yearsWorked,
    rating,
    specialtyTraining,
    boardCertification,
    languagesString,
  ] = row;

  // Convert languages string to an array
  const languages = languagesString.split(",");

  await createDoctor(
    parseInt(userID),
    name,
    department,
    parseInt(yearsWorked),
    parseFloat(rating),
    specialtyTraining.toUpperCase() === "YES" ||
      specialtyTraining.toUpperCase() === "TRUE",
    boardCertification.toUpperCase() === "YES" ||
      boardCertification.toUpperCase() === "TRUE",
    languages,
  );
};
