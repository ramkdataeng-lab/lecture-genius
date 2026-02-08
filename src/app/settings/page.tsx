"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";

const LANGUAGES = [
    "English", "Spanish", "French", "German", "Chinese (Simplified)", "Chinese (Traditional)", "Japanese", "Korean", "Russian", "Portuguese", "Italian", "Dutch", "Polish", "Turkish", "Vietnamese", "Thai", "Arabic", "Hindi", "Bengali", "Urdu", "Indonesian", "Malay", "Persian", "Hebrew", "Greek", "Czech", "Swedish", "Hungarian", "Romanian", "Danish", "Finnish", "Norwegian", "Slovak", "Bulgarian", "Ukrainian", "Catalan", "Serbian", "Croatian", "Lithuanian", "Slovenian", "Latvian", "Estonian", "Filipino", "Swahili", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"
];

const LMS_PLATFORMS = [
    "Canvas Instructure",
    "Blackboard Learn",
    "Moodle",
    "Google Classroom",
    "Brightspace (D2L)",
    "Sakai",
    "Schoology",
    "Microsoft Teams for Education"
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

                        <hr className="border-slate-100" />

                        {/* LMS Configuration */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-xl font-bold text-slate-800">Course Management (LMS)</h2>
                                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-100 shadow-sm">
                                    Coming Soon
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-6">Configure access to your university portal for auto-sync.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Platform</label>
                                    <select
                                        className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        disabled
                                    >
                                        <option>Select LMS...</option>
                                        {LMS_PLATFORMS.map((lms) => (
                                            <option key={lms}>{lms}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Username / Email</label>
                                        <input
                                            type="text"
                                            placeholder="student@university.edu"
                                            className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    Credentials will be encrypted and stored locally on your device.
                                </p>
                            </div>
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
