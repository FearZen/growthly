"use client";

import { Bell, Search, User as UserIcon, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mockNotifications = [
    { id: 1, title: "New user registered", desc: "Olivia Martin just signed up.", time: "2m ago", icon: UserIcon, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 2, title: "Payment successful", desc: "Jackson Lee's Pro plan renewed.", time: "1h ago", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: 3, title: "Server usage high", desc: "API limits reached 85% capacity.", time: "3h ago", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: 4, title: "New feedback", desc: "Sophia left a comment on the dashboard.", time: "5h ago", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
];

export function TopNav({ user }: { user: any }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const userRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-6 sticky top-0 z-40">
            <div className="flex w-full max-w-sm items-center gap-2 rounded-full border border-border/80 bg-background/50 px-4 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search items, users..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
            </div>

            <div className="flex items-center gap-4">

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
                        className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse"></span>
                    </button>

                    <AnimatePresence>
                        {notifOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-2 shadow-xl overflow-hidden z-50"
                            >
                                <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 mb-2">
                                    <span className="font-semibold text-sm">Notifications</span>
                                    <button className="text-xs text-primary font-medium hover:underline">Mark all read</button>
                                </div>

                                <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1">
                                    {mockNotifications.map((n) => (
                                        <div key={n.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className={`p-2 rounded-full ${n.bg} ${n.color} mt-0.5 shrink-0`}>
                                                <n.icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-medium leading-none">{n.title}</span>
                                                <span className="text-xs text-muted-foreground">{n.desc}</span>
                                                <span className="text-[10px] text-muted-foreground/70 font-medium mt-1">{n.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-2 pt-2 border-t border-border/50 text-center">
                                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
                                        View all notifications
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Profile Dropdown */}
                <div className="relative" ref={userRef}>
                    <button
                        onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary/20 ring-2 ring-transparent focus:ring-primary/30"
                    >
                        <span className="font-bold text-sm tracking-wider">
                            {user?.full_name?.substring(0, 2).toUpperCase() || 'AD'}
                        </span>
                    </button>

                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-1 shadow-xl z-50"
                            >
                                <div className="border-b border-border/50 px-3 py-3 text-sm">
                                    <p className="font-semibold text-foreground">{user?.full_name || 'Administrator'}</p>
                                    <p className="truncate text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                                </div>
                                <div className="p-1.5 mt-1">
                                    <button
                                        onClick={() => logout()}
                                        className="flex w-full items-center rounded-lg px-2.5 py-2 text-sm font-medium outline-none transition-colors hover:bg-red-500/10 hover:text-red-500"
                                    >
                                        Log out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
