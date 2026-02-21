"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

export function RecentTransactions({ transactions }: { transactions: any[] }) {
    // Demo mock data in case transactions array is empty
    const mockTransactions = [
        { id: '1', user: { full_name: 'Olivia Martin', email: 'olivia.martin@email.com' }, amount: 1999.00, status: 'paid' },
        { id: '2', user: { full_name: 'Jackson Lee', email: 'jackson.lee@email.com' }, amount: 39.00, status: 'paid' },
        { id: '3', user: { full_name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com' }, amount: 299.00, status: 'paid' },
        { id: '4', user: { full_name: 'William Kim', email: 'will@email.com' }, amount: 99.00, status: 'pending' },
        { id: '5', user: { full_name: 'Sofia Davis', email: 'sofia.davis@email.com' }, amount: 39.00, status: 'paid' },
    ];

    const data = transactions?.length > 0 ? transactions : mockTransactions;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="h-full"
        >
            <Card className="flex h-full flex-col">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                        You made {data.length} sales this month.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                    <div className="space-y-8">
                        {data.map((transaction, i) => (
                            <motion.div
                                key={transaction.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="flex items-center"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground">
                                    {transaction.user?.full_name?.substring(0, 2).toUpperCase() || "US"}
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{transaction.user?.full_name || "Unknown User"}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                        {transaction.user?.email || "No email"}
                                    </p>
                                </div>
                                <div className="ml-auto flex items-center gap-3">
                                    {transaction.status === 'pending' && (
                                        <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
                                    )}
                                    {transaction.status === 'failed' && (
                                        <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                                    )}
                                    <div className="font-medium">
                                        +${Number(transaction.amount).toFixed(2)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
