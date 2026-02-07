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

export async function generateLectureNotes(fileUri: string, mimeType: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an expert academic assistant. Process this audio recording of a lecture.
    
    Output JSON with the following structure:
    {
      "title": "Proposed Title of the Lecture",
      "summary": "A concise summary (TL;DR) of 3-4 sentences.",
      "key_points": ["Key point 1", "Key point 2", ...],
      "detailed_notes": "Comprehensive notes covering the entire lecture in markdown format.",
      "transcript": "Full verbatim transcript (if possible, or a very detailed walkthrough)."
    }
  `;

    const result = await model.generateContent([
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
    const prompt = `Translate the following text to ${targetLanguage}:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
}
