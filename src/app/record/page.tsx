"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import { Mic, Square, Loader2, FileCheck, ArrowLeft, Globe, Share2, Mail, MessageCircle, AlertCircle, FolderOpen, Calendar, Clock, ListMusic } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function RecordPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [recordingState, setRecordingState] = useState<
        "idle" | "recording" | "processing" | "completed"
    >("idle");
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [timer, setTimer] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [lectureTitle, setLectureTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [folderStructure, setFolderStructure] = useState("date-subject");

    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [targetLang, setTargetLang] = useState("Spanish");
    const [isTranslating, setIsTranslating] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    useEffect(() => {
        const storedStructure = localStorage.getItem("folderStructure");
        if (storedStructure) setFolderStructure(storedStructure);

        const storedLang = localStorage.getItem("defaultLanguage");
        if (storedLang) setTargetLang(storedLang);
    }, []);

    useEffect(() => {
        if (showHistory) {
            // ... (existing history fetch) ...
            setIsLoadingHistory(true);
            fetch('/api/history')
                .then(res => res.json())
                .then(data => {
                    // Filter for JSON notes which contain the summary
                    const notes = data.files?.filter((f: any) => f.name.endsWith('_Notes.json')) || [];
                    setHistory(notes);
                })
                .catch(err => console.error(err))
                .finally(() => setIsLoadingHistory(false));
        }
    }, [showHistory, recordingState]);

    const LANGUAGES = [
        "Spanish", "French", "German", "Chinese (Simplified)", "Chinese (Traditional)", "Japanese", "Korean", "Russian", "Portuguese", "Italian", "Dutch", "Polish", "Turkish", "Vietnamese", "Thai", "Arabic", "Hindi", "Bengali", "Urdu", "Indonesian", "Malay", "Persian", "Hebrew", "Greek", "Czech", "Swedish", "Hungarian", "Romanian", "Danish", "Finnish", "Norwegian", "Slovak", "Bulgarian", "Ukrainian", "Catalan", "Serbian", "Croatian", "Lithuanian", "Slovenian", "Latvian", "Estonian", "Filipino", "Swahili", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"
    ];

    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startRecording = async () => {
        setError("");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                setAudioBlob(blob);
                chunksRef.current = []; // Reset chunks
                handleUpload(blob);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setRecordingState("recording");

            timerRef.current = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError("Could not access microphone. Please allow permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            if (timerRef.current) clearInterval(timerRef.current);
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            setRecordingState("processing");
        }
    };
    const handleUpload = async (blob: Blob) => {
        const formData = new FormData();
        formData.append("audio", blob, "recording.webm");
        formData.append("title", lectureTitle || `Lecture ${new Date().toLocaleString()}`);
        formData.append("subject", subject || "General");
        formData.append("folderStructure", folderStructure);

        try {
            // ...
            const res = await fetch("/api/process-lecture", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Processing failed");

            const data = await res.json();
            setResult(data);
            setRecordingState("completed");
        } catch (err) {
            console.error(err);
            setError("Failed to process lecture completely. Check Drive for raw audio.");
            setRecordingState("idle");
        }
    };

    const handleTranslate = async () => {
        if (!result?.notes) return;
        setIsTranslating(true);
        try {
            // Parse notes if string, otherwise use as is
            const notes = typeof result.notes === 'string' ? JSON.parse(result.notes) : result.notes;

            // Format into a readable string for translation
            const textToTranslate = `
# ${notes.title}

## Summary
${notes.summary}

## Key Points
${Array.isArray(notes.key_points) ? notes.key_points.map((p: string) => `- ${p}`).join('\n') : notes.key_points}

## Detailed Notes
${notes.detailed_notes}
            `.trim();

            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: textToTranslate, targetLanguage: targetLang }),
            });

            const data = await res.json();
            setTranslatedContent(data.translation);
        } catch (err) {
            console.error(err);
            setError("Translation failed. Please try again.");
        } finally {
            setIsTranslating(false);
        }
    };

    const handleShare = (platform: 'whatsapp' | 'email') => {
        const text = `Check out my lecture notes for "${lectureTitle || 'Lecture'}" generated by LectureGenius!`;
        const url = result?.driveAudio?.webViewLink || window.location.href;

        if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
        } else {
            window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent("Here are my notes: " + url)}`, '_blank');
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (status === "loading") return <div className="flex h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600 w-12 h-12" /></div>;

    return (
        <div className="bg-slate-50 min-h-screen flex font-sans">
            <Sidebar />

            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">

                <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-4rem)]">



                    {/* History Panel */}
                    {showHistory && (
                        <div className="w-full lg:w-96 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col animate-in slide-in-from-left duration-300 h-[calc(100vh-6rem)] sticky top-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 font-display flex items-center gap-2">
                                <ListMusic className="w-5 h-5 text-indigo-500" /> Recent Lectures
                            </h2>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                                {isLoadingHistory ? (
                                    <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
                                ) : history.length === 0 ? (
                                    <div className="text-center text-slate-400 py-8">
                                        <p className="text-sm">No recordings found.</p>
                                    </div>
                                ) : (
                                    history.map((file: any) => (
                                        <div key={file.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-slate-800 text-sm line-clamp-1" title={file.name.replace('_Notes.json', '')}>
                                                    {file.name.replace('_Notes.json', '')}
                                                </h3>
                                                <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100">
                                                    {new Date(file.createdTime).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-3">
                                                {file.description || "No summary available."}
                                            </p>
                                            <div className="flex gap-2">
                                                <a href={file.parents?.[0] ? `https://drive.google.com/drive/folders/${file.parents[0]}` : file.webViewLink} target="_blank" className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 transition-colors flex items-center gap-1">
                                                    <FolderOpen className="w-3 h-3" /> Open Folder
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Main Recording Area */}
                    <div className={`flex-1 flex flex-col transition-all duration-300 ${!showHistory ? 'max-w-4xl mx-auto' : ''}`}>
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Mic className="w-6 h-6" />
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lecture Voice Notes</h1>
                            </div>

                            <button
                                onClick={() => setShowHistory(!showHistory)}
                                className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                            >
                                {showHistory ? 'Hide History' : 'Show History'}
                            </button>
                        </div>

                        <div className="text-slate-500 mb-8 max-w-2xl text-lg opacity-90 leading-relaxed font-medium">
                            Record your lectures and let AI transcribe and summarize them for you.
                        </div>

                        {/* Central Card */}
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-12 lg:p-20 flex flex-col items-center justify-center flex-1 min-h-[500px] relative overflow-visible">

                            {/* Background decoration inside card */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

                            {recordingState === "idle" && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Lecture Title (Optional)"
                                        className="w-full max-w-md bg-transparent text-3xl font-bold text-center placeholder:text-slate-300 outline-none border-b-2 border-transparent focus:border-indigo-100 text-slate-800 tracking-tight mb-4 pb-2 transition-colors relative z-10"
                                        value={lectureTitle}
                                        onChange={(e) => setLectureTitle(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Subject (e.g. Biology 101)"
                                        className="w-full max-w-xs bg-transparent text-xl font-medium text-center placeholder:text-slate-300 outline-none border-b-2 border-transparent focus:border-indigo-100 text-slate-600 mb-12 pb-2 transition-colors relative z-10"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />

                                    <div className="text-8xl font-mono text-slate-800 font-bold mb-16 tracking-tighter relative z-10">
                                        0:00
                                    </div>

                                    <div className="flex items-center gap-8 relative z-10">
                                        <button
                                            onClick={startRecording}
                                            className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:shadow-red-500/30 hover:scale-110 active:scale-95 transition-all group"
                                        >
                                            <Mic className="w-10 h-10 text-white" />
                                        </button>

                                        <div className="flex flex-col items-center gap-2">
                                            <button className="w-16 h-16 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:bg-slate-50 hover:border-slate-200 transition-colors">
                                                <FolderOpen className="w-6 h-6 text-amber-400 fill-amber-400" />
                                            </button>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Upload</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {recordingState === "recording" && (
                                <>
                                    <div className="text-9xl font-mono text-slate-900 font-bold mb-16 tracking-tighter tabular-nums relative z-10">
                                        {formatTime(timer)}
                                    </div>

                                    <div className="mic-pulse w-32 h-32 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                                    <div className="flex items-center gap-8 relative z-10 mt-8">
                                        <button
                                            onClick={stopRecording}
                                            className="w-24 h-24 rounded-full bg-white border-4 border-red-100 flex items-center justify-center shadow-lg hover:bg-red-50 active:scale-95 transition-all group"
                                        >
                                            <Square className="w-8 h-8 text-red-500 fill-red-500 rounded" />
                                        </button>
                                    </div>
                                    <p className="mt-8 text-slate-400 font-medium animate-pulse">Recording active...</p>
                                </>
                            )}

                            {recordingState === "processing" && (
                                <div className="flex flex-col items-center justify-center space-y-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-ping"></div>
                                        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin relative z-10" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h2 className="text-2xl font-bold text-slate-800">Processing Lecture</h2>
                                        <p className="text-slate-500 max-w-xs">Gemini AI is transcribing and summarizing your audio...</p>
                                    </div>
                                </div>
                            )}

                            {recordingState === "completed" && result && (
                                <div className="w-full animate-in fade-in zoom-in duration-300 text-left">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <FileCheck className="w-8 h-8 text-emerald-600" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">Lecture Processed!</h2>
                                    <p className="text-slate-500 text-center mb-8 text-sm">Saved to Google Drive automatically.</p>

                                    {/* Actions Row: Share & Drive */}
                                    <div className="flex justify-center gap-3 mb-8">
                                        <button onClick={() => handleShare('whatsapp')} className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-200">
                                            <MessageCircle className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleShare('email')} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200">
                                            <Mail className="w-5 h-5" />
                                        </button>
                                        <a href={result.driveAudio?.webViewLink} target="_blank" className="px-5 py-2.5 bg-white text-indigo-600 border border-indigo-100 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 text-sm">
                                            Drive <Share2 className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {/* Summary View */}
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6 max-h-[300px] overflow-y-auto shadow-inner prose prose-slate prose-sm max-w-none">
                                        <ReactMarkdown>
                                            {typeof result.notes === 'string' ? JSON.parse(result.notes).summary || result.notes : result.notes.summary}
                                        </ReactMarkdown>
                                    </div>

                                    {/* Translation Section */}
                                    <div className="bg-slate-50/80 rounded-3xl p-8 mb-8">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                            <div className="flex items-center gap-3 text-slate-800 text-lg font-bold">
                                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm text-indigo-500">
                                                    <Globe className="w-5 h-5" />
                                                </div>
                                                Translate Notes
                                            </div>
                                            <div className="flex gap-3 w-full md:w-auto">
                                                <select
                                                    className="flex-1 md:w-48 bg-white border border-slate-200 text-slate-700 text-base rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer hover:border-slate-300 shadow-sm"
                                                    value={targetLang}
                                                    onChange={(e) => setTargetLang(e.target.value)}
                                                >
                                                    {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                                </select>
                                                <button
                                                    onClick={handleTranslate}
                                                    disabled={isTranslating}
                                                    className="px-8 py-3 bg-indigo-600 text-white text-base font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                                                >
                                                    {isTranslating ? '...' : 'Translate'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Translated Content Display */}
                                        {translatedContent && (
                                            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-base text-slate-700 animate-in fade-in zoom-in-95 duration-300 h-[500px] overflow-y-auto prose prose-blue prose-lg max-w-none break-words shadow-sm custom-scrollbar">
                                                <ReactMarkdown>
                                                    {translatedContent}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-center">
                                        <button onClick={() => window.location.reload()} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                            Start New Recording
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
