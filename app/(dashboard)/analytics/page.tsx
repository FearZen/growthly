"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { Laptop, Smartphone, Tablet } from "lucide-react";

const mockRetentionData = [
    { month: "Jan", retention: 98, churn: 2 },
    { month: "Feb", retention: 95, churn: 5 },
    { month: "Mar", retention: 92, churn: 8 },
    { month: "Apr", retention: 94, churn: 6 },
    { month: "May", retention: 96, churn: 4 },
    { month: "Jun", retention: 97, churn: 3 },
];

const mockDeviceData = {
    desktop: 65,
    mobile: 30,
    tablet: 5
};

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">User Analytics</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    Monitor your customer retention, churn rates, and engagement data.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <motion.div
                    className="col-span-5 h-full"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="flex h-full flex-col">
                        <CardHeader>
                            <CardTitle>Retention & Churn Velocity</CardTitle>
                            <CardDescription>
                                Monthly rate of users continuing their subscription vs canceling.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockRetentionData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis
                                        dataKey="month"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)", color: 'var(--foreground)' }}
                                    />
                                    <Line type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="churn" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    className="col-span-2 h-full"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <Card className="flex h-full flex-col">
                        <CardHeader>
                            <CardTitle>Device Distribution</CardTitle>
                            <CardDescription>
                                Traffic split by device type.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-center gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-md text-blue-500">
                                        <Laptop className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-sm">Desktop</span>
                                </div>
                                <span className="font-bold">{mockDeviceData.desktop}%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-500">
                                        <Smartphone className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-sm">Mobile</span>
                                </div>
                                <span className="font-bold">{mockDeviceData.mobile}%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/10 rounded-md text-amber-500">
                                        <Tablet className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-sm">Tablet</span>
                                </div>
                                <span className="font-bold">{mockDeviceData.tablet}%</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
