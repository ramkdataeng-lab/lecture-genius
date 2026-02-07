import { google } from "googleapis";
import { Readable } from "stream";

export async function getOrCreateFolderId(accessToken: string, folderName: string, parentId?: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: "v3", auth });

    try {
        let q = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;
        if (parentId) {
            q += ` and '${parentId}' in parents`;
        }

        const res = await drive.files.list({
            q,
            fields: "files(id, name)",
        });

        if (res.data.files && res.data.files.length > 0) {
            return res.data.files[0].id!;
        } else {
            const folderMetadata: any = {
                name: folderName,
                mimeType: "application/vnd.google-apps.folder",
            };
            if (parentId) {
                folderMetadata.parents = [parentId];
            }

            const folder = await drive.files.create({
                requestBody: folderMetadata,
                fields: "id",
            });
            return folder.data.id!;
        }
    } catch (error) {
        console.error("Error finding/creating folder:", error);
        throw error;
    }
}

export async function ensureFolderHierarchy(accessToken: string, pathParts: string[]) {
    let currentParentId: string | undefined = undefined;

    for (const folderName of pathParts) {
        if (!folderName) continue;
        currentParentId = await getOrCreateFolderId(accessToken, folderName, currentParentId);
    }

    // If pathParts is empty or fails, this might return undefined.
    // We should ensure we return at least something valid or handle it.
    // If undefined, it means root, which might not be what we want for 'parents: [folderId]'.
    // But typical usage will start with 'LectureGenius'.
    return currentParentId;
}

export async function uploadToDrive(
    accessToken: string,
    fileBuffer: Buffer,
    fileName: string,
    folderNameOrId: string = "LectureGenius", // Can be name or ID now, but we prefer ID if passing hierarchy
    description: string = "",
    targetMimeType: string = "",
    useAsFolderId: boolean = false
) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    // 1. Get/Create Folder ID
    let folderId = folderNameOrId;
    if (!useAsFolderId) {
        folderId = await getOrCreateFolderId(accessToken, folderNameOrId);
    }

    // 2. Upload file inside the folder
    try {
        const fileMetadata: any = {
            name: fileName,
            parents: [folderId],
        };
        if (description) {
            fileMetadata.description = description;
        }
        if (targetMimeType) {
            fileMetadata.mimeType = targetMimeType;
        }

        // Determine source mime type
        let sourceMimeType = fileName.endsWith('.json') ? 'application/json' : 'audio/webm';
        if (targetMimeType === 'application/vnd.google-apps.document') {
            sourceMimeType = 'text/html';
        }

        // Convert Buffer to Stream
        const media = {
            mimeType: sourceMimeType,
            body: Readable.from(fileBuffer),
        };

        const file = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, webViewLink, webContentLink",
        });

        console.log("File Uploaded:", file.data.webViewLink);
        return file.data;
    } catch (error) {
        console.error("Error uploading file to Drive:", error);
        throw error;
    }
}

export async function listFiles(accessToken: string, folderName: string = "LectureGenius") {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    try {
        // 1. Find folder ID
        const qFolder = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;
        const resFolder = await drive.files.list({
            q: qFolder,
            fields: "files(id)",
        });

        if (!resFolder.data.files || resFolder.data.files.length === 0) {
            return [];
        }

        const folderId = resFolder.data.files[0].id;

        // 2. List files in folder
        // We only want JSON files (which contain the summary/metadata) or we can list all.
        // Let's list JSON notes files as they hold the summary.
        const qFiles = `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed=false`;

        const resFiles = await drive.files.list({
            q: qFiles,
            orderBy: "createdTime desc",
            pageSize: 20,
            fields: "files(id, name, createdTime, description, webViewLink, mimeType, parents)",
        });

        return resFiles.data.files || [];
    } catch (error) {
        console.error("Error listing files:", error);
        return [];
    }
}
