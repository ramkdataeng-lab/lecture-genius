"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Mic, FolderOpen, LogOut, LayoutDashboard, Settings, Workflow, Calendar, Info } from "lucide-react";
import { useState, useEffect } from "react";

export function Sidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();

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

    const NavItem = ({ href, icon: Icon, label, isActive }: any) => (
        <Link
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            className={`sidebar-nav-item flex items-center gap-3 px-6 py-3 text-sm font-medium ${isActive ? 'active' : ''}`}
        >
            <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
            <span>{label}</span>
        </Link>
    );

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed top-0 left-0 hidden md:flex flex-col shadow-sm z-30">
            <div className="p-6 pb-8 border-b border-slate-100 flex flex-col items-center gap-4 text-center">
                <div className="w-44 h-44 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0 p-2 shadow-inner">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={160}
                        height={160}
                        className="object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 leading-tight">Lecture<span className="text-violet-600">Genius</span></h1>
                    <span className="text-xs text-slate-500 font-medium">AI Note Taker</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-8">
                <div>
                    <h3 className="px-6 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</h3>
                    <nav className="space-y-1">
                        <NavItem href="/" icon={LayoutDashboard} label="Dashboard" isActive={pathname === "/"} />
                        <NavItem href="/record" icon={Mic} label="Record Lecture" isActive={pathname === "/record"} />
                        <NavItem href="/schedule" icon={Calendar} label="Sync Schedule" isActive={pathname === "/schedule"} />
                        <NavItem href={folderLink} icon={FolderOpen} label="My Recordings" />
                        <NavItem href="/settings" icon={Settings} label="Settings" isActive={pathname === "/settings"} />
                        <NavItem href="/workflow" icon={Workflow} label="AI Workflow" isActive={pathname === "/workflow"} />
                        <NavItem href="/about" icon={Info} label="About" isActive={pathname === "/about"} />
                    </nav>
                </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200">
                {session ? (
                    <>
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{session.user?.name}</p>
                                <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                            </div>
                        </div>
                        <Link href="/api/auth/signout" className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors px-2 mb-4">
                            <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </Link>
                    </>
                ) : (
                    <div className="flex flex-col gap-3 px-2 mb-4">
                        <p className="text-sm font-medium text-slate-500">Guest Mode</p>
                        <button onClick={() => window.location.href = "/api/auth/signin/google"} className="text-xs font-bold text-violet-600 hover:underline">
                            Sign In with Google
                        </button>
                    </div>
                )}

                <div className="pt-4 border-t border-slate-200/60 flex flex-col gap-0.5">
                    <p className="text-[10px] font-medium text-slate-400">© 2026 LectureGenius</p>
                </div>
            </div>
        </aside>
    );
}
