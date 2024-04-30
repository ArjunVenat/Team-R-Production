import React, { useState, useEffect } from "react";
import axios from "axios";
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
        setDepartments(response.data);
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
        setLanguages(response.data);
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
    console.log(params);

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

  const arrayDoctors = doctorData.map((doctor: Doctor) => (
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

  return (
    <div className="container mx-auto h-screen px-4">
      <form
        onSubmit={handleFormSubmit}
        className="space-y-4 justify-center w-1/2"
      >
        <Autocomplete
          value={department}
          onChange={(event, newValue) => {
            setDepartment(newValue);
          }}
          options={departments}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label={t("Department")} />
          )}
        />
        <div className="flex items-center space-x-2">
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
            marks
            aria-labelledby="range-slider"
          />
        </div>
        <Autocomplete
          value={language}
          onChange={(event, newValue) => {
            setLanguage(newValue);
          }}
          options={languages}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label={t("Language")} />
          )}
        />
        <FormGroup>
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
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          {t("Submit")}
        </Button>
      </form>
      <Box className="w-4/5 mx-auto">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "#677c8f",
                  color: "white",
                }}
              >
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
  );
}
