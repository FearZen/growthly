"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const mockRevenueData = [
    { month: "Jan", basic: 4000, pro: 2400, enterprise: 2400 },
    { month: "Feb", basic: 3000, pro: 1398, enterprise: 2210 },
    { month: "Mar", basic: 2000, pro: 9800, enterprise: 2290 },
    { month: "Apr", basic: 2780, pro: 3908, enterprise: 2000 },
    { month: "May", basic: 1890, pro: 4800, enterprise: 2181 },
    { month: "Jun", basic: 2390, pro: 3800, enterprise: 2500 },
];

const planDistributionData = [
    { name: 'Basic', value: 400 },
    { name: 'Pro', value: 300 },
    { name: 'Enterprise', value: 100 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function RevenuePage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Revenue Analytics</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    Detailed breakdown of Monthly Recurring Revenue (MRR) and plan distribution.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <motion.div
                    className="col-span-4 h-full"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="flex h-full flex-col">
                        <CardHeader>
                            <CardTitle>MRR by Plan Model</CardTitle>
                            <CardDescription>
                                Historical revenue mapped across sub models.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={mockRevenueData}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
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
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                                        contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
                                    />
                                    <Bar dataKey="basic" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="pro" stackId="a" fill="#10b981" />
                                    <Bar dataKey="enterprise" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    className="col-span-3 h-full"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <Card className="flex h-full flex-col">
                        <CardHeader>
                            <CardTitle>Plan Distribution</CardTitle>
                            <CardDescription>
                                Current breakdown of active subscribers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-[400px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={planDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {planDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
