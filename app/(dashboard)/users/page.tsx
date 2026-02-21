import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { Search, MoreHorizontal, ShieldAlert, User as UserIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function UsersPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check admin role
    const { data: currentUser } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

    const isAdmin = currentUser?.role === "admin";

    const { data: usersList } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="h-16 w-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <ShieldAlert className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Access Denied</h2>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    You need Administrator privileges to view and manage application users mapping.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Admin console for managing platform users and roles.
                    </p>
                </div>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Invite User
                </button>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Users</CardTitle>
                            <CardDescription>
                                A comprehensive list of all verified registrations.
                            </CardDescription>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="h-9 w-64 rounded-md border border-border bg-transparent px-9 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-border">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-border bg-muted/50 font-medium text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 pb-3">User</th>
                                    <th className="px-4 py-3 pb-3">Role</th>
                                    <th className="px-4 py-3 pb-3">Plan</th>
                                    <th className="px-4 py-3 pb-3">Status</th>
                                    <th className="px-4 py-3 pb-3">Joined</th>
                                    <th className="px-4 py-3 pb-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList?.map((u) => (
                                    <tr key={u.id} className="border-b border-border transition-colors hover:bg-muted/50 last:border-0">
                                        <td className="p-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <UserIcon className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{u.full_name || "Unknown"}</span>
                                                    <span className="text-xs text-muted-foreground">{u.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                                {u.role === 'admin' ? 'Admin' : 'Viewer'}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle capitalize">{u.plan}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${u.status === 'active' ? 'text-emerald-500' : u.status === 'trial' ? 'text-amber-500' : 'text-red-500'}`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : u.status === 'trial' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">
                                            {new Date(u.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!usersList || usersList.length === 0) && (
                                    <tr>
                                        <td colSpan={6} className="h-24 text-center text-muted-foreground">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
