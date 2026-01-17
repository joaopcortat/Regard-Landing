import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function GeoIntelMap() {
    return (
        <div className="relative w-full h-[300px] overflow-hidden rounded-xl bg-[#121214] border border-[#27272a] shadow-lg shadow-black/40">
            {/* Dark Map Background (SVG Abstraction) */}
            <svg className="absolute inset-0 w-full h-full text-zinc-800" viewBox="0 0 400 300" preserveAspectRatio="none">
                {/* Land Mass */}
                <path
                    d="M0,0 L400,0 L400,300 L0,300 Z"
                    className="fill-[#09090b]"
                />

                {/* City Blocks Abstraction */}
                <path
                    d="M40,40 L120,40 L120,120 L40,120 Z M140,40 L280,40 L280,180 L140,180 Z M300,80 L360,80 L360,140 L300,140 Z M40,140 L120,140 L120,260 L40,260 Z M160,200 L260,200 L260,260 L160,260 Z"
                    className="fill-[#18181b]"
                />

                {/* Roads/Grid */}
                <path
                    d="M0,80 L400,80 M140,0 L140,300 M280,0 L280,300 M0,200 L400,200"
                    stroke="#27272a"
                    strokeWidth="1"
                    className="opacity-50"
                />

                {/* River/Coastline */}
                <path
                    d="M320,0 C320,100 280,150 280,300"
                    stroke="#09090b"
                    strokeWidth="20"
                    className="opacity-50"
                />
            </svg>

            {/* Glowing Heatmap Dots */}
            {/* Cluster 1: Jardins (Dense) */}
            <div className="absolute top-[30%] left-[45%]">
                <PulsingDot delay={0} size="h-6 w-6" color="bg-blue-500" />
                <PulsingDot delay={0.5} size="h-4 w-4" className="absolute -top-3 -right-4" color="bg-blue-400" />
                <PulsingDot delay={1} size="h-3 w-3" className="absolute -bottom-2 -left-3" color="bg-blue-600" />
            </div>

            {/* Cluster 2: Leblon (Moderate) */}
            <div className="absolute bottom-[25%] left-[20%]">
                <PulsingDot delay={1.5} size="h-5 w-5" color="bg-emerald-500" />
                <PulsingDot delay={2} size="h-3 w-3" className="absolute -top-3 left-2" color="bg-emerald-400" />
            </div>

            {/* Floating Glass Card - Overlay */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-4 right-4 p-3 rounded-lg bg-[#09090b]/80 border border-[#27272a] backdrop-blur-md shadow-xl flex items-center gap-3"
            >
                <div className="bg-blue-500/10 p-2 rounded-full text-blue-500">
                    <MapPin size={16} />
                </div>
                <div>
                    <p className="text-xs text-[#a1a1aa] uppercase tracking-wide">Dominância</p>
                    <p className="text-sm font-bold text-white">Jardins <span className="text-emerald-500 ml-1">42% VIPs</span></p>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-4 left-4 p-2 rounded-lg bg-[#09090b]/80 border border-[#27272a] backdrop-blur-md shadow-xl flex items-center gap-2"
            >
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs text-[#a1a1aa]">Alta Densidade de Pacientes</span>
            </motion.div>
        </div>
    );
}

function PulsingDot({ delay, size, color, className }: { delay: number, size: string, color: string, className?: string }) {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <motion.span
                animate={{ scale: [1, 2, 2], opacity: [0.7, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: delay, ease: "easeOut" }}
                className={cn("absolute inline-flex rounded-full opacity-75", size, color)}
            >
            </motion.span>
            <span className={cn("relative inline-flex rounded-full", size.replace('h-', 'h-').replace('w-', 'w-').replace(/[0-9]+/g, (m) => String(Number(m) / 2)), color)}></span>
        </div>
    );
}
