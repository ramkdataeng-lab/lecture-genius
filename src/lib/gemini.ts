import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

export async function uploadAudioToGemini(filePath: string, mimeType: string) {
    try {
        const uploadResult = await fileManager.uploadFile(filePath, {
            mimeType,
            displayName: "Lecture Audio",
        });
        return uploadResult.file;
    } catch (error) {
        console.error("Error uploading to Gemini:", error);
        throw error;
    }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRetry(model: any, promptParts: any[], retries = 5): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            return await model.generateContent(promptParts);
        } catch (error: any) {
            // Handle 429 (Too Many Requests) and 503 (Service Unavailable/Overloaded)
            if (error.status === 429 || error.status === 503 ||
                error.message?.includes("429") || error.message?.includes("503") ||
                error.message?.includes("Quota exceeded") || error.message?.includes("overloaded")) {
                const waitTime = (i + 1) * 4000;
                console.warn(`Gemini API Busy/Rate Limit (Attempt ${i + 1}/${retries}). Retrying in ${waitTime}ms...`);
                await delay(waitTime); // Backoff: 4s, 8s, 12s, 16s, 20s
                continue;
            }
            throw error;
        }
    }
    throw new Error("Gemini API Request Failed after multiple retries. The model might be overloaded. Please try again later.");
}

export async function generateLectureNotes(fileUri: string, mimeType: string, spokenLanguage: string = "English", targetLanguage: string = "English") {
    // Reverting to gemini-3-flash-preview as per hackathon requirements
    // Utilizing enhanced retry logic to handle 503 Overloaded errors
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an expert academic assistant. Process this audio recording of a lecture.
    The audio is spoken in ${spokenLanguage}.
    
    Output JSON with the following structure, written in ${targetLanguage}:
    {
      "title": "Proposed Title of the Lecture (in ${targetLanguage})",
      "summary": "A concise summary (TL;DR) of 3-4 sentences (in ${targetLanguage}).",
      "key_points": ["Key point 1 (in ${targetLanguage})", "Key point 2", ...],
      "detailed_notes": "Comprehensive notes covering the entire lecture in markdown format (in ${targetLanguage}).",
      "transcript": "Full verbatim transcript in the original language (${spokenLanguage})."
    }
  `;

    const result = await generateWithRetry(model, [
        {
            fileData: {
                mimeType,
                fileUri,
            },
        },
        { text: prompt },
    ]);

    return result.response.text();
}

export async function translateContent(text: string, targetLanguage: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const prompt = `
    Task: Translate the following text into ${targetLanguage}.
    Constraint: Return ONLY the translated text. Do not include any introductory or concluding remarks. Do not include the original text. Maintain the original formatting (markdown, newlines, etc.).

    Text to translate:
    ${text}
    `.trim();
    const result = await generateWithRetry(model, [prompt]);
    return result.response.text();
}

export async function translateJsonObject(jsonObj: any, targetLanguage: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview", generationConfig: { responseMimeType: "application/json" } });
    const prompt = `
    Task: Translate the *values* of the following JSON object into ${targetLanguage}.
    Constraint: Keep all keys in English. Return ONLY the JSON object. Do not translate keys.
    
    JSON to translate:
    ${JSON.stringify(jsonObj)}
    `.trim();

    // Retry logic is good here too
    const result = await generateWithRetry(model, [prompt]);
    return JSON.parse(result.response.text());
}
