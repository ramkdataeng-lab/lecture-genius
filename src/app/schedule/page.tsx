"use client";

import { Sidebar } from "@/components/Sidebar";
import { Calendar, CloudLightning, GraduationCap, Video } from "lucide-react";
import { useState } from "react";

export default function SchedulePage() {
    const [selectedSystem, setSelectedSystem] = useState("");

    const systems = [
        "Canvas Instructure",
        "Blackboard Learn",
        "Moodle",
        "Google Classroom",
        "Brightspace (D2L)",
        "Sakai",
        "Schoology",
        "Microsoft Teams for Education"
    ];

    return (
        <div className="bg-slate-50 min-h-screen flex font-sans">
            <Sidebar />

            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center animate-in fade-in duration-500">

                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-12 relative overflow-hidden">

                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-60"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col items-center text-center">

                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-white text-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-indigo-50">
                                <Calendar className="w-8 h-8" />
                            </div>

                            <div className="mb-4 relative">
                                <div className="absolute inset-0 bg-indigo-400 blur-lg opacity-20 animate-pulse"></div>
                                <span className="relative px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] animate-shimmer text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                                    Feature Coming Soon
                                </span>
                            </div>

                            <h1 className="text-3xl lg:text-5xl font-black text-slate-800 tracking-tight mb-4 font-display">
                                Auto-Sync Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Class Schedule</span>
                            </h1>

                            <p className="text-base lg:text-lg text-slate-500 max-w-2xl mb-8 leading-relaxed font-medium">
                                Connect your university's course management system (LMS).
                                LectureGenius will automatically import your timetable, join your class meetings, record the session, and save a translated summary.
                            </p>

                            <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full max-w-4xl justify-center">
                                {/* Selection UI */}
                                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 p-6 lg:p-8 text-left relative z-20 flex flex-col justify-center">
                                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1 uppercase tracking-wide">
                                        Select Learning Platform
                                    </label>
                                    <div className="relative mb-6">
                                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <select
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer font-semibold text-base hover:bg-white"
                                            value={selectedSystem}
                                            onChange={(e) => setSelectedSystem(e.target.value)}
                                        >
                                            <option value="" disabled>Choose System...</option>
                                            {systems.map((sys) => (
                                                <option key={sys} value={sys}>{sys}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                                        onClick={() => alert("This feature is currently in development! Stay tuned.")}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shimmer"></div>
                                        <CloudLightning className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" />
                                        <span>Sync Calendar</span>
                                    </button>
                                    <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-wider">
                                        Secure Connection • Read-Only Access
                                    </p>
                                </div>

                                {/* Compatible Platforms - Side Panel */}
                                <div className="lg:w-72 bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 flex flex-col justify-center items-center text-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Compatible Meeting Platforms</span>
                                    <div className="flex flex-col gap-3 w-full opacity-90">
                                        {/* Mock Icons for Platforms */}
                                        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                            <div className="p-1.5 bg-blue-500 rounded text-white flex-shrink-0"><Video className="w-3.5 h-3.5" /></div>
                                            <span className="font-bold text-slate-700 text-sm">Zoom Meetings</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                            <div className="p-1.5 bg-indigo-500 rounded text-white flex-shrink-0"><Video className="w-3.5 h-3.5" /></div>
                                            <span className="font-bold text-slate-700 text-sm">Microsoft Teams</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                            <div className="p-1.5 bg-emerald-500 rounded text-white flex-shrink-0"><Video className="w-3.5 h-3.5" /></div>
                                            <span className="font-bold text-slate-700 text-sm">Google Meet</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-xs text-slate-400 font-medium">
                                        + Automatic joining via generated links
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
