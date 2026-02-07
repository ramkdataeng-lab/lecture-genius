"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import { Mic, FolderOpen, Brain, ChevronRight, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  // Allow Guest Access - Removed the early return for !session

  const QuickAction = ({ icon: Icon, title, desc, link, color }: any) => (
    <Link href={link} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col items-center text-center h-full justify-center">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-400 font-medium">{desc}</p>
    </Link>
  );

  const [folderLink, setFolderLink] = useState("https://drive.google.com/drive/u/0/search?q=LectureGenius");

  useEffect(() => {
    if (session) {
      fetch('/api/drive-folder')
        .then(res => res.json())
        .then(data => {
          if (data.webViewLink) setFolderLink(data.webViewLink);
        })
        .catch(err => console.error(err));
    }
  }, [session]);

  const userName = status === "loading" ? "..." : (session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || "Guest");

  return (
    <div className="bg-slate-50 min-h-screen flex font-sans">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 md:hidden mb-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" width={32} height={32} alt="Logo" />
              <span className="font-bold text-slate-800">LectureGenius</span>
            </div>
            {session ? (
              <Link href="/api/auth/signout" className="text-xs font-semibold text-slate-500">Sign Out</Link>
            ) : (
              <button onClick={() => window.location.href = "/api/auth/signin/google"} className="text-xs font-bold text-indigo-600">Sign In</button>
            )}
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-header p-8 md:p-12 text-white shadow-lg shadow-slate-300">
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <Brain className="w-5 h-5 text-cyan-300" />
                <span className="text-sm font-semibold tracking-wide text-cyan-100">Ai powered Lecture Assistant</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Hello, {userName}!</h1>

              <p className="text-indigo-100 text-lg mb-8 leading-relaxed font-medium opacity-90">
                Ready to capture your next lecture? I can transcribe, summarize, and translate seamlessly.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/record" className="bg-white text-violet-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-colors flex items-center gap-2">
                  <Mic className="w-5 h-5" /> Start New Recording
                </Link>

                {!session && (
                  <button onClick={() => window.location.href = "/api/auth/signin/google"} className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/20 flex items-center gap-2">
                    <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                    Sign in with Google
                  </button>
                )}

                {session && (
                  <Link href={folderLink} target="_blank" className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/20 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" /> Open Drive Folder
                  </Link>
                )}
              </div>
            </div>

            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            {/* Big Hero Logo */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-20 transform rotate-12 pointer-events-none">
              <Image src="/logo.png" width={200} height={200} alt="LectureGenius Hero Logo" className="drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Quick Actions Grid (Simplified) */}
        <div className="mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAction icon={Mic} title="Record Lecture" desc="Start capturing audio" link="/record" color="bg-rose-500" />
            <QuickAction icon={FolderOpen} title="My Recordings" desc="View all files in Drive" link={folderLink} color="bg-cyan-500" />
            <QuickAction icon={PlayCircle} title="Recent Summaries" desc="Check latest outputs" link={folderLink} color="bg-violet-500" />
          </div>
        </div>

        {/* Recent Recordings (Placeholder) */}
        <div className="">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Recent Activity</h2>
          <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm space-y-1">
            <div className="p-8 text-center text-slate-400 flex flex-col items-center">
              <Mic className="w-12 h-12 text-slate-200 mb-4" />
              <p className="text-sm font-medium">Your recent recordings will appear here once processed.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
