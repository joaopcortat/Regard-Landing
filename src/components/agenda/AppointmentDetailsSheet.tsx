import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, FileText, CheckCircle2, MessageSquare, CreditCard, ChevronRight, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Appointment } from './AppointmentSlot';
import { useState } from 'react';
import { toast } from 'sonner';

interface AppointmentDetailsSheetProps {
    appointment: Appointment | null;
    onClose: () => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Appointment>) => void;
}

export function AppointmentDetailsSheet({ appointment, onClose, onDelete, onUpdate }: AppointmentDetailsSheetProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!appointment) return null;

    const handleStatusChange = (newStatus: Appointment['status']) => {
        setIsLoading(true);
        // Simulate network
        setTimeout(() => {
            onUpdate(appointment.id, { status: newStatus });
            setIsLoading(false);
            if (newStatus === 'checked_in') toast.success("Check-in realizado com sucesso");
        }, 600);
    };

    return (
        <AnimatePresence>
            {appointment && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed top-0 right-0 z-50 h-full w-[440px] bg-[#09090b] border-l border-[#27272a] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-[#27272a] bg-[#09090b]">
                            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Detalhes do Agendamento</h2>
                            <button onClick={onClose} className="p-2 hover:bg-[#27272a] rounded-lg text-[#a1a1aa] transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Patient Profile Card */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                                    {appointment.patient.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{appointment.patient}</h3>
                                    <p className="text-sm text-[#a1a1aa] flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Cliente Recorrente
                                    </p>
                                </div>
                            </div>

                            {/* Status Bar */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className={cn(
                                    "p-3 rounded-lg border flex flex-col items-center justify-center text-center",
                                    appointment.status === 'checked_in' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-[#18181b] border-[#27272a] text-[#a1a1aa]"
                                )}>
                                    <span className="text-[10px] uppercase font-bold tracking-wider mb-1">Status</span>
                                    <span className="font-medium text-sm">
                                        {appointment.status === 'checked_in' ? 'Na Recepção' :
                                            appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                    </span>
                                </div>
                                <div className={cn(
                                    "p-3 rounded-lg border flex flex-col items-center justify-center text-center",
                                    appointment.paymentStatus === 'paid' ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                )}>
                                    <span className="text-[10px] uppercase font-bold tracking-wider mb-1">Pagamento</span>
                                    <span className="font-medium text-sm">
                                        {appointment.paymentStatus === 'paid' ? 'Pago' : 'Pendente'}
                                    </span>
                                </div>
                            </div>

                            {/* Key Details */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-semibold text-[#52525b] uppercase tracking-wider">Informações da Sessão</h4>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded-lg border border-[#27272a]">
                                        <div className="p-2 bg-[#27272a] rounded text-blue-400">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#a1a1aa]">Procedimento</p>
                                            <p className="text-sm font-medium text-white">{appointment.procedure}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded-lg border border-[#27272a]">
                                        <div className="p-2 bg-[#27272a] rounded text-purple-400">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#a1a1aa]">Data & Hora</p>
                                            <p className="text-sm font-medium text-white">Hoje, {appointment.time} • ({appointment.duration} min)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-[#18181b] rounded-lg border border-[#27272a]">
                                        <div className="p-2 bg-[#27272a] rounded text-amber-400">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#a1a1aa]">Profissional</p>
                                            <p className="text-sm font-medium text-white">Dr. Ana Silva</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions List */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-semibold text-[#52525b] uppercase tracking-wider">Ações Rápidas</h4>

                                <button className="w-full flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] rounded-lg group transition-colors">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare size={18} className="text-[#a1a1aa] group-hover:text-white" />
                                        <span className="text-sm font-medium text-[#e4e4e7]">Enviar Lembrete WhatsApp</span>
                                    </div>
                                    <ChevronRight size={16} className="text-[#52525b]" />
                                </button>

                                <button className="w-full flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] rounded-lg group transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Edit size={18} className="text-[#a1a1aa] group-hover:text-white" />
                                        <span className="text-sm font-medium text-[#e4e4e7]">Editar Notas Clínicas</span>
                                    </div>
                                    <ChevronRight size={16} className="text-[#52525b]" />
                                </button>

                                <button className="w-full flex items-center justify-between p-4 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] rounded-lg group transition-colors">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={18} className="text-[#a1a1aa] group-hover:text-white" />
                                        <span className="text-sm font-medium text-[#e4e4e7]">Gerar Link de Pagamento</span>
                                    </div>
                                    <ChevronRight size={16} className="text-[#52525b]" />
                                </button>
                            </div>

                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 bg-[#09090b] border-t border-[#27272a] space-y-3">
                            {appointment.status !== 'checked_in' ? (
                                <button
                                    onClick={() => handleStatusChange('checked_in')}
                                    disabled={isLoading}
                                    className="w-full bg-[#3b82f6] hover:bg-[#2563eb] h-12 rounded-lg font-bold text-white shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? 'Processando...' : (
                                        <>
                                            <CheckCircle2 size={18} />
                                            Realizar Check-in
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 h-12 rounded-lg font-bold text-emerald-500 cursor-default flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={18} />
                                    Check-in Realizado
                                </button>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => onDelete(appointment.id)}
                                    className="h-10 rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={14} /> Cancelar
                                </button>
                                <button className="h-10 rounded-lg border border-[#27272a] bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white text-xs font-semibold uppercase tracking-wider">
                                    Reagendar
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
