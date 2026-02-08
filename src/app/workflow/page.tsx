"use client";

import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";

export default function WorkflowPage() {
    return (
        <div className="bg-slate-50 min-h-screen flex font-sans">
            <Sidebar />

            <main className="flex-1 md:ml-64 p-6 md:p-12 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">

                    {/* Header */}
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Workflow Architecture</h1>
                        <p className="text-slate-500">
                            Visualizing the end-to-end process from voice capture to intelligent cloud storage.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        {/* Left Column: The Workflow Image */}
                        <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center order-2 lg:order-1 h-full max-h-[600px]">
                            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-slate-50">
                                <Image
                                    src="/logos/AI_Workflow.png"
                                    alt="LectureGenius AI Workflow"
                                    fill
                                    className="object-contain p-4"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Column: Explanation Steps */}
                        <div className="grid grid-cols-1 gap-4 order-1 lg:order-2">
                            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 mb-2">
                                <h2 className="font-bold text-indigo-900 text-lg mb-1">How It Works</h2>
                                <p className="text-indigo-700/80 text-sm">Follow the automatic pipeline that transforms your lectures into organized knowledge.</p>
                            </div>

                            <StepCard
                                number="1"
                                title="Voice Capture"
                                desc="High-fidelity audio recording via Web Audio API with real-time visualization."
                                color="bg-blue-100 text-blue-600"
                            />
                            <StepCard
                                number="2"
                                title="AI Processing"
                                desc="Gemini 1.5 Flash processes audio for transcription and intelligent summarization."
                                color="bg-purple-100 text-purple-600"
                            />
                            <StepCard
                                number="3"
                                title="Translation"
                                desc="Multi-language support translates content instantly into your preferred language."
                                color="bg-rose-100 text-rose-600"
                            />
                            <StepCard
                                number="4"
                                title="Drive Sync"
                                desc="Final documents are automatically organized and saved to your Google Drive."
                                color="bg-emerald-100 text-emerald-600"
                            />
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}

function StepCard({ number, title, desc, color }: { number: string, title: string, desc: string, color: string }) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center font-bold text-lg shrink-0`}>
                {number}
            </div>
            <div>
                <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    );
}
