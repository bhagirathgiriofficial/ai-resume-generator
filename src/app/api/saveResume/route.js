import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Resume from "@/models/Resume"; // Adjust based on your schema/model

export async function POST(req) {
  try {
    const { userId, resumeContent } = await req.json();

    if (!userId || !resumeContent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDB(); // Ensure DB connection

    const newResume = new Resume({
      userId,
      content: resumeContent,
      createdAt: new Date(),
    });

    await newResume.save();

    return NextResponse.json({ message: "Resume saved successfully", resume: newResume });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 });
  }
}
