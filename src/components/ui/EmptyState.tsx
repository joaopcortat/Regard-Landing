import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: React.ReactNode;
    className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
            <div className="mb-4 rounded-full bg-[#18181b] p-4 ring-1 ring-[#27272a]">
                <Icon size={32} className="text-[#52525b]" strokeWidth={1.5} />
            </div>
            <h3 className="mb-1 text-base font-medium text-white">{title}</h3>
            <p className="mb-6 max-w-sm text-sm text-[#a1a1aa]">{description}</p>
            {action}
        </div>
    );
}
