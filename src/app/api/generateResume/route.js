import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { name, experience, skills, jobTitle } = await req.json();
    const prompt = `Generate a professional resume in markdown format for a ${jobTitle} position. Include the following information:

Name: ${name}
Experience: ${experience}
Skills: ${skills}

Please format the resume with the following sections, using markdown:
1. Name and contact information at the top (use ** for the name)
2. A professional summary section (marked with **Summary**)
3. Skills section (marked with **Skills**) organized by categories
4. Work Experience section (marked with **Work Experience**)
5. Education section (marked with **Education**)

Use bullet points (starting with * **) for listing skills and experiences.
Keep the formatting consistent and professional.
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
