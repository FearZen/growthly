import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/app/(auth)/submit-button";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

async function updateProfile(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const full_name = formData.get("full_name") as string;
    // In a real app we'd also sync the Auth user metadata if needed.
    // For this schema, we just update the public.users table.
    await supabase
        .from("users")
        .update({ full_name })
        .eq("id", user.id);

    revalidatePath("/settings");
    revalidatePath("/", "layout"); // Update TopNav
}

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();

    return (
        <div className="flex flex-col gap-8 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    Manage your account settings and notification preferences.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your public personal information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updateProfile} className="flex flex-col gap-6 max-w-md">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                defaultValue={user?.email}
                                disabled
                                className="flex h-10 w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                            />
                            <p className="text-[13px] text-muted-foreground">Emails cannot be changed directly in this demo.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
                            <input
                                id="full_name"
                                name="full_name"
                                type="text"
                                defaultValue={profile?.full_name || ""}
                                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>

                        <div className="pt-2">
                            <SubmitButton className="w-auto px-6" pendingText="Saving...">
                                Save Changes
                            </SubmitButton>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                        Configure how you receive alerts from Growthly.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center justify-between space-x-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium leading-none">Marketing emails</span>
                                <span className="text-sm text-muted-foreground">Receive emails about new products, features, and more.</span>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-not-allowed opacity-50">
                                <span className="inline-block h-5 w-5 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium leading-none">Security emails</span>
                                <span className="text-sm text-muted-foreground">Receive emails about your account security. Always required.</span>
                            </div>
                            <button disabled className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-100">
                                <span className="inline-block h-5 w-5 translate-x-5 rounded-full bg-background shadow-lg ring-0 transition-transform" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
