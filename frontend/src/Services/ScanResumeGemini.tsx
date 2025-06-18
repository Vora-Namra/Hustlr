import axios from "axios";

const API_KEY = "AIzaSyAvyWt1ce01v3HGkIcUB_zD0mI9munVhx4";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const scanResumeGemini = async (
  resumeText: string,
  jobTitle: string,
  jobDescription: string,
  aboutCompany: string
) => {
  // Truncate resume text if too long (Gemini has token limits)
  const truncatedResume = resumeText.length > 15000 
    ? resumeText.substring(0, 15000) + "... [truncated]"
    : resumeText;

  const prompt = `Analyze this resume for Applicant Tracking System (ATS) compatibility.
Provide specific, actionable feedback to improve the resume's chances of passing automated screening.

JOB TITLE: ${jobTitle}
JOB DESCRIPTION: ${jobDescription}
COMPANY INFO: ${aboutCompany}

RESUME CONTENT:
${truncatedResume}

IMPORTANT: Respond ONLY with valid JSON in this exact structure:
{
  "score": number (0-100, evaluate overall ATS compatibility),
  "missingKeywords": string[] (important job-specific keywords missing),
  "improvementSuggestions": string[] (specific actionable suggestions),
  "formattingIssues": string[] (any problematic formatting detected),
  "strengths": string[] (what's working well)
}

Key evaluation criteria:
1. Keyword optimization (match with job description)
2. Clear structure and organization
3. Quantifiable achievements
4. Professional formatting
5. Relevance to position`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      topK: 40
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_NONE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_NONE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_NONE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_NONE"
      }
    ]
  };

  const fullUrl = `${GEMINI_API_URL}?key=${API_KEY}`;

  try {
    const response = await axios.post(fullUrl, requestBody, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 30000
    });

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error("No content received from Gemini API");
    }

    // Extract JSON from the response
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}") + 1;
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("Invalid response format from Gemini");
    }

    const jsonString = content.substring(jsonStart, jsonEnd);
    const atsData = JSON.parse(jsonString);

    // Validate response structure
    if (typeof atsData.score !== "number" || !Array.isArray(atsData.improvementSuggestions)) {
      throw new Error("Invalid ATS data structure received");
    }

    return {
      score: Math.min(100, Math.max(0, atsData.score)), // Ensure score is 0-100
      missingKeywords: atsData.missingKeywords || [],
      improvementSuggestions: atsData.improvementSuggestions || [],
      formattingIssues: atsData.formattingIssues || [],
      strengths: atsData.strengths || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
      }
      throw new Error(`API request failed: ${error.message}`);
    }
    throw new Error("Failed to analyze resume: " + (error as Error).message);
  }
};