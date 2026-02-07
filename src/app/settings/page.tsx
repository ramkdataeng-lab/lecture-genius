"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";

const LANGUAGES = [
    // Top 50 Languages
    "Spanish", "French", "German", "Chinese (Simplified)", "Chinese (Traditional)", "Japanese", "Korean", "Russian", "Portuguese", "Italian", "Dutch", "Polish", "Turkish", "Vietnamese", "Thai", "Arabic", "Hindi", "Bengali", "Urdu", "Indonesian", "Malay", "Persian", "Hebrew", "Greek", "Czech", "Swedish", "Hungarian", "Romanian", "Danish", "Finnish", "Norwegian", "Slovak", "Bulgarian", "Ukrainian", "Catalan", "Serbian", "Croatian", "Lithuanian", "Slovenian", "Latvian", "Estonian", "Filipino", "Swahili", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"
];

export default function SettingsPage() {
    const [folderStructure, setFolderStructure] = useState("date-subject");
    const [defaultLanguage, setDefaultLanguage] = useState("Spanish");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const storedStructure = localStorage.getItem("folderStructure");
        if (storedStructure) setFolderStructure(storedStructure);

        const storedLang = localStorage.getItem("defaultLanguage");
        if (storedLang) setDefaultLanguage(storedLang);
    }, []);

    const handleSave = () => {
        localStorage.setItem("folderStructure", folderStructure);
        localStorage.setItem("defaultLanguage", defaultLanguage);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className="bg-slate-50 min-h-screen flex font-sans">
            <Sidebar />

            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-800 mb-8">Settings</h1>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-8">

                        {/* Folder Hierarchy */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Google Drive Organization</h2>
                            <p className="text-sm text-slate-500 mb-4">Choose how your lectures are organized inside the 'LectureGenius' folder.</p>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                                    <input
                                        type="radio"
                                        name="folderStructure"
                                        value="date-subject"
                                        checked={folderStructure === "date-subject"}
                                        onChange={(e) => setFolderStructure(e.target.value)}
                                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div>
                                        <span className="block font-medium text-slate-700">Date &rarr; Subject</span>
                                        <span className="text-xs text-slate-400">Example: LectureGenius / 2026-02-07 / Biology 101</span>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                                    <input
                                        type="radio"
                                        name="folderStructure"
                                        value="subject-date"
                                        checked={folderStructure === "subject-date"}
                                        onChange={(e) => setFolderStructure(e.target.value)}
                                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div>
                                        <span className="block font-medium text-slate-700">Subject &rarr; Date</span>
                                        <span className="text-xs text-slate-400">Example: LectureGenius / Biology 101 / 2026-02-07</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Default Language */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Translation</h2>
                            <p className="text-sm text-slate-500 mb-4">Select your preferred default language for translations.</p>

                            <select
                                value={defaultLanguage}
                                onChange={(e) => setDefaultLanguage(e.target.value)}
                                className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 flex items-center justify-between">
                            {showSuccess && <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full animate-in fade-in">Settings Saved!</span>}
                            {!showSuccess && <span></span>}
                            <button
                                onClick={handleSave}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
