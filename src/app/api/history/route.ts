import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listFiles } from "@/lib/drive";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // If guest or no session, return empty list
        if (!session || !session.accessToken) {
            return NextResponse.json({ files: [] });
        }

        const files = await listFiles(session.accessToken);

        return NextResponse.json({ files });
    } catch (error) {
        console.error("History Error:", error);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}
