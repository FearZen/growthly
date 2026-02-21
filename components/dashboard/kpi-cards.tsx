"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Copy, Users, Activity, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function KPICards({ metrics }: { metrics: any }) {
    const cards = [
        {
            title: "Total Revenue",
            value: `$${metrics.revenue.toLocaleString()}`,
            trend: "+12.5%",
            trendUp: true,
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            title: "Active Users",
            value: metrics.users.toLocaleString(),
            trend: "+5.2%",
            trendUp: true,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            title: "Conversion Rate",
            value: `${metrics.conversion}%`,
            trend: "-1.1%",
            trendUp: false,
            icon: Copy,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            title: "Active Sessions",
            value: metrics.sessions.toLocaleString(),
            trend: "+18.2%",
            trendUp: true,
            icon: Activity,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
    ];

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {cards.map((card, i) => (
                <motion.div key={i} variants={item}>
                    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${card.border}`}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between space-y-0 pb-4">
                                <p className="text-sm font-medium tracking-wide text-muted-foreground">
                                    {card.title}
                                </p>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>
                                    <card.icon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-bold tracking-tight text-foreground">{card.value}</span>
                                <span className={`inline-flex items-center text-xs font-semibold ${card.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {card.trendUp ? (
                                        <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                                    ) : (
                                        <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
                                    )}
                                    {card.trend} from last month
                                </span>
                            </div>

                            {/* Decorative Background Blob */}
                            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-3xl ${card.bg} opacity-50 pointer-events-none transition-opacity group-hover:opacity-100`} />
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
