"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    BarChart3,
    CircleDollarSign,
    LayoutDashboard,
    Settings,
    Users,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Revenue", href: "/revenue", icon: CircleDollarSign },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.div
            initial={{ width: 240 }}
            animate={{ width: isCollapsed ? 80 : 260 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-20 flex h-full flex-col border-r border-border/50 bg-card/30 backdrop-blur-xl"
        >
            <div className="flex h-16 items-center justify-between px-5 border-b border-border/50">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-primary-foreground shadow-md shadow-primary/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                    </div>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                        >
                            Growthly
                        </motion.span>
                    )}
                </div>
            </div>

            <nav className="flex-1 space-y-1.5 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex h-11 items-center gap-3 rounded-xl px-3 text-[14px] font-medium transition-all",
                                isActive
                                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                isCollapsed && "justify-center px-0"
                            )}
                        >
                            <item.icon className={cn("shrink-0 transition-colors",
                                isCollapsed ? "h-6 w-6" : "h-[18px] w-[18px]",
                                isActive && "text-primary fill-primary/10"
                            )} />

                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="whitespace-nowrap"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border/50">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex w-full items-center justify-center rounded-xl p-2.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all border border-transparent hover:border-border/50"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
            </div>
        </motion.div>
    );
}
