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
  Container,
} from "@mui/material";

export default function PDMPage() {
  const [department, setDepartment] = useState<string | null>(null);
  const [rating, setRating] = useState<[number, number]>([0, 5]);
  const [language, setLanguage] = useState<string | null>(null);
  const [certificationPref, setCertificationPref] = useState<boolean>(false);
  const [boardCertification, setBoardCertification] = useState<boolean>(false);

  const [departments, setDepartments] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

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
          options={departments}
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
          options={languages}
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
