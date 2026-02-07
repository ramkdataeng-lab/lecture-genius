import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrCreateFolderId } from "@/lib/drive";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const folderId = await getOrCreateFolderId(session.accessToken, "LectureGenius");
        return NextResponse.json({
            folderId,
            webViewLink: `https://drive.google.com/drive/folders/${folderId}`
        });
    } catch (error) {
        console.error("Error getting folder:", error);
        return NextResponse.json({ error: "Failed to get/create drive folder" }, { status: 500 });
    }
}
