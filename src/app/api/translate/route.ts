import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { translateContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { text, targetLanguage } = await req.json();

        if (!text || !targetLanguage) {
            return NextResponse.json({ error: "Missing text or targetLanguage" }, { status: 400 });
        }

        const translatedText = await translateContent(text, targetLanguage);

        return NextResponse.json({ translation: translatedText });
    } catch (error) {
        console.error("Translation Error:", error);
        return NextResponse.json({ error: "Translation failed" }, { status: 500 });
    }
}
