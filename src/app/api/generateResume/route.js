import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// --- Server-Side API Route (pages/api/generate-resume.js or app/api/generate-resume/route.js) ---
export async function POST(req) {
  try {
    const { name, experience, skills, jobTitle, education, projects } = await req.json();

    // Structure experience data
    let experienceText = "";
    if (experience && Array.isArray(experience)) {
      experienceText = experience.map(exp => `
**${exp.title}** | ${exp.company} | ${exp.dates}
${exp.responsibilities.map(resp => `- ${resp}`).join('\n')}
`).join('\n\n');
    }

    // Structure skills data
    let skillsText = "";
    if (skills && typeof skills === 'object') {
      skillsText = Object.entries(skills)
        .map(([category, skillList]) => `
**${category}**
${skillList.map(skill => `- ${skill}`).join('\n')}
`).join('\n\n');
    }

    // Structure education data
    let educationText = "";
    if (education && Array.isArray(education)) {
      educationText = education.map(edu => `
**${edu.degree}** | ${edu.major} | ${edu.university} | ${edu.graduationDate}
`).join('\n\n');
    }

    // Structure projects data
    let projectsText = "";
    if (projects && Array.isArray(projects)) {
      projectsText = projects.map(proj => `
**${proj.title}**
${proj.description}
Technologies: ${proj.technologies.join(', ')}
`).join('\n\n');
    }

    const prompt = `Generate a professional and printable resume for a ${jobTitle} position using clear and concise language and Markdown formatting. Include the following information:

    **Contact Information:**
    Name: ${name}

    **Summary/Objective:** (Write a brief, impactful summary of their skills and career goals relevant to the ${jobTitle} role)

    **Experience:**
    ${experienceText}

    **Skills:**
    ${skillsText}

    **Education:**
    ${educationText}

    **Projects (Optional):**
    ${projectsText}

    Ensure the resume uses clear headings (using #), bullet points (using -), and bold text (using **) for emphasis. Do not include placeholder text.`;

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
    console.error("Error generating resume:", error.message);
    return Response.json({ error: "Error generating resume" }, { status: 500 });
  }
}