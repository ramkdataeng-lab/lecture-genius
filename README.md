# LectureGenius

**LectureGenius** is an AI-powered lecture companion built for the Gemini 3 Hackathon. It records lectures, generates comprehensive notes (transcripts, summaries, key points), and translates content into 20+ languages—all while syncing everything directly to your Google Drive.

## Features
- **🎙️ One-Click Recording**: Seamless audio capture.
- **🧠 Gemini 3 Intelligence**: 
  - Full Transcripts & Detailed Notes.
  - Automatic Summarization.
  - Key Takeaways extraction.
- **🌍 Universal Translator**: Instantly translate notes into top 20 global languages.
- **📂 Google Drive Sync**: Recordings and notes are automatically uploaded to your personal Drive.
- **🔐 Secure Auth**: Sign in with your Google Account.

## Getting Started

### 1. Prerequisites
- Node.js 18+ installed.
- A Google Cloud Project with **Google Drive API** enabled.
- An API Key for **Google Gemini** (via Google AI Studio).

### 2. Environment Setup
Create a `.env.local` file in the root directory with the following keys:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string # execute `openssl rand -base64 32` to generate
GOOGLE_CLIENT_ID=your_google_cloud_client_id
GOOGLE_CLIENT_SECRET=your_google_cloud_client_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Google Cloud Configuration
1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a New Project.
3.  Enable **Google Drive API**.
4.  Configure **OAuth Consent Screen** (User Type: External for testing).
5.  Create **OAuth 2.0 Client ID** credentials.
    -   **Authorized JavaScript origins**: `http://localhost:3000`
    -   **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
6.  Copy Client ID and Secret to `.env.local`.

### 4. Installation & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to start using the app.

## Tech Stack
-   **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide Icons.
-   **Backend**: Next.js API Routes (Serverless).
-   **AI**: Google Gemini Pro 1.5 (Multimodal).
-   **Auth**: NextAuth.js (Google Provider).
-   **Storage**: Google Drive API.

## Project Structure
-   `src/app/page.tsx`: Landing Page & Dashboard.
-   `src/app/record/page.tsx`: Recording Interface.
-   `src/app/api/process-lecture`: Backend logic for Gemini & Drive uploads.
-   `src/lib/gemini.ts`: AI interaction logic.
-   `src/lib/drive.ts`: Google Drive helper functions.
