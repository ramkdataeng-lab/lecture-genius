# 🧠 LectureGenius

**Democratizing Education Globally with AI**

[![Gemini API](https://img.shields.io/badge/Powered%20by-Gemini%203.0%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://lecture-genius.vercel.app)

> An AI-powered lecture companion that records, transcribes, summarizes, and translates lectures in real-time, syncing neatly formatted Google Docs directly to your Drive.

---

## ✨ Features

### 🎙️ **Live Audio Visualizer**
Real-time frequency visualization with animated waveforms that respond to your voice, providing instant visual feedback that recording is active.

### 💬 **Real-Time Captions**
Live speech-to-text transcription using Web Speech API shows what you're saying as you speak—like subtitles for your lecture.

### 🧠 **Gemini 3.0 Flash Intelligence**
- **Multimodal Audio Processing**: Direct audio-to-insights without separate transcription
- **Intelligent Summarization**: Context-aware summaries and key takeaways
- **Structured Output**: Clean JSON with title, summary, key points, and detailed notes

### 🌍 **Universal Translator**
- **50+ Languages**: Automatic translation to any major language
- **Smart Defaults**: Set your preferred language for automatic translation
- **Dual Output**: Original English + translated Google Docs

### 📂 **Google Drive Integration**
- **Automatic Sync**: All recordings and notes saved to your personal Drive
- **Organized Folders**: Smart folder structure by date and subject
- **Direct Links**: One-click access from app to Drive folder

### 🔐 **Secure Authentication**
- Sign in with your Google Account
- OAuth 2.0 with proper scopes
- Your data stays in YOUR Drive

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Google Cloud Project with Drive API enabled
- Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ramkdataeng-lab/lecture-genius.git
cd lecture-genius
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret  # Generate with: openssl rand -base64 32
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
```

4. **Configure Google Cloud**

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Enable **Google Drive API**
- Create **OAuth 2.0 Client ID**
- Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🎯 How It Works

1. **Record**: Click "Start Recording" and speak naturally
2. **Visualize**: Watch the live audio visualizer and real-time captions
3. **Process**: Gemini analyzes your audio and generates structured notes
4. **Translate**: Automatic translation to your default language (optional)
5. **Save**: Everything syncs to Google Drive as formatted docs

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS |
| **AI Engine** | Google Gemini 3.0 Flash (Multimodal) |
| **Audio** | Web Audio API, Web Speech Recognition API |
| **Authentication** | NextAuth.js with Google OAuth 2.0 |
| **Storage** | Google Drive API |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
lecture-genius/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Dashboard
│   │   ├── record/page.tsx          # Recording interface with visualizer
│   │   ├── settings/page.tsx        # User preferences
│   │   └── api/
│   │       ├── process-lecture/     # Gemini processing + Drive upload
│   │       ├── translate/           # Translation API
│   │       └── history/             # Fetch user's recordings
│   ├── lib/
│   │   ├── gemini.ts               # Gemini API integration
│   │   └── drive.ts                # Google Drive helpers
│   └── components/
│       └── Sidebar.tsx             # Navigation
├── public/
│   └── logo.png                    # App logo
└── .env.local                      # Environment variables
```

---

## 🌟 Key Features Explained

### Live Audio Visualizer
Uses `AudioContext` and `AnalyserNode` to create real-time frequency analysis, rendered on HTML Canvas with smooth animations.

```typescript
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
const dataArray = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(dataArray);
// Draw bars based on frequency data
```

### Real-Time Captions
Leverages the Web Speech Recognition API for instant transcription:

```typescript
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = (event) => {
  // Update captions in real-time
};
```

### Gemini Integration
Direct multimodal audio processing:

```typescript
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
const result = await model.generateContent([
  { inlineData: { mimeType: "audio/webm", data: base64Audio } },
  prompt
]);
```

---

## 🎓 Use Cases

- **Students**: Never miss a lecture detail, get notes in your native language
- **Educators**: Create accessible content for international students
- **Researchers**: Transcribe interviews and seminars automatically
- **Language Learners**: Study in one language, review in another

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🏆 Hackathon Submission

This project was built for the **Gemini API Developer Competition** on Devpost.

- **Live Demo**: [https://lecture-genius.vercel.app](https://lecture-genius.vercel.app)
- **Devpost**: [Coming Soon]
- **Demo Video**: [Watch on YouTube](https://www.youtube.com/watch?v=YoZxvtz7gfQ)

---

## 🙏 Acknowledgments

- **Google Gemini Team** for the incredible multimodal API
- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **All students worldwide** who inspired this project

---

## 📧 Contact

Built with ❤️ by [Your Name]

- GitHub: [@ramkdataeng-lab](https://github.com/ramkdataeng-lab)
- Project Link: [https://github.com/ramkdataeng-lab/lecture-genius](https://github.com/ramkdataeng-lab/lecture-genius)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with [Gemini 3.0 Flash](https://ai.google.dev/) • [Next.js](https://nextjs.org/) • [Tailwind CSS](https://tailwindcss.com/)

</div>
