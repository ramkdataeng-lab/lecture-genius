import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToDrive, ensureFolderHierarchy } from "@/lib/drive";
import { uploadAudioToGemini, generateLectureNotes, translateJsonObject } from "@/lib/gemini";
import fs from "fs";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        const formData = await req.formData();
        const file = formData.get("audio") as File;
        const lectureTitle = (formData.get("title") as string) || "Untitled Lecture";
        const subject = (formData.get("subject") as string) || "General";
        const folderStructure = (formData.get("folderStructure") as string) || "date-subject"; // or "subject-date"

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Determine Folder Hierarchy
        let targetFolderId = "LectureGenius"; // Default fallback (will be resolved to ID if it stays string)
        let useAsFolderId = false;

        if (session && session.accessToken) {
            try {
                const dateStr = new Date().toISOString().split('T')[0];
                let pathParts = ["LectureGenius"];

                if (folderStructure === "subject-date") {
                    pathParts.push(subject);
                    pathParts.push(dateStr);
                } else {
                    // Default: date-subject
                    pathParts.push(dateStr);
                    pathParts.push(subject);
                }

                targetFolderId = await ensureFolderHierarchy(session.accessToken, pathParts) || "LectureGenius";
                useAsFolderId = true;
            } catch (err) {
                console.error("Error creating folder hierarchy:", err);
                // Fallback to default "LectureGenius" folder
            }
        }

        // Read file buffer once
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 2. Upload Audio to User's Google Drive (Only if logged in)
        let driveAudioFile = null;
        if (session && session.accessToken) {
            try {
                driveAudioFile = await uploadToDrive(
                    session.accessToken,
                    buffer,
                    `${lectureTitle}.webm`,
                    targetFolderId, // Use the resolved ID
                    "LectureGenius", // Description
                    "", // MimeType
                    useAsFolderId // useAsFolderId
                );
            } catch (driveError) {
                console.error("Drive Upload Error:", driveError);
            }
        }

        // 3. Process with Gemini
        // Upload to Gemini File API (Uses API Key, works for Guests too)
        const tempFilePath = path.join(os.tmpdir(), `${Date.now()}_recording.webm`);
        await fs.promises.writeFile(tempFilePath, buffer);

        const geminiFile = await uploadAudioToGemini(tempFilePath, file.type || "audio/webm");

        // Generate Notes ALWAYS in English first (Base Comprehension)
        const spokenLang = formData.get("spokenLanguage") as string || "English";
        const targetLang = formData.get("targetLanguage") as string || "English";

        // Force English for the main notes to ensure comprehension is always available in English
        let notesText = await generateLectureNotes(geminiFile.uri, geminiFile.mimeType, spokenLang, "English");

        // Clean markdown code blocks if present
        notesText = notesText.replace(/```json/g, "").replace(/```/g, "").trim();

        // 4. Save Transcript to User's Google Drive (Only if logged in)
        // Create notes object
        let notesObj;
        try {
            notesObj = JSON.parse(notesText);
        } catch (e) {
            console.error("Failed to parse notes JSON:", e);
            notesObj = { title: lectureTitle, summary: notesText, key_points: [], detailed_notes: notesText };
        }

        // --- Prepare Data for Frontend & Drive ---

        let translatedNotesData = null;
        let translatedHtml = "";

        // If a specific target language (non-English) was requested, translate the English notes
        if (targetLang && targetLang !== "English") {
            try {
                console.log(`Translating notes to ${targetLang}...`);
                translatedNotesData = await translateJsonObject(notesObj, targetLang);

                // Generate HTML for the "Translated" doc
                translatedHtml = `
                    <html>
                    <head><style>body { font-family: Arial, sans-serif; line-height: 1.6; }</style></head>
                    <body>
                        <h1>${translatedNotesData.title || notesObj.title} (${targetLang})</h1>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <hr/>
                        <h2>Summary</h2>
                        <p>${translatedNotesData.summary || ""}</p>
                        <h2>Key Points</h2>
                        <ul>${Array.isArray(translatedNotesData.key_points) ? translatedNotesData.key_points.map((p: string) => `<li>${p}</li>`).join('') : `<li>${translatedNotesData.key_points}</li>`}</ul>
                        <h2>Detailed Notes</h2>
                        <div>${(translatedNotesData.detailed_notes || "").replace(/\n/g, '<br/>')}</div>
                        <hr/>
                        <p style="color: #666; font-size: 0.8em;">Translated to ${targetLang} by LectureGenius AI</p>
                    </body>
                    </html>
                `;
            } catch (transErr) {
                console.error("Translation Failed:", transErr);
                // Fallback: Don't break the main flow, just skip translation return
            }
        }

        // 4. Save Transcript to User's Google Drive (Only if logged in)
        if (session && session.accessToken) {
            try {
                const transcriptBuffer = Buffer.from(notesText);
                const summarySnippet = notesObj.summary || "No summary available";

                // Generate Original HTML
                let htmlContent = `
                    <html>
                    <head><style>body { font-family: Arial, sans-serif; line-height: 1.6; }</style></head>
                    <body>
                        <h1>${notesObj.title || lectureTitle}</h1>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <hr/>
                        <h2>Summary</h2>
                        <p>${notesObj.summary}</p>
                        <h2>Key Points</h2>
                         <ul>
                        ${Array.isArray(notesObj.key_points) ? notesObj.key_points.map((p: string) => `<li>${p}</li>`).join('') : `<li>${notesObj.key_points}</li>`}
                        </ul>
                        <h2>Detailed Notes</h2>
                        <div>${(notesObj.detailed_notes || "").replace(/\n/g, '<br/>')}</div>
                        <hr/>
                        <p style="color: #666; font-size: 0.8em;">Generated by LectureGenius AI</p>
                    </body>
                    </html>
                `;

                // Upload JSON
                await uploadToDrive(
                    session.accessToken,
                    transcriptBuffer,
                    `${lectureTitle}_Notes.json`,
                    targetFolderId,
                    summarySnippet.substring(0, 1000),
                    "",
                    useAsFolderId
                );

                // Upload Original Doc
                await uploadToDrive(
                    session.accessToken,
                    Buffer.from(htmlContent),
                    lectureTitle,
                    targetFolderId,
                    "AI Generated Lecture Notes",
                    "application/vnd.google-apps.document",
                    useAsFolderId
                );

                // Upload Translated Doc (if exists)
                if (translatedNotesData && translatedHtml) {
                    await uploadToDrive(
                        session.accessToken,
                        Buffer.from(translatedHtml),
                        `${lectureTitle} (${targetLang})`,
                        targetFolderId,
                        "AI Translated Lecture Notes",
                        "application/vnd.google-apps.document",
                        useAsFolderId
                    );
                }

            } catch (err) {
                console.error("Transcript Drive Upload Error", err);
            }
        } else {
            console.log("Skipping Drive upload for Guest user.");
        }

        // Cleanup temp file
        await fs.promises.unlink(tempFilePath);

        return NextResponse.json({
            success: true,
            driveAudio: driveAudioFile,
            notes: notesText,
            translatedNotes: translatedNotesData
        });

    } catch (error: any) {
        console.error("Processing Error:", error);
        return NextResponse.json({
            error: error.message || String(error),
            details: String(error)
        }, { status: 500 });
    }
}
