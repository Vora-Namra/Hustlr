import axios from "axios";

// Replace with your valid Gemini API key
const API_KEY = "AIzaSyAvyWt1ce01v3HGkIcUB_zD0mI9munVhx4";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const scanResumeGemini = async (
  resumeText: string,
  jobTitle: string,
  jobDescription: string,
  aboutCompany: string
) => {
  // Build a prompt that includes job details and resume text
  const prompt = `Analyze this resume for ATS compatibility with the following job:

JOB TITLE: ${jobTitle}

JOB DESCRIPTION: ${jobDescription}

ABOUT COMPANY: ${aboutCompany}

RESUME: ${resumeText}

Provide a JSON response with the following structure and ONLY the JSON, no other text:
{
  "score": [a number between 0-100],
  "keywordMatch": [a number between 0-100],
  "formatScore": [a number between 0-100],
  "missingKeywords": [list of important keywords missing from resume],
  "improvementSuggestions": [list of specific suggestions to improve ATS score],
  "strongPoints": [list of resume strengths]
}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
    },
  };

  // Build the full URL with the API key
  const fullUrl = `${GEMINI_API_URL}?key=${API_KEY}`;

  try {
    const response = await axios.post(fullUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Assume the response contains candidates[0].content.parts[0].text with the JSON string
    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error("No content received from Gemini API.");
    }

    // Extract the JSON object from the text
    const startIndex = content.indexOf("{");
    const endIndex = content.lastIndexOf("}") + 1;
    const jsonString = content.substring(startIndex, endIndex);
    const atsData = JSON.parse(jsonString);
    return atsData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};