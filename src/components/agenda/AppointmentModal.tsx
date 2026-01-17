import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Sparkles, Check, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Keep assuming utils exists
import { toast } from 'sonner';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: {
        time?: string;
        professional?: string;
    };
}

const PATIENTS = [
    { id: 1, name: "Fernanda Vasconcellos", lastProc: "Botox (3 meses atrás)" },
    { id: 2, name: "Ricardo Mendes", lastProc: "Primeira vez" },
    { id: 3, name: "Ana Paula", lastProc: "Bioestimulador" },
];

const PROCEDURES = [
    { id: 'botox', name: 'Toxina Botulínica', duration: 30, price: 'R$ 1.200' },
    { id: 'preenchimento', name: 'Preenchimento Labial', duration: 45, price: 'R$ 1.400' },
    { id: 'bio', name: 'Bioestimulador (Sculptra)', duration: 60, price: 'R$ 2.800' },
    { id: 'consulta', name: 'Consulta Avaliação', duration: 60, price: 'R$ 450' },
];

export function AppointmentModal({ isOpen, onClose, onSave, initialData }: AppointmentModalProps) {
    const [patientQuery, setPatientQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        time: '',
        professional: 'Dr. Ana Silva',
        duration: 60,
        price: ''
    });

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData(prev => ({
                ...prev,
                time: initialData.time || '',
                professional: initialData.professional || 'Dr. Ana Silva'
            }));
        }
    }, [isOpen, initialData]);

    // High-IQ: Auto-update duration/price
    useEffect(() => {
        if (selectedProcedure) {
            setFormData(prev => ({
                ...prev,
                duration: selectedProcedure.duration,
                price: selectedProcedure.price
            }));
        }
    }, [selectedProcedure]);

    const handleSave = () => {
        if (!selectedPatient || !selectedProcedure || !formData.time) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            onSave({
                patient: selectedPatient.name,
                procedure: selectedProcedure.name,
                time: formData.time,
                duration: formData.duration,
                professional: formData.professional
            });
            setIsLoading(false);
            onClose();
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="w-full max-w-lg bg-[#18181b] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[#27272a] flex items-center justify-between bg-[#18181b]">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Novo Agendamento</h2>
                            <p className="text-xs text-[#a1a1aa]">Preencha os dados da consulta.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[#27272a] rounded-lg text-[#a1a1aa] hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* 1. SMART PATIENT SEARCH */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-[#e4e4e7]">Paciente</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar paciente..."
                                    value={selectedPatient ? selectedPatient.name : patientQuery}
                                    onChange={(e) => {
                                        setPatientQuery(e.target.value);
                                        setSelectedPatient(null);
                                    }}
                                    className="w-full bg-[#09090b] border border-[#27272a] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors placeholder:text-[#52525b]"
                                />
                                {selectedPatient && (
                                    <button
                                        onClick={() => { setSelectedPatient(null); setPatientQuery(''); }}
                                        className="absolute right-3 top-2.5 text-[#52525b] hover:text-white"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Dropdown Results */}
                            {patientQuery.length > 0 && !selectedPatient && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto">
                                    {PATIENTS.filter(p => p.name.toLowerCase().includes(patientQuery.toLowerCase())).map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => {
                                                setSelectedPatient(p);
                                                setPatientQuery('');
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-[#27272a] border-b border-[#27272a]/50 last:border-0 flex justify-between items-center group"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-white group-hover:text-[#3b82f6] transition-colors">{p.name}</p>
                                                <p className="text-[10px] text-[#71717a]">{p.lastProc}</p>
                                            </div>
                                            <div className="text-[10px] bg-[#27272a] text-[#a1a1aa] px-2 py-1 rounded">Selecionar</div>
                                        </button>
                                    ))}
                                    <button className="w-full text-left px-4 py-3 hover:bg-[#27272a] text-sm text-[#3b82f6] font-medium border-t border-[#27272a]">
                                        + Cadastrar "{patientQuery}"
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 2. PROCEDURE SELECT (High IQ) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#e4e4e7]">Procedimento</label>
                            <div className="grid grid-cols-2 gap-2">
                                {PROCEDURES.slice(0, 4).map(proc => (
                                    <button
                                        key={proc.id}
                                        onClick={() => setSelectedProcedure(proc)}
                                        className={cn(
                                            "flex flex-col items-start p-3 rounded-lg border transition-all text-left relative overflow-hidden",
                                            selectedProcedure?.id === proc.id
                                                ? "bg-[#3b82f6]/10 border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                                                : "bg-[#09090b] border-[#27272a] hover:border-[#3f3f46]"
                                        )}
                                    >
                                        <p className={cn("text-xs font-medium mb-1", selectedProcedure?.id === proc.id ? "text-[#93c5fd]" : "text-[#e4e4e7]")}>{proc.name}</p>
                                        <p className="text-[10px] text-[#71717a]">{proc.duration} min • {proc.price}</p>
                                        {selectedProcedure?.id === proc.id && (
                                            <div className="absolute top-2 right-2 text-[#3b82f6]">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. DETAILS ROW */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e4e4e7]">Horário</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                        className="w-full bg-[#09090b] border border-[#27272a] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e4e4e7]">Profissional</label>
                                <div className="relative">
                                    <select
                                        value={formData.professional}
                                        onChange={(e) => setFormData(prev => ({ ...prev, professional: e.target.value }))}
                                        className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors appearance-none"
                                    >
                                        <option>Dr. Ana Silva</option>
                                        <option>Dr. Pedro Santos</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 text-[#52525b] pointer-events-none" size={16} />
                                </div>
                            </div>
                        </div>

                        {/* 4. SMART SUMMARY */}
                        {selectedProcedure && (
                            <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/20 rounded-lg p-3 flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={14} className="text-[#3b82f6]" />
                                    <span className="text-[#93c5fd]">Valor estimado:</span>
                                </div>
                                <span className="font-bold text-[#e4e4e7] text-sm">{selectedProcedure.price}</span>
                            </div>
                        )}

                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-[#09090b] border-t border-[#27272a] flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-6 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Confirmar Agendamento'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
