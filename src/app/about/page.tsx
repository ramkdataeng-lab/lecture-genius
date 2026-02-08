"use client";

import { Sidebar } from "@/components/Sidebar";

export default function AboutPage() {
    return (
        <div className="bg-slate-50 min-h-screen flex font-sans">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center animate-in fade-in duration-500">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-12 lg:p-20 relative overflow-hidden text-center">

                        {/* Background Decor */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        <div className="mb-8">
                            <h1 className="text-4xl lg:text-6xl font-black text-slate-800 tracking-tight font-display mb-2">
                                Lecture<span className="text-violet-600">Genius</span>
                            </h1>
                            <p className="text-lg text-slate-500 font-medium">Next-Generation AI Note Taker</p>
                        </div>

                        <div className="prose prose-lg mx-auto text-slate-600 mb-12 leading-relaxed max-w-2xl">
                            <p>
                                LectureGenius revolutionizes how students and professionals capture knowledge.
                                By leveraging advanced AI, it automatically records, transcribes, translates, and summarizes lectures in real-time,
                                ensuring you never miss a critical insight.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 max-w-lg mx-auto shadow-sm">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Developed By</h2>

                            <div className="flex flex-col items-center gap-1">
                                <span className="text-3xl font-bold text-slate-800 tracking-tight">Ramkumar</span>
                                <a href="mailto:ramkgvn@gmail.com" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors mt-1">
                                    ramkgvn@gmail.com
                                </a>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <p className="text-xs font-bold text-slate-400">© 2026 All Rights Reserved</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
