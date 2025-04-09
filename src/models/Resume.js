import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  name: String,
  resumeText: String,
});

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
