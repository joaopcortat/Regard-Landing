import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppointmentSlot, type Appointment } from './AppointmentSlot';
import { cn } from '@/lib/utils';
import { AgendaContextMenu } from './AgendaContextMenu';
import { toast } from 'sonner';

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00

interface CalendarGridProps {
    appointments: Appointment[];
    onAddClick: (context?: { time: string, professional: string }) => void;
    onAppointmentClick: (apt: Appointment) => void;
    onMoveAppointment: (id: string, newTime: string) => void;
    onUpdateAppointment?: (id: string, updates: Partial<Appointment>) => void; // Added for status updates
}

// Helper to map time string "HH:mm" to grid row start
const getTopOffset = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    const startHour = 8;
    const pixelsPerHour = 120; // 60px per 30 mins
    return ((h - startHour) * pixelsPerHour) + ((m / 60) * pixelsPerHour);
};

const getHeight = (durationVal: number): number => {
    const pixelsPerHour = 120;
    return (durationVal / 60) * pixelsPerHour;
};

// Helper: Convert Y pixel to Time string (e.g. 150px -> "09:15")
// Assuming 0px = 08:00
const getTimeFromOffset = (offsetY: number): string => {
    const pixelsPerHour = 120;
    const startHour = 8;

    // Snap to nearest 15 mins (30px)
    const snappedY = Math.round(offsetY / 30) * 30;

    const hoursAdded = Math.floor(snappedY / pixelsPerHour);
    const minsAdded = (snappedY % pixelsPerHour) / 2; // 120px = 60min => 2px = 1min

    const h = startHour + hoursAdded;
    const m = minsAdded;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// Helper: Check overlap
const checkOverlap = (
    checkTime: string,
    checkDuration: number,
    professional: string,
    appointments: Appointment[],
    excludeId?: string
): boolean => {
    const [startH, startM] = checkTime.split(':').map(Number);
    const startMins = startH * 60 + startM;
    const endMins = startMins + checkDuration;

    return appointments.some((apt, index) => {
        if (apt.id === excludeId) return false;

        const aptProfessional = index % 2 === 0 ? 'Dr. Ana Silva' : 'Dr. Pedro Santos';
        if (aptProfessional !== professional) return false;

        const [aptStartH, aptStartM] = apt.time.split(':').map(Number);
        const aptStart = aptStartH * 60 + aptStartM;
        const aptEnd = aptStart + apt.duration;

        // Intersection check
        return (startMins < aptEnd) && (endMins > aptStart);
    });
};

export function CalendarGrid({ appointments, onAddClick, onAppointmentClick, onMoveAppointment, onUpdateAppointment }: CalendarGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOverTime, setDragOverTime] = useState<string | null>(null);
    const [dragOverCol, setDragOverCol] = useState<string | null>(null);
    const [ghostSlot, setGhostSlot] = useState<{ time: string, professional: string } | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, appointmentId: string } | null>(null);

    // Scroll to current time on mount (approximate 14:00 in mock)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 500;
        }
    }, []);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = "move";
        // Hide default drag image to use our custom ghost logic
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent 1x1
        e.dataTransfer.setDragImage(img, 0, 0);
    };

    const handleDragOver = (e: React.DragEvent, professional: string) => {
        e.preventDefault(); // allow drop
        if (!containerRef.current || !draggedId) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - rect.top;
        const time = getTimeFromOffset(offsetY);

        setDragOverTime(time);
        setDragOverCol(professional);
    };

    const handleDrop = (e: React.DragEvent, professional: string) => {
        e.preventDefault();

        if (draggedId && dragOverTime) {
            const draggedApt = appointments.find(a => a.id === draggedId);
            if (draggedApt) {
                // Conflict Detection
                const hasConflict = checkOverlap(dragOverTime, draggedApt.duration, professional, appointments, draggedId);

                if (hasConflict) {
                    toast.error("Conflito de horário! Sala ocupada.", {
                        description: `O horário ${dragOverTime} já está preenchido.`
                    });
                } else {
                    onMoveAppointment(draggedId, dragOverTime);
                    // Also need to handle professional change in real app, but mock is implicitly defined by index
                }
            }
        }

        setDragOverTime(null);
        setDragOverCol(null);
        setDraggedId(null);
    };

    const handleMouseMove = (e: React.MouseEvent, professional: string) => {
        if (draggedId) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - rect.top;
        const time = getTimeFromOffset(offsetY);
        setGhostSlot({ time, professional });
    };

    const handleColumnClick = (_e: React.MouseEvent, _professional: string) => {
        setContextMenu(null); // Close context menu
        if (!ghostSlot) return;
        onAddClick(ghostSlot);
    };

    const handleContextMenu = (e: React.MouseEvent, aptId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ x: e.clientX, y: e.clientY, appointmentId: aptId });
    };

    const handleContextAction = (action: string) => {
        if (!contextMenu || !onUpdateAppointment) return;

        const apt = appointments.find(a => a.id === contextMenu.appointmentId);
        if (!apt) return;

        if (action === 'check_in') {
            onUpdateAppointment(apt.id, { status: 'confirmed' }); // Mocking check-in as confirmed + reception logic in Slot
            toast.success("Status atualizado: Na Recepção");
        } else if (action === 'cancel') {
            onUpdateAppointment(apt.id, { status: 'canceled' });
            toast.success("Agendamento cancelado");
        } else if (action === 'pay') {
            onUpdateAppointment(apt.id, { paymentStatus: 'paid' });
            toast.success("Pagamento recebido!");
        } else if (action === 'profile') {
            toast("Navegando para o prontuário...");
        }

        setContextMenu(null);
    };

    // --- RESIZE LOGIC ---
    const [resizingId, setResizingId] = useState<string | null>(null);
    const [resizeDuration, setResizeDuration] = useState<number | null>(null);

    // We need refs to track values inside event listeners
    const resizingRef = useRef<{ id: string, startY: number, startDuration: number } | null>(null);

    // Using a ref to track the latest calculated duration so MouseUp can read it
    const latestDurationRef = useRef<number | null>(null);
    useEffect(() => { latestDurationRef.current = resizeDuration; }, [resizeDuration]);

    const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!resizingRef.current) return;

        const deltaY = e.clientY - resizingRef.current.startY;
        // 120px = 60min => 2px = 1min
        const deltaMins = Math.round(deltaY / 2);

        // Snap to 15 mins (30px) technically not enforced here for smoothness, but logic could clamp
        // Min duration 15 mins
        const newDuration = Math.max(15, resizingRef.current.startDuration + deltaMins);

        // Snap to 15 min steps
        const snappedDuration = Math.round(newDuration / 15) * 15;

        setResizeDuration(snappedDuration);
    };

    const handleGlobalMouseUpFixed = () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUpFixed);

        if (resizingRef.current && latestDurationRef.current && onUpdateAppointment) {
            onUpdateAppointment(resizingRef.current.id, { duration: latestDurationRef.current });
            toast.success("Duração atualizada");
        }
        setResizingId(null);
        setResizeDuration(null);
        resizingRef.current = null;
    };

    const handleResizeStartFixed = (e: React.MouseEvent, id: string, duration: number) => {
        e.preventDefault();
        e.stopPropagation();
        setResizingId(id);
        const startY = e.clientY;
        resizingRef.current = { id, startY, startDuration: duration };
        latestDurationRef.current = duration; // Init

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUpFixed);
    };

    return (
        <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-[#09090b]">

            {/* Context Menu Overlay */}
            {contextMenu && (
                <AgendaContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                    onAction={handleContextAction}
                />
            )}

            {/* Calendar Header */}
            <div className="h-16 border-b border-[#27272a] flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-[#121214] border border-[#27272a] rounded-lg p-1">
                        <button className="p-1 hover:bg-[#27272a] rounded text-[#a1a1aa] hover:text-white transition-colors"><ChevronLeft size={18} /></button>
                        <span className="px-3 text-sm font-medium text-[#f4f4f5]">Hoje</span>
                        <button className="p-1 hover:bg-[#27272a] rounded text-[#a1a1aa] hover:text-white transition-colors"><ChevronRight size={18} /></button>
                    </div>
                    <h2 className="text-xl font-medium text-[#f4f4f5] hidden md:block">14 de Janeiro, 2026</h2>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-[#121214] border border-[#27272a] rounded-lg p-1">
                        <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#27272a] text-white shadow-sm">Dia</button>
                        <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#a1a1aa] hover:text-white transition-colors">Semana</button>
                        <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#a1a1aa] hover:text-white transition-colors">Lista</button>
                    </div>
                    <button
                        onClick={() => onAddClick()}
                        className="bg-dash-primary hover:bg-dash-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
                    >
                        + Novo Agendamento
                    </button>
                </div>
            </div>

            {/* Calendar Header Columns (Doctors) */}
            <div className="flex border-b border-[#27272a] bg-[#121214]">
                <div className="w-16 flex-shrink-0 border-r border-[#27272a] p-3 text-center text-xs font-medium text-[#a1a1aa]">GMT-3</div>
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 divide-x divide-[#27272a]">
                    <div className="p-3 text-center">
                        <p className="text-sm font-medium text-white">Dr. Ana Silva</p>
                        <p className="text-xs text-[#a1a1aa]">Dermatologia</p>
                    </div>
                    <div className="p-3 text-center bg-[#18181b]/50">
                        <p className="text-sm font-medium text-white">Dr. Pedro Santos</p>
                        <p className="text-xs text-[#a1a1aa]">Cirurgião</p>
                    </div>
                    <div className="p-3 text-center hidden lg:block">
                        <p className="text-sm font-medium text-white">Sala 1 (Laser)</p>
                        <p className="text-xs text-[#a1a1aa]">Recurso</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Grid Area */}
            <div ref={containerRef} className="flex-1 overflow-y-auto relative custom-scrollbar">
                <div className="flex min-h-[1440px] relative"> {/* 12h * 120px = 1440px height canvas */}

                    {/* Time Axis Background */}
                    <div className="w-16 flex-shrink-0 border-r border-[#27272a] bg-[#09090b] z-10 sticky left-0">
                        {TIME_SLOTS.map(hour => (
                            <div key={hour} className="h-[120px] border-b border-[#27272a] relative">
                                <span className="absolute -top-2.5 right-2 text-xs text-[#71717a] font-medium bg-[#09090b] px-1">
                                    {hour}:00
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Columns */}
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 divide-x divide-[#27272a] relative">

                        {/* Current Time Line Indicator (mock) */}
                        <div className="absolute w-full border-t border-dash-primary/50 z-20 pointer-events-none" style={{ top: '800px' }}> {/* Approx 14:40 */}
                            <div className="absolute -left-16 -top-1.5 bg-dash-primary text-white text-[10px] font-bold px-1 py-0.5 rounded-r">
                                14:44
                            </div>
                            <div className="absolute -left-1 w-2 h-2 rounded-full bg-dash-primary -top-1"></div>
                        </div>

                        {/* Column 1: Dr. Ana */}
                        <div
                            className={cn("relative bg-[linear-gradient(to_bottom,#121214_1px,transparent_1px)] bg-[size:100%_60px] cursor-pointer group/col", draggedId && "bg-blue-500/5")}
                            onDragOver={(e) => handleDragOver(e, 'Dr. Ana Silva')}
                            onDrop={(e) => handleDrop(e, 'Dr. Ana Silva')}
                            onMouseMove={(e) => handleMouseMove(e, 'Dr. Ana Silva')}
                            onMouseLeave={() => setGhostSlot(null)}
                            onClick={(e) => handleColumnClick(e, 'Dr. Ana Silva')}
                        >
                            {/* Ghost Slot (Hover Interaction) */}
                            {!draggedId && ghostSlot && ghostSlot.professional === 'Dr. Ana Silva' && (
                                <div
                                    className="absolute left-1 right-1 z-20 pointer-events-none bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover/col:opacity-100 transition-opacity"
                                    style={{ top: `${getTopOffset(ghostSlot.time)}px`, height: '60px' }}
                                >
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">+ Agendar {ghostSlot.time}</span>
                                </div>
                            )}

                            {/* Drag Preview Slot with Conflict Visual */}
                            {draggedId && dragOverTime && dragOverCol === 'Dr. Ana Silva' && (
                                <div
                                    className={cn(
                                        "absolute left-1 right-1 z-30 border rounded-lg pointer-events-none transition-colors",
                                        checkOverlap(dragOverTime, appointments.find(a => a.id === draggedId)?.duration || 60, 'Dr. Ana Silva', appointments, draggedId)
                                            ? "bg-red-500/20 border-red-500 text-red-500 flex items-center justify-center" // Conflict
                                            : "bg-blue-500/20 border-blue-500" // Valid
                                    )}
                                    style={{
                                        top: `${getTopOffset(dragOverTime)}px`,
                                        height: `${getHeight(appointments.find(a => a.id === draggedId)?.duration || 60)}px`
                                    }}
                                >
                                    {checkOverlap(dragOverTime, appointments.find(a => a.id === draggedId)?.duration || 60, 'Dr. Ana Silva', appointments, draggedId) && (
                                        <span className="text-xs font-bold uppercase tracking-wider">Ocupado</span>
                                    )}
                                </div>
                            )}

                            {/* Render Appointments for col 1 */}
                            {appointments.filter((_, i) => i % 2 === 0).map(apt => (
                                <div
                                    key={apt.id}
                                    className={cn("absolute left-1 right-1 z-10 transition-opacity", draggedId === apt.id ? "opacity-30" : "opacity-100")}
                                    style={{
                                        top: `${getTopOffset(apt.time)}px`,
                                        height: `${getHeight(resizingId === apt.id && resizeDuration ? resizeDuration : apt.duration)}px`,
                                        zIndex: resizingId === apt.id ? 40 : 10
                                    }}
                                    onClick={(e) => { e.stopPropagation(); onAppointmentClick(apt); }}
                                >
                                    <AppointmentSlot
                                        appointment={apt}
                                        onDragStart={(e) => handleDragStart(e, apt.id)}
                                        onContextMenu={(e) => handleContextMenu(e, apt.id)}
                                        onResizeStart={(e) => handleResizeStartFixed(e, apt.id, apt.duration)}
                                    />
                                    {/* Show resize duration tooltip */}
                                    {resizingId === apt.id && resizeDuration && (
                                        <div className="absolute -right-16 top-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                            {resizeDuration} min
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Column 2: Dr. Pedro */}
                        <div
                            className={cn("relative bg-[linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:100%_60px] cursor-pointer group/col", draggedId && "bg-blue-500/5")}
                            onDragOver={(e) => handleDragOver(e, 'Dr. Pedro Santos')}
                            onDrop={(e) => handleDrop(e, 'Dr. Pedro Santos')}
                            onMouseMove={(e) => handleMouseMove(e, 'Dr. Pedro Santos')}
                            onMouseLeave={() => setGhostSlot(null)}
                            onClick={(e) => handleColumnClick(e, 'Dr. Pedro Santos')}
                        >
                            {/* Ghost Slot (Hover Interaction) */}
                            {!draggedId && ghostSlot && ghostSlot.professional === 'Dr. Pedro Santos' && (
                                <div
                                    className="absolute left-1 right-1 z-20 pointer-events-none bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover/col:opacity-100 transition-opacity"
                                    style={{ top: `${getTopOffset(ghostSlot.time)}px`, height: '60px' }}
                                >
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">+ Agendar {ghostSlot.time}</span>
                                </div>
                            )}

                            {/* Drag Preview Slot with Conflict Visual */}
                            {draggedId && dragOverTime && dragOverCol === 'Dr. Pedro Santos' && (
                                <div
                                    className={cn(
                                        "absolute left-1 right-1 z-30 border rounded-lg pointer-events-none transition-colors",
                                        checkOverlap(dragOverTime, appointments.find(a => a.id === draggedId)?.duration || 60, 'Dr. Pedro Santos', appointments, draggedId)
                                            ? "bg-red-500/20 border-red-500 text-red-500 flex items-center justify-center" // Conflict
                                            : "bg-blue-500/20 border-blue-500" // Valid
                                    )}
                                    style={{
                                        top: `${getTopOffset(dragOverTime)}px`,
                                        height: `${getHeight(appointments.find(a => a.id === draggedId)?.duration || 60)}px`
                                    }}
                                >
                                    {checkOverlap(dragOverTime, appointments.find(a => a.id === draggedId)?.duration || 60, 'Dr. Pedro Santos', appointments, draggedId) && (
                                        <span className="text-xs font-bold uppercase tracking-wider">Ocupado</span>
                                    )}
                                </div>
                            )}

                            {appointments.filter((_, i) => i % 2 !== 0).map(apt => (
                                <div
                                    key={apt.id}
                                    className={cn("absolute left-1 right-1 z-10 transition-opacity", draggedId === apt.id ? "opacity-30" : "opacity-100")}
                                    style={{
                                        top: `${getTopOffset(apt.time)}px`,
                                        height: `${getHeight(resizingId === apt.id && resizeDuration ? resizeDuration : apt.duration)}px`,
                                        zIndex: resizingId === apt.id ? 40 : 10
                                    }}
                                    onClick={(e) => { e.stopPropagation(); onAppointmentClick(apt); }}
                                >
                                    <AppointmentSlot
                                        appointment={apt}
                                        onDragStart={(e) => handleDragStart(e, apt.id)}
                                        onContextMenu={(e) => handleContextMenu(e, apt.id)}
                                        onResizeStart={(e) => handleResizeStartFixed(e, apt.id, apt.duration)}
                                    />
                                    {/* Show resize duration tooltip */}
                                    {resizingId === apt.id && resizeDuration && (
                                        <div className="absolute -right-16 top-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                            {resizeDuration} min
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Column 3: Resource */}
                        <div className="relative hidden lg:block bg-[linear-gradient(to_bottom,#121214_1px,transparent_1px)] bg-[size:100%_60px]">
                            {/* Empty for now */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
