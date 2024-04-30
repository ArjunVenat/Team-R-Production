import React, { useState, useEffect } from "react";
import axios from "axios";
import swoosh from "../assets/swoosh.png";
import {
  Autocomplete,
  Slider,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Doctor } from "database";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GetColorblindColors } from "../components/colorblind.ts";

import { useTranslation } from "react-i18next";
export default function PDMPage() {
  const [department, setDepartment] = useState<string | null>(null);
  const [rating, setRating] = useState<[number, number]>([0, 5]);
  const [language, setLanguage] = useState<string | null>(null);
  const [certificationPref, setCertificationPref] = useState<boolean>(false);
  const [boardCertification, setBoardCertification] = useState<boolean>(false);
  const { t } = useTranslation();
  const [departments, setDepartments] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await axios.get("/api/pdm/field/departments");
        if (response.data) {
          setDepartments(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    }
    fetchDepartments();
  }, []);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await axios.get("/api/pdm/field/languages");
        if (response.data) {
          setLanguages(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch languages", error);
      }
    }
    fetchLanguages();
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    const params = {
      departmentFilter: department,
      ratingMin: rating[0],
      ratingMax: rating[1],
      language: language ? language[0] : null,
      specialtyTraining: certificationPref,
      boardCertification: boardCertification,
    };

    axios
      .get("/api/pdm/filter", { params })
      .then((response) => {
        // Handle the response here
        console.log(response.data);
        setDoctorData(response.data);
      })
      .catch((error) => {
        // Handle the error here
        console.error("Failed to fetch data", error);
      });
  };

  let arrayDoctors;
  if (doctorData) {
    arrayDoctors = doctorData.map((doctor: Doctor) => (
      <TableRow
        key={doctor.userID}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{doctor.userID}</TableCell>
        <TableCell>{doctor.name}</TableCell>
        <TableCell>{doctor.department}</TableCell>
        <TableCell>{doctor.yearsWorked}</TableCell>
        <TableCell>{doctor.rating.valueOf()}</TableCell>
        <TableCell>{doctor.specialtyTraining ? "Yes" : "No"}</TableCell>
        <TableCell>{doctor.boardCertification ? "Yes" : "No"}</TableCell>
        <TableCell>{doctor.languages}</TableCell>
      </TableRow>
    ));
  }
  return (
    <div className="flex flex-grow flex-col justify-center h-screen bg-primary pt-8">
      {/*<div className="bg-primary pb-8"></div>*/}
      <div
        className="flex flex-col text-center  bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${swoosh})`,
          backgroundColor: "white",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          className="text-primary"
          sx={{
            fontSize: "1.7rem",
            fontWeight: "bold",
          }}
        >
          {t("Find a Doctor")}
        </Typography>
        <div className="container mx-auto h-1/3 px-4">
          <form
            onSubmit={handleFormSubmit}
            className="mt-4 space-y-4 justify-center w-full"
          >
            <div className="flex flex-row space-x-4 justify-center">
              <Autocomplete
                sx={{
                  width: "300px",
                  backgroundColor: "white",
                }}
                value={department}
                onChange={(event, newValue) => {
                  setDepartment(newValue);
                }}
                options={departments}
                renderInput={(params) => (
                  <TextField {...params} label={t("Department")} />
                )}
              />
              <Autocomplete
                sx={{
                  width: "300px",
                  backgroundColor: "white",
                }}
                value={language}
                onChange={(event, newValue) => {
                  setLanguage(newValue);
                }}
                options={languages}
                renderInput={(params) => (
                  <TextField {...params} label={t("Language")} />
                )}
              />
            </div>

            <div className="flex flex-col items-center space-x-2 w-1/2 mx-auto">
              <Typography>{t("Select Rating Range")}</Typography>
              <Slider
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue as [number, number]);
                }}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.5}
                marks={[
                  { value: 0, label: "0" },
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                ]}
                aria-labelledby="range-slider"
                sx={{
                  color: "#012d5a",
                  "& .MuiSlider-markLabel": {
                    color: "text.primary",
                  },
                }}
              />
            </div>

            <FormGroup>
              <div className="flex flex-row justify-center w-1/2 mx-auto">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={certificationPref}
                      onChange={(e) => setCertificationPref(e.target.checked)}
                    />
                  }
                  label={t("Certification Preference")}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={boardCertification}
                      onChange={(e) => setBoardCertification(e.target.checked)}
                    />
                  }
                  label={t("Board Certification")}
                />
              </div>
            </FormGroup>

            <div className="w-1/2 ml-auto">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: GetColorblindColors().color4,
                  color: "white",
                  "&:hover": {
                    backgroundColor: GetColorblindColors().color3,
                    color: GetColorblindColors().color4,
                  },
                }}
              >
                {t("Submit")}
              </Button>
            </div>
          </form>
          <Box className="flex-grow mt-8">
            <TableContainer className="w-full h-[50vh] overflow-auto">
              <Table className="min-w-full" aria-label="simple table">
                <TableHead className="sticky top-0 bg-[#677c8f] text-white">
                  <TableRow className="bg-[#677c8f] text-white">
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("User ID")}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("Name")}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("Department")}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("Years Worked")}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("Rating")}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("Specialty Training")}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("Board Certification")}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {t("Languages")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{
                    borderWidth: 2,
                    borderColor: "white",
                    backgroundColor: "rgb(103,124,143, 0.15)",
                  }}
                >
                  {arrayDoctors}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </div>
    </div>
  );
}
