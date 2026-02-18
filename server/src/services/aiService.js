import { GoogleGenerativeAI } from "@google/generative-ai";



export async function parseTaskWithAI(input) {
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  if (!input) {
    throw new Error("Input text is required");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", 
     generationConfig: {
    temperature: 0,
  },
  });

  const prompt = `
You are a strict JSON extraction engine.

Convert the following natural language task into JSON.

Rules:
- Return ONLY valid JSON.
- No explanation.
- No markdown.
- Keys: title, dueDate, notes
- dueDate must be ISO 8601 (UTC) or null
- notes must be string

Current date: ${new Date().toISOString()}

User input:
"${input}"

Return JSON only.
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (
    typeof parsed.title !== "string" ||
    !("dueDate" in parsed) ||
    !("notes" in parsed)
    ) {
    throw new Error("AI returned invalid structure");
    }
    return parsed;
  } 
  catch (err) {
    console.error("Invalid JSON from Gemini:", cleaned);
    throw new Error("AI parsing failed");
  }
}
