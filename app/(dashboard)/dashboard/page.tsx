import { KPICards } from "@/components/dashboard/kpi-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();

    // Fetch metrics for cards
    const { data: revenueData } = await supabase
        .from('revenue_metrics')
        .select('*')
        .order('month', { ascending: true });

    const { count: usersCount } = await supabase
        .from('users')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active');

    const { data: transactionsTotal } = await supabase
        .from('transactions')
        .select('amount, status, id, user_id, users(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(5);

    const totalRevenue = transactionsTotal?.reduce((acc, curr) => acc + (curr.status === 'paid' ? Number(curr.amount) : 0), 0) || 0;

    // Derive metrics
    const latestMRR = revenueData && revenueData.length > 0
        ? revenueData[revenueData.length - 1].mrr
        : 0;

    const mockMetrics = {
        revenue: latestMRR || 23456, // Fallback if dummy data not found
        users: usersCount || 1204,
        conversion: 3.2,
        sessions: 4231
    };

    const formattedTransactions = transactionsTotal?.map(tx => ({
        id: tx.id,
        amount: tx.amount,
        status: tx.status,
        user: Array.isArray(tx.users) ? tx.users[0] : tx.users
    })) || [];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    A high-level overview of your business growth.
                </p>
            </div>

            <KPICards metrics={mockMetrics} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <RevenueChart data={revenueData || []} />
                </div>

                <div className="col-span-3">
                    <RecentTransactions transactions={formattedTransactions} />
                </div>
            </div>
        </div>
    );
}
