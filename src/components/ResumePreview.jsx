"use client";

import { Paper, Typography, Button } from "@mui/material";
import ResumePDF from "./ResumePDF";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ResumePreview({ resume }) {
  return (
    <Paper elevation={3} className="p-6 mt-6 rounded-lg shadow-lg">
      <Typography variant="h5" gutterBottom>
        Your AI-Generated Resume
      </Typography>

      {/* ReactMarkdown should NOT be inside Typography */}
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resume}</ReactMarkdown>
      </div>

      <ResumePDF resume={resume} />

      <Button variant="contained" color="secondary" className="mt-4">
        Edit & Regenerate
      </Button>
    </Paper>
  );
}
