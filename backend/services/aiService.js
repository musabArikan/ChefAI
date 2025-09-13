import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
const GEMINI_KEY = process.env.GEMINI_KEY;
console.log("Gemini Key:", GEMINI_KEY);

export async function getAiSuggestion(userPrompt, menuList, exclude) {
  const prompt = `
You are a smart food assistant. Here is the menu: ${menuList.join(", ")}.
User wants: ${userPrompt}
${exclude ? `Previously suggested: ${exclude}. Do not suggest this again.` : ""}
Suggest the most suitable dish from the menu. Only return the dish name, nothing else.
`;

  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_KEY}`, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    const suggestion =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return suggestion || "No suggestion found";
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    return "AI service error";
  }
}
