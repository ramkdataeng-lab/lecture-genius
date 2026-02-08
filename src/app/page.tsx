"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import { Mic, FolderOpen, Brain, PlayCircle, FileText, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [folderLink, setFolderLink] = useState("https://drive.google.com/drive/u/0/search?q=LectureGenius");

  const userName = status === "loading" ? "..." : (session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || "Guest");

  useEffect(() => {
    if (session) {
      // Fetch Folder Link
      fetch('/api/drive-folder')
        .then(res => res.json())
        .then(data => {
          if (data.webViewLink) setFolderLink(data.webViewLink);
        })
        .catch(err => console.error(err));

      // Fetch Recent Activity
      setLoadingActivity(true);
      fetch('/api/history')
        .then(res => res.json())
        .then(data => {
          if (data.files) {
            // Filter for _Notes.json only
            const notes = data.files.filter((f: any) => f.name.includes('_Notes.json'));
            setRecentActivity(notes.slice(0, 5)); // Top 5
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingActivity(false));
    }
  }, [session]);

  const QuickAction = ({ icon: Icon, title, desc, link, color }: any) => (
    <Link href={link} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col items-center text-center h-full justify-center">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-400 font-medium">{desc}</p>
    </Link>
  );

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
              <div className="flex items-center gap-3 mb-4 opacity-90">
                <Brain className="w-10 h-10 text-cyan-300 drop-shadow-md" />
                <span className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                  Democratizing Education Globally <span className="text-cyan-300">with AI</span>
                </span>
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
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAction icon={Mic} title="Record Lecture" desc="Start capturing audio" link="/record" color="bg-rose-500" />
            <button
              onClick={() => window.open(folderLink, '_blank')}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col items-center text-center h-full justify-center w-full"
            >
              <div className={`w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">My Recordings</h3>
              <p className="text-xs text-slate-400 font-medium">View all files in Drive</p>
            </button>
            <button
              onClick={() => {
                document.getElementById('recent-activity')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col items-center text-center h-full justify-center w-full"
            >
              <div className={`w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Recent Summaries</h3>
              <p className="text-xs text-slate-400 font-medium">Check latest outputs</p>
            </button>
          </div>
        </div>

        {/* Social Cause / Mission Section */}
        <div className="mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Our Mission</h2>
          <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="text-cyan-200">Democratizing Education</span> for the Global Student
              </h3>
              <p className="text-indigo-100 leading-relaxed max-w-3xl">
                LectureGenius eliminates learning boundaries by integrating multiple languages, empowering every student—local or international—to become a global scholar. We believe in a world where you can listen to any class, in any language, breaking down barriers to knowledge one lecture at a time.
              </p>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -right-12 -bottom-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Recent Recordings */}
        <div id="recent-activity" className="scroll-mt-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Recent Activity</h2>

          {loadingActivity ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-slate-400">Loading your recent notes...</p>
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {recentActivity.map((file) => (
                <div key={file.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 md:items-start group">
                  <div className="bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                        {file.name.replace('_Notes.json', '')}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {new Date(file.createdTime).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                      {file.description || "No summary available."}
                    </p>

                    <div className="flex items-center gap-4">
                      <Link
                        href={file.webViewLink}
                        target="_blank"
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" /> Open in Drive
                      </Link>
                      <button
                        onClick={() => window.open(file.parents?.[0] ? `https://drive.google.com/drive/folders/${file.parents[0]}` : file.webViewLink, '_blank')}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1"
                      >
                        <FolderOpen className="w-4 h-4" /> Open Folder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm space-y-1">
              <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                <Mic className="w-12 h-12 text-slate-200 mb-4" />
                <p className="text-sm font-medium">Your recent recordings will appear here once processed.</p>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
