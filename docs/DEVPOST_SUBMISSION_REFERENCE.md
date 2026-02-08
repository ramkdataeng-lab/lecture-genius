# LectureGenius - Devpost Submission Quick Reference

## 📝 PROJECT STORY

### About the project (Inspiration, What it does, How we built it, Challenges, Accomplishments, What we learned, What's next)

Copy from `submission-guide.html` or use this:

---

**## Inspiration**

Education should have no boundaries. We noticed many students—especially international ones—struggle to keep up with fast-paced lectures in a non-native language. We wanted to build a tool that not only records notes but actively breaks down language barriers, empowering any local student to access global knowledge without fear of missing out.

**## What it does**

LectureGenius is an AI-powered educational companion with a social mission: to democratize access to knowledge.

It records live lectures with a **real-time audio visualizer** and **live captions** that show what you're saying as you speak, providing instant visual feedback that the recording is working.

Using Google Gemini 3 (Flash), it instantly generates transcripts, summaries, and key takeaways. More importantly, it features a **Universal Translator** with **automatic translation** that converts these notes into over 50 languages based on your default language setting.

By saving everything as neatly formatted Google Docs directly in the user's Drive, it allows students to focus on listening and understanding, rather than frantically taking notes.

**## How we built it**

We built the frontend with **Next.js 14** and **Tailwind CSS** for a modern, responsive "Glassmorphism" UI.

The **live audio visualizer** uses the Web Audio API (AudioContext and AnalyserNode) to create real-time frequency visualizations with smooth canvas animations. The **live captions** leverage the Web Speech Recognition API for instant transcription as you speak.

The core intelligence is powered by **Google Gemini 3.0 Flash**, using its multimodal capabilities to process audio files directly without needing a separate speech-to-text step.

For storage and authentication, we used **NextAuth.js** with Google Provider and the **Google Drive API**. This allows the app to be "serverless" regarding user data—users own their data in their own Drive.

**## Challenges we ran into**

Getting the Google Drive API permissions correct for creating folders and files on behalf of the user was tricky. We also had to ensure that the large audio blobs from the browser were handled efficiently before being sent to Gemini for processing. Formatting the markdown output from Gemini into a clean HTML structure for the Google Doc upload also required some fine-tuning.

**## Accomplishments that we're proud of**

We are most proud of the seamless "One-Click" experience. A user hits record, stops, and minutes later, a folder appears in their Drive with everything they need. The deep linking from the app's history directly to the Drive folder feels magical.

We're also proud of the **live audio visualizer and real-time captions** that provide instant feedback during recording—solving the "black box" problem where users wonder if their mic is working. The **automatic translation** feature that reads user preferences and creates translated docs without any extra clicks is another highlight.

**## What we learned**

We learned how powerful the Gemini multimodal API is—processing raw audio directly is much faster and more context-aware than traditional transcription pipelines. We also gained a deeper understanding of OAuth 2.0 scopes and the Google Drive file system structure.

**## What's next for LectureGenius**

Next, we plan to build a React Native mobile app for on-the-go recording. We also want to implement "Real-time" transcription (streaming) so users can see notes appear as the professor speaks, and add a "Flashcard Generator" feature that creates Anki decks from the lecture summaries.

---

## 🛠️ BUILT WITH

Copy this into the "Built with" field:

```
Next.js 14, React, TypeScript, Tailwind CSS, Google Gemini 3.0 Flash API, NextAuth.js, Google Drive API, Google OAuth 2.0, Web Audio API, Web Speech Recognition API, Vercel
```

---

## 🔗 "TRY IT OUT" LINKS

Add these links:

**GitHub Repository (REQUIRED):**
```
https://github.com/ramkdataeng-lab/lecture-genius
```

**Live Demo (Recommended):**
```
https://lecture-genius.vercel.app
```

**Demo Video:**
```
[Your Loom/YouTube URL after you record it]
```

---

## 📸 MEDIA

You'll need to upload:

1. **Cover Image** - Screenshot of your app (take one from the dashboard or recording page)
2. **Demo Video** - Record using Loom following the script in `submission-guide.html`
3. **Additional Screenshots** (optional) - Show the visualizer, captions, Drive integration

---

## 🏷️ TAGS/CATEGORIES

Select these when available:

- **Primary Category:** Education
- **Technologies:** 
  - Google Gemini API ✓ (REQUIRED)
  - AI/Machine Learning
  - Web Development
- **Tags:** 
  - education
  - ai
  - translation
  - accessibility
  - productivity
  - gemini
  - multimodal

---

## 📋 ADDITIONAL INFO (if asked)

**Team Members:** [Your name and any collaborators]

**Project Name:** LectureGenius

**Tagline:** Democratizing Education Globally with AI

**Elevator Pitch:**
```
An AI-powered lecture companion that records, transcribes, summarizes, and translates lectures, syncing neatly formatted Google Docs directly to your Drive.
```

---

## ⚡ GEMINI INTEGRATION DESCRIPTION (~200 words)

**COPY THIS FROM `gemini-integration.html` OR USE THIS:**

LectureGenius leverages **Google Gemini 3.0 Flash** as its core intelligence engine, making it central to every aspect of the application.

**How Gemini Powers LectureGenius:**

1. **Multimodal Audio Processing:** We use Gemini's multimodal capabilities to process raw audio files directly. Instead of using a separate speech-to-text service, we send the WebM audio blob straight to Gemini with a structured prompt, and it returns a complete JSON object containing the transcript, summary, key points, and detailed notes—all in one API call.

2. **Intelligent Summarization:** Gemini analyzes the lecture content and generates concise summaries, extracting the most important concepts and creating actionable key takeaways. This goes beyond simple transcription—it understands context and educational value.

3. **Universal Translation:** We use Gemini's translation capabilities to convert lecture notes into over 50 languages. Users can set a default language in settings, and Gemini automatically translates the summary, key points, and detailed notes, creating a separate Google Doc in their chosen language.

**Why Gemini is Essential:** Without Gemini, LectureGenius wouldn't exist. The ability to process audio, understand context, generate structured educational content, and translate seamlessly makes Gemini the perfect foundation for democratizing education globally. Its speed (Flash model) ensures students get their notes within seconds, not minutes.

---

## ✅ SUBMISSION CHECKLIST

Before clicking "Submit":

- [ ] Project Story filled out (all 7 sections)
- [ ] "Built with" technologies listed
- [ ] GitHub repository link added
- [ ] Live demo link added (after fixing Vercel deployment)
- [ ] Demo video uploaded (record this!)
- [ ] Cover image uploaded
- [ ] Gemini integration description added
- [ ] Tags/categories selected
- [ ] Reviewed for typos

---

## 🎬 NEXT IMMEDIATE STEPS:

1. **Fix Vercel deployment** (see `VERCEL_DEPLOYMENT_FIX.md`)
2. **Record demo video** (see script in `submission-guide.html`)
3. **Take screenshots** for cover image
4. **Fill out Devpost form** using this reference
5. **Submit!** 🎉

Good luck! 🚀
