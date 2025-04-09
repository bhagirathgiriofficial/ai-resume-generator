"use client";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function ResumeForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    skills: "",
    jobTitle: "",
    education:"",
    projects: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="grid gap-4">
      <TextField fullWidth label="Full Name" name="name" onChange={handleChange} required />
      <TextField fullWidth label="Experience" name="experience" onChange={handleChange} multiline rows={3} required />
      <TextField fullWidth label="Skills (comma-separated)" name="skills" onChange={handleChange} required />
      <TextField fullWidth label="Job Title" name="jobTitle" onChange={handleChange} required />
      <TextField fullWidth label="Education" name="education" onChange={handleChange} required />
      <TextField fullWidth label="Projects" name="projects" onChange={handleChange} required />
      

      <Button variant="contained" color="primary" type="submit" fullWidth>
        Generate Resume
      </Button>
    </Box>
  );
}
