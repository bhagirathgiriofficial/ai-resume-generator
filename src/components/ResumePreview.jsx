"use client";

import { Paper, Typography, Button } from "@mui/material";
import ResumePDF from "./ResumePDF";
import { MarkdownRenderer } from "@/lib/markdownParser";

export default function ResumePreview({ resume }) {
  return (
    <Paper elevation={3} className="p-6 mt-6 rounded-lg shadow-lg">
      <Typography variant="h5" gutterBottom>
        Your AI-Generated Resume
      </Typography>
      
      <div className="prose max-w-none">
        <MarkdownRenderer content={resume} />
      </div>

      <ResumePDF resume={resume} />

      <Button variant="contained" color="secondary" className="mt-4">
        Edit & Regenerate
      </Button>
    </Paper>
  );
}
