"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pendingText?: string;
    formAction?: (formData: FormData) => void | Promise<any>;
}

export function SubmitButton({
    children,
    pendingText = "Submitting...",
    className,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            type="submit"
            disabled={pending || props.disabled}
            className={cn(
                "flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
        >
            {pending ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {pendingText}
                </>
            ) : (
                children
            )}
        </button>
    );
}
