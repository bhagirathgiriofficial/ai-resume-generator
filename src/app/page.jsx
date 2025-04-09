"use client";
import { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { Container, Typography, Paper } from "@mui/material";

export default function Home() {
  const [generatedResume, setGeneratedResume] = useState("");

  const handleGenerate = async (formData) => {
    setGeneratedResume("");
    const response = await fetch("/api/generateResume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setGeneratedResume(data.resume);
  };

  return (
    <Container maxWidth="md" className="py-10">
      <Paper elevation={3} className="p-8 rounded-xl shadow-lg">
        <Typography variant="h4" align="center" gutterBottom>
          AI Resume Generator
        </Typography>
        <ResumeForm onGenerate={handleGenerate} />
      </Paper>

      {generatedResume && (
        <ResumePreview resume={generatedResume} />
      )}
    </Container>
  );
}
