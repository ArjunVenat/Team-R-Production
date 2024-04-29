import React, { useState } from "react";
import {
  Autocomplete,
  Slider,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  Button,
  Container,
} from "@mui/material";

export default function PDMPage() {
  const [department, setDepartment] = useState<string | null>(null);
  const [rating, setRating] = useState<[number, number]>([0, 5]);
  const [language, setLanguage] = useState<string | null>(null);
  const [certificationPref, setCertificationPref] = useState<boolean>(false);
  const [boardCertification, setBoardCertification] = useState<boolean>(false);

  const Departments: string[] = [
    "Department A",
    "Department B",
    "Department C",
    "Department D",
  ]; // Example departments
  const Languages: string[] = ["English", "Spanish", "French", "German"]; // Example languages

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      department,
      rating,
      language,
      certificationPref,
      boardCertification,
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleFormSubmit}>
        <Autocomplete
          value={department}
          onChange={(event, newValue) => {
            setDepartment(newValue);
          }}
          options={Departments}
          renderInput={(params) => <TextField {...params} label="Department" />}
        />
        <Slider
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue as [number, number]);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          marks
          aria-labelledby="range-slider"
        />
        <Autocomplete
          value={language}
          onChange={(event, newValue) => {
            setLanguage(newValue);
          }}
          options={Languages}
          renderInput={(params) => <TextField {...params} label="Language" />}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={certificationPref}
                onChange={(e) => setCertificationPref(e.target.checked)}
              />
            }
            label="Certification Preference"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={boardCertification}
                onChange={(e) => setBoardCertification(e.target.checked)}
              />
            }
            label="Board Certification"
          />
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
