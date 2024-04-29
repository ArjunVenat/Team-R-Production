import express, { Router, Request, Response } from "express";
const doctorRouter: Router = express.Router();
import PrismaClient from "../bin/database-connection.ts";
import { Doctor } from "database";

// Going to be for filtering doctors
doctorRouter.get("/", async function (req: Request, res: Response) {
  try {
    const {
      nameFilter,
      departmentFilter,
      ratingMin,
      ratingMax,
      yearsWorkedMin,
      yearsWorkedMax,
      specialtyTraining,
      boardCertification,
      languages,
    } = req.query as {
      nameFilter: string;
      departmentFilter: string;
      ratingMin: string;
      ratingMax: string;
      yearsWorkedMin: string;
      yearsWorkedMax: string;
      specialtyTraining: string;
      boardCertification: string;
      languages: string[];
    };

    let { column, sortDirection } = req.query as {
      column: string;
      sortDirection: string;
    };

    if (column === undefined) {
      column = "name"; //May change to rating instead
    }

    if (sortDirection === undefined) {
      sortDirection = "asc";
    }

    const validColumns = ["name", "department", "yearsWorked", "rating"];
    const validSortDirections = ["asc", "desc"];

    if (
      !validColumns.includes(column) ||
      !validSortDirections.includes(sortDirection)
    ) {
      console.log("Invalid sorting options!");
      return res.sendStatus(400);
    }

    const orderBy = {
      [column]: sortDirection,
    };

    let doctors: Doctor[] = await PrismaClient.doctor.findMany({
      orderBy,
    });

    if (nameFilter !== undefined) {
      doctors = doctors.filter((doctor) => doctor.name.includes(nameFilter));
    }
    if (departmentFilter !== undefined) {
      doctors = doctors.filter(
        (doctor) => doctor.department === departmentFilter,
      );
    }
    if (ratingMin !== undefined) {
      doctors = doctors.filter(
        (doctor) =>
          parseFloat(doctor.rating.valueOf()) >= parseFloat(ratingMin),
      );
    }
    if (ratingMax !== undefined) {
      doctors = doctors.filter(
        (doctor) =>
          parseFloat(doctor.rating.valueOf()) <= parseFloat(ratingMax),
      );
    }
    if (yearsWorkedMin !== undefined) {
      doctors = doctors.filter(
        (doctor) => doctor.yearsWorked >= parseInt(yearsWorkedMin, 10),
      );
    }
    if (yearsWorkedMax !== undefined) {
      doctors = doctors.filter(
        (doctor) => doctor.yearsWorked <= parseInt(yearsWorkedMax, 10),
      );
    }
    if (specialtyTraining !== undefined) {
      doctors = doctors.filter(
        (doctor) => doctor.specialtyTraining === (specialtyTraining === "true"),
      );
    }
    if (boardCertification !== undefined) {
      doctors = doctors.filter(
        (doctor) =>
          doctor.boardCertification === (boardCertification === "true"),
      );
    }
    if (languages !== undefined && languages.length > 0) {
      doctors = doctors.filter((doctor) =>
        languages.every((lang) => doctor.languages.includes(lang)),
      );
    }
    res.json(doctors);
  } catch (error) {
    console.error("Unable to fetch doctors data:", error);
    res.sendStatus(500);
  }
});

export default doctorRouter;
