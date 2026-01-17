import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import { AgendaSidebar } from "@/components/agenda/AgendaSidebar";
import { CalendarGrid } from "@/components/agenda/CalendarGrid";
import { AppointmentModal } from "@/components/agenda/AppointmentModal";
import { AppointmentDetailsSheet } from "@/components/agenda/AppointmentDetailsSheet";
import { WaitlistWidget } from "@/components/agenda/WaitlistWidget";
import { type Appointment } from "@/components/agenda/AppointmentSlot";
import { Users } from "lucide-react";

const INITIAL_APPOINTMENTS: Appointment[] = [
    {
        id: '1',
        patient: 'Mariana Silva',
        procedure: 'Harmonização Facial',
        time: '14:00',
        duration: 90,
        status: 'confirmed',
        paymentStatus: 'paid',
        type: 'aesthetic',
        hasNotes: true
    },
    {
        id: '2',
        patient: 'Carlos Eduardo',
        procedure: 'Retorno',
        time: '15:30',
        duration: 30,
        status: 'pending',
        paymentStatus: 'pending',
        type: 'return',
    },
    {
        id: '3',
        patient: 'Ana Paula',
        procedure: 'Botox Full Face',
        time: '10:00',
        duration: 60,
        status: 'confirmed',
        paymentStatus: 'partial',
        type: 'aesthetic',
    },
    {
        id: '4',
        patient: 'Ricardo Mendes',
        procedure: 'Avaliação Capilar',
        time: '16:00',
        duration: 45,
        status: 'completed',
        paymentStatus: 'paid',
        type: 'consultation',
    }
];

export function Agenda() {
    const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [modalContext, setModalContext] = useState<{ time: string, professional: string } | undefined>();
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Naive mobile check - in production use a hook like useMedia
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleCreate = (data: Omit<Appointment, 'id' | 'status' | 'paymentStatus' | 'duration' | 'type'>) => {
        const newApt: Appointment = {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            duration: 60, // Default duration
            status: 'pending',
            paymentStatus: 'pending',
            type: 'consultation', // Default type
            hasNotes: false
        };
        setAppointments([...appointments, newApt]);
        toast.success("Agendamento criado com sucesso", {
            description: `${data.patient} - ${data.procedure}`
        });
    };

    const handleMove = (id: string, newTime: string) => {
        setAppointments(prev => prev.map(apt =>
            apt.id === id ? { ...apt, time: newTime } : apt
        ));
        toast.success("Horário atualizado", {
            description: `Novo horário: ${newTime}`
        });
    };

    const handleUpdate = (id: string, updates: Partial<Appointment>) => {
        setAppointments(prev => prev.map(apt =>
            apt.id === id ? { ...apt, ...updates } : apt
        ));

        // Update selected appointment if open
        if (selectedAppointment && selectedAppointment.id === id) {
            setSelectedAppointment(prev => prev ? { ...prev, ...updates } : null);
        }

        toast.success("Agendamento atualizado");
    };

    const handleDelete = (id: string) => {
        setAppointments(prev => prev.filter(apt => apt.id !== id));
        setSelectedAppointment(null);
        toast.error("Agendamento removido");
    };

    return (
        <Layout>
            <div className="relative flex h-[calc(100vh-8rem)] -m-8 overflow-hidden rounded-tl-xl border-t border-l border-[#27272a] shadow-inner bg-[#09090b]">
                <AgendaSidebar />

                {isMobile ? (
                    <div className="flex-1 overflow-y-auto bg-[#09090b] p-4 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="tex-lg font-medium text-white">Agenda do Dia</h3>
                            <button
                                onClick={() => { setModalContext(undefined); setIsNewModalOpen(true); }}
                                className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg"
                            >
                                + Novo
                            </button>
                        </div>
                        {appointments.sort((a, b) => a.time.localeCompare(b.time)).map(apt => (
                            <div
                                key={apt.id}
                                onClick={() => setSelectedAppointment(apt)}
                                className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] active:scale-95 transition-transform"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-lg font-bold text-white">{apt.time}</span>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] uppercase font-bold",
                                        apt.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-800 text-zinc-400"
                                    )}>
                                        {apt.status}
                                    </span>
                                </div>
                                <h4 className="font-medium text-zinc-200">{apt.patient}</h4>
                                <p className="text-sm text-zinc-500">{apt.procedure}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <CalendarGrid
                        appointments={appointments}
                        onAddClick={(ctx) => {
                            setModalContext(ctx);
                            setIsNewModalOpen(true);
                        }}
                        onAppointmentClick={setSelectedAppointment}
                        onMoveAppointment={handleMove}
                        onUpdateAppointment={handleUpdate}
                    />
                )}

                {/* Waitlist Toggle Button (Floating or integrated) */}
                <div className="absolute right-6 top-6 z-10 hidden lg:block">
                    <button
                        onClick={() => setIsWaitlistOpen(!isWaitlistOpen)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-xs font-medium shadow-lg backdrop-blur-md",
                            isWaitlistOpen
                                ? "bg-[#3b82f6] border-[#3b82f6] text-white"
                                : "bg-[#18181b]/80 border-[#27272a] text-[#a1a1aa] hover:text-white"
                        )}
                    >
                        <Users size={14} />
                        {isWaitlistOpen ? 'Ocultar Fila' : 'Lista de Espera'}
                    </button>
                </div>

                <div className="hidden lg:block">
                    <WaitlistWidget
                        isOpen={isWaitlistOpen}
                        onToggle={() => setIsWaitlistOpen(!isWaitlistOpen)}
                    />
                </div>
            </div>

            <AppointmentModal
                isOpen={isNewModalOpen}
                onClose={() => { setIsNewModalOpen(false); setModalContext(undefined); }}
                onSave={handleCreate}
                initialData={modalContext}
            />

            <AppointmentDetailsSheet
                appointment={selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        </Layout>
    );
}
