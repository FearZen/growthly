import { login } from "@/app/(auth)/actions";
import { SubmitButton } from "@/app/(auth)/submit-button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
    const searchParams = await props.searchParams;

    return (
        <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden p-4">

            {/* Background Decorative Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="relative w-full max-w-md rounded-3xl border border-border/50 bg-card/60 backdrop-blur-2xl p-8 shadow-2xl shadow-primary/5">

                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-primary-foreground shadow-lg shadow-primary/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-7 w-7"
                        >
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Welcome back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your dashboard.
                    </p>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-foreground" htmlFor="password">
                                Password
                            </label>
                            <Link href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
                        </div>
                        <input
                            className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <SubmitButton
                        formAction={login}
                        className="mt-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
                        pendingText="Signing In..."
                    >
                        Sign In
                    </SubmitButton>

                    {searchParams?.message && (
                        <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-500">
                            <ShieldAlert className="h-4 w-4 shrink-0" />
                            <span>{searchParams.message}</span>
                        </div>
                    )}
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-semibold text-primary hover:underline transition-all">
                        Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
}
