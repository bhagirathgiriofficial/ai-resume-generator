import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { name, experience, skills, jobTitle } = await req.json();
    const prompt = `Generate a professional resume in  format for a ${jobTitle} position. Include the following information:

    Name: ${name}
    Experience: ${experience}
    Skills: ${skills}
    Job Title: ${jobTitle}

Keep the formatting consistent and professional and printable.
Do not include placeholder text like "Phone Number" or "Email Address".
Format skills into clear categories like Languages, Frameworks, etc.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const resume = response.text();

    return Response.json({ resume });
  } catch (error) {
    console.log(error.message);
    return Response.json({ error: "Error generating resume" }, { status: 500 });
  }
}
