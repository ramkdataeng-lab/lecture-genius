const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // For identifying available models
    // Note: The SDK doesn't have a direct listModels method on the client instance in some versions, 
    // but we can try a simple generation to see if 'gemini-pro' works as a fallback.
    // Or we can just use the REST API via fetch to list models.

    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error fetching models:", error);
    }
}

listModels();
