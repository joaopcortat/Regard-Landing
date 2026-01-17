import { cn } from "@/lib/utils";
import { Check, DollarSign, UserSquare2, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";
import type { MouseEvent } from 'react';

export interface Appointment {
    id: string;
    patient: string;
    procedure: string;
    time: string; // HH:mm
    duration: number; // minutes
    status: 'confirmed' | 'pending' | 'completed' | 'canceled' | 'checked_in';
    paymentStatus: 'paid' | 'pending' | 'partial' | 'insurance';
    type: 'consultation' | 'aesthetic' | 'return';
    hasNotes?: boolean;
}

interface AppointmentSlotProps {
    appointment: Appointment;
    onClick?: () => void;
    style?: React.CSSProperties;
    onDragStart?: (e: React.DragEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    onResizeStart?: (e: React.MouseEvent) => void;
}

export function AppointmentSlot({ appointment, onClick, style, onDragStart, onContextMenu, onResizeStart }: AppointmentSlotProps) {
    const isPaid = appointment.paymentStatus === 'paid';
    const isPendingPayment = appointment.paymentStatus === 'pending';
    const isInsurance = appointment.paymentStatus === 'insurance';
    const isReception = !isPaid && appointment.status !== 'confirmed'; // Simulating "Na Recepção" logic for demo
    const isCanceled = appointment.status === 'canceled';

    // 1. RIBBON COLOR (Procedure Context)
    const ribbonColor = {
        consultation: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]",
        aesthetic: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]",
        return: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]",
    }[appointment.type] || "bg-zinc-500";

    const borderGlow = {
        consultation: "group-hover:border-blue-500/50",
        aesthetic: "group-hover:border-purple-500/50",
        return: "group-hover:border-emerald-500/50",
    }[appointment.type] || "group-hover:border-zinc-500/50";

    const handleAction = (e: MouseEvent, action: string) => {
        e.stopPropagation();
        toast.success(action, { description: appointment.patient });
    };

    return (
        <div
            draggable={!isCanceled}
            onDragStart={onDragStart}
            onClick={onClick}
            onContextMenu={onContextMenu}
            style={style}
            // 2. CARD STRUCTURE (Glass Edge, Depth)
            className={cn(
                "group relative w-full h-full rounded-lg bg-[#18181b]/90 backdrop-blur-sm border border-white/5",
                "shadow-sm hover:shadow-lg transition-all duration-200 ease-out hover:scale-[1.02] cursor-pointer overflow-hidden",
                borderGlow,
                isCanceled && "opacity-50 grayscale hover:scale-100 cursor-not-allowed"
            )}
        >
            {/* LEFT RIBBON (4px solid) */}
            <div className={cn("absolute left-0 top-0 bottom-0 w-1", ribbonColor)} />

            {/* CONTENT PADDING */}
            <div className="pl-3 pr-2 py-2 h-full flex flex-col justify-between relative z-10 w-full">

                {/* TOP ROW: Time & Name */}
                <div className="flex justify-between items-start w-full min-w-0 mb-0.5">
                    <p className={cn("text-[11px] font-semibold text-zinc-100 leading-tight truncate pr-1 flex-1", isCanceled && "line-through text-zinc-500")}>
                        {appointment.patient}
                    </p>
                    <span className="text-[9px] font-mono text-zinc-500 tracking-tight ml-auto">
                        {appointment.time}
                    </span>
                </div>

                {/* MIDDLE ROW: Procedure */}
                <p className={cn("text-[9px] text-zinc-400 truncate font-medium", isCanceled && "text-zinc-600")}>
                    {appointment.procedure}
                </p>

                {/* BOTTOM ROW: STATUS BADGES (The "Micro-Pills") */}
                {!isCanceled && (
                    <div className="flex justify-between items-end mt-auto pt-1 w-full">

                        {/* Payment Pill */}
                        {isPaid && (
                            <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <DollarSign size={8} className="text-emerald-500" strokeWidth={3} />
                                <span className="text-[7px] font-bold text-emerald-500 uppercase tracking-wider">PAGO</span>
                            </div>
                        )}
                        {isPendingPayment && (
                            <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                                <Clock size={8} className="text-rose-500" strokeWidth={3} />
                                <span className="text-[7px] font-bold text-rose-500 uppercase tracking-wider">PEND</span>
                            </div>
                        )}
                        {isInsurance && (
                            <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                                <ShieldCheck size={8} className="text-blue-500" strokeWidth={3} />
                                <span className="text-[7px] font-bold text-blue-500 uppercase tracking-wider">CONV</span>
                            </div>
                        )}

                        {/* Arrival Pulse */}
                        {isReception ? (
                            <div className="flex items-center gap-1" title="Na Recepção">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </div>
                        ) : (
                            appointment.status === 'confirmed' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Confirmado" />
                            )
                        )}
                    </div>
                )}
            </div>

            {/* RESIZE HANDLER (Bottom Center) - Only visible on hover */}
            {!isCanceled && (
                <div
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        // e.nativeEvent.stopImmediatePropagation(); // might be needed if drag starts
                        if (onResizeStart) onResizeStart(e);
                    }}
                    className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
                >
                    <div className="w-8 h-1 bg-white/20 rounded-full mb-0.5 pointer-events-none" />
                </div>
            )}

            {/* HOVER ACTIONS OVERLAY (Subtle) */}
            <div className="absolute inset-0 bg-[#09090b]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[1px] z-20 pointer-events-none group-hover:pointer-events-auto">
                <button
                    onClick={(e) => handleAction(e, "Check-in Confirmado")}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                    <Check size={14} />
                </button>
                <button
                    onClick={(e) => handleAction(e, "Abrindo Prontuário...")}
                    className="p-1.5 rounded-lg bg-blue-500/20 text-blue-500 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-colors"
                >
                    <UserSquare2 size={14} />
                </button>
            </div>
        </div>
    );
}
