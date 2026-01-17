import { ChevronLeft, ChevronRight, Eye, EyeOff, Calendar as CalendarIcon, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

export function AgendaSidebar() {
    // const [viewDate, setViewDate] = useState(new Date());

    const professionals = [
        { id: 1, name: "Dr. Ana Silva", color: "border-purple-500", bg: "bg-purple-500", initials: "AS", active: true },
        { id: 2, name: "Dr. Pedro Santos", color: "border-blue-500", bg: "bg-blue-500", initials: "PS", active: true },
        { id: 3, name: "Dra. Carol L.", color: "border-pink-500", bg: "bg-pink-500", initials: "CL", active: false },
    ];

    const resources = [
        { id: 4, name: "Sala Laser", color: "border-emerald-500", bg: "bg-emerald-500", initials: "SL", active: true },
        { id: 5, name: "Sala Injetáveis", color: "border-amber-500", bg: "bg-amber-500", initials: "SI", active: true },
    ];

    return (
        <aside className="hidden lg:flex w-80 flex-col border-r border-[#27272a] bg-[#09090b] h-[calc(100vh-4rem)] overflow-y-auto">
            {/* MINI CALENDAR NAVIGATOR */}
            <div className="p-6 border-b border-[#27272a]">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-white capitalize">
                        Janeiro 2026
                    </span>
                    <div className="flex gap-1">
                        <button className="p-1 hover:bg-[#27272a] rounded text-[#a1a1aa] hover:text-white transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-1 hover:bg-[#27272a] rounded text-[#a1a1aa] hover:text-white transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["D", "S", "T", "Q", "Q", "S", "S"].map(d => (
                        <div key={d} className="text-[10px] font-medium text-[#71717a] py-1 uppercase">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Empty slots for prev month (mock) */}
                    <div className="py-2" />
                    <div className="py-2" />
                    <div className="py-2" />

                    {/* Days */}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                        const isCurrent = day === 15;
                        const hasAppointments = [14, 15, 16, 20, 22].includes(day);
                        const isSelected = day === 15;

                        return (
                            <button
                                key={day}
                                className={cn(
                                    "relative h-8 w-8 mx-auto flex items-center justify-center rounded-lg text-xs font-medium transition-all group",
                                    isSelected && !isCurrent ? "bg-[#27272a] text-white ring-1 ring-[#3f3f46]" : "text-[#d4d4d8] hover:bg-[#18181b]",
                                    isCurrent ? "bg-[#3b82f6] text-white shadow-lg shadow-blue-900/40 font-bold" : ""
                                )}
                            >
                                {day}
                                {hasAppointments && !isCurrent && (
                                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#71717a] group-hover:bg-[#a1a1aa]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* FILTERS SECTION */}
            <div className="p-6 space-y-8 flex-1">

                {/* 1. PROFESSIONALS */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter size={12} className="text-[#52525b]" />
                        <span className="text-[10px] uppercase font-bold text-[#52525b] tracking-wider">Profissionais</span>
                    </div>

                    <div className="space-y-1">
                        {professionals.map(prof => (
                            <ProfessionalToggle key={prof.id} data={prof} type="doctor" />
                        ))}
                    </div>
                </div>

                {/* 2. RESOURCES */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CalendarIcon size={12} className="text-[#52525b]" />
                        <span className="text-[10px] uppercase font-bold text-[#52525b] tracking-wider">Salas & Equipamentos</span>
                    </div>

                    <div className="space-y-1">
                        {resources.map(res => (
                            <ProfessionalToggle key={res.id} data={res} type="resource" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sync Status / Footer */}
            <div className="p-4 border-t border-[#27272a] text-center">
                <p className="text-[10px] text-[#52525b]">
                    Ultima sincronização: 14:02 • Google Calendar
                </p>
            </div>
        </aside>
    );
}

// --- SUB-COMPONENT: DOCTOR TOGGLE ---

function ProfessionalToggle({ data, type }: any) {
    const [isVisible, setIsVisible] = useState(data.active);

    return (
        <motion.div
            onClick={() => setIsVisible(!isVisible)}
            className={cn(
                "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 group border border-transparent",
                isVisible ? "hover:bg-[#18181b]" : "opacity-60 hover:opacity-80"
            )}
        >
            <div className="flex items-center gap-3">
                {/* Avatar / Ring */}
                <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center bg-[#121214] text-[10px] font-bold",
                    isVisible ? `${data.color} text-white` : "border-[#27272a] text-[#52525b]"
                )}>
                    {type === 'doctor' ? (
                        data.initials
                    ) : (
                        <div className={cn("w-2 h-2 rounded-full", isVisible ? data.bg : "bg-[#27272a]")} />
                    )}
                </div>

                {/* Name */}
                <span className={cn(
                    "text-sm font-medium transition-colors",
                    isVisible ? "text-[#e4e4e7]" : "text-[#71717a] line-through decoration-[#52525b]"
                )}>
                    {data.name}
                </span>
            </div>

            {/* Action Icon */}
            <div className="text-[#52525b] group-hover:text-[#a1a1aa]">
                {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
            </div>
        </motion.div>
    );
}
