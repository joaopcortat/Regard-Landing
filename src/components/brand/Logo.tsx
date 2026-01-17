
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    collapsed?: boolean;
}

export function Logo({ className, iconClassName, textClassName, collapsed = false }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-3 select-none", className)}>
            {/* Official Monogram Asset */}
            <div
                className={cn(
                    "relative flex items-center justify-center w-8 h-8",
                    iconClassName
                )}
            >
                <img
                    src="/logo-icon.png"
                    alt="Cadran Icon"
                    className="w-full h-full object-contain mix-blend-screen"
                />
            </div>

            {/* Wordmark */}
            {!collapsed && (
                <div className="flex flex-col">
                    <span className={cn("font-bold text-lg tracking-[0.25em] text-white uppercase leading-none mt-1", textClassName)}>
                        CADRAN
                    </span>
                </div>
            )}
        </div>
    );
}
