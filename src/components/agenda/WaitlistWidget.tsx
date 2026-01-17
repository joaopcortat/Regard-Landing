import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Calendar, Clock, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface WaitlistPatient {
    id: string;
    name: string;
    procedure: string;
    constraints: string;
    urgency: 'high' | 'medium' | 'low';
    value: number; // Potential Revenue
    waitTime: string; // e.g., "3 semanas"
    avatar: string;
}

const MOCK_WAITLIST: WaitlistPatient[] = [
    {
        id: '1',
        name: 'Mariana Costa',
        procedure: 'Botox',
        constraints: 'Prefere Terça/Quinta à tarde',
        urgency: 'high',
        value: 1200,
        waitTime: '3 semanas',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana'
    },
    {
        id: '2',
        name: 'Roberto Almeida',
        procedure: 'Laser CO2',
        constraints: 'Qualquer horário',
        urgency: 'medium',
        value: 2500,
        waitTime: '5 dias',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto'
    },
    {
        id: '3',
        name: 'Fernanda Lima',
        procedure: 'Preenchimento',
        constraints: 'Apenas Manhã',
        urgency: 'low',
        value: 1800,
        waitTime: '2 dias',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda'
    }
];

interface WaitlistWidgetProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function WaitlistWidget({ isOpen }: WaitlistWidgetProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients] = useState(MOCK_WAITLIST);

    // Toggle handle just for linter rn
    // eslint-disable-next-line @typescript-eslint/no-unused-vars


    // Calc "Demand Radar" Metric
    const totalPotentialRevenue = patients.reduce((acc, curr) => acc + curr.value, 0);

    const handleQuickAdd = () => {
        toast.info("Funcionalidade de adição rápida em breve");
    };

    const handleNotify = (patientName: string) => {
        toast.success(`Mensagem enviada para ${patientName}`, {
            description: "Olá, surgiu uma vaga com a Dra. Ana amanhã às 14h. Quer agendar?",
            icon: <div className="p-1 bg-green-500 rounded-full"><div className="w-2 h-2 bg-white rounded-full animate-pulse" /></div>
        });
    };

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-shrink-0 h-full border-l border-[#27272a] bg-[#121214] flex flex-col overflow-hidden relative"
        >
            {/* 1. DEMAND RADAR (Header) */}
            <div className="p-6 border-b border-[#27272a] bg-[#121214]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        Lista de Espera
                    </h3>
                    <div className="text-xs font-mono text-[#a1a1aa] bg-[#27272a] px-2 py-0.5 rounded">
                        {patients.length} pax
                    </div>
                </div>

                <div className="bg-[#18181b] rounded-xl p-4 border border-[#27272a]">
                    <p className="text-[10px] uppercase font-bold text-[#52525b] mb-1">Demanda Reprimida</p>
                    <p className="text-2xl font-mono font-bold text-[#f4f4f5]">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalPotentialRevenue)}
                    </p>
                    <p className="text-xs text-[#a1a1aa] mt-1 flex items-center gap-1">
                        <TrendingUpIcon className="text-emerald-500 w-3 h-3" />
                        <span className="text-emerald-500">+12%</span> vs semana passada
                    </p>
                </div>
            </div>

            {/* 2. QUICK ADD & SEARCH */}
            <div className="p-4 border-b border-[#27272a] space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-[#52525b]" size={14} />
                    <input
                        type="text"
                        placeholder="Buscar ou Adicionar..."
                        className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#3b82f6] placeholder:text-[#52525b]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleQuickAdd} className="absolute right-2 top-1.5 text-[#a1a1aa] hover:text-white p-1 hover:bg-[#27272a] rounded">
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            {/* 3. THE SMART LIST */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {patients.map(patient => (
                    <motion.div
                        key={patient.id}
                        layoutId={patient.id}
                        draggable
                        onDragStart={(e) => {
                            // Cast to any to avoid Framer Motion type conflict
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const event = e as any as React.DragEvent;
                            event.dataTransfer.setData('text/plain', JSON.stringify(patient));
                            event.dataTransfer.effectAllowed = 'copy';
                        }}
                        className="group bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-[#3f3f46] rounded-xl p-3 transition-colors cursor-grab active:cursor-grabbing relative"
                    >
                        {/* Status Strip */}
                        <div className={cn(
                            "absolute left-0 top-3 bottom-3 w-1 rounded-r-full",
                            patient.urgency === 'high' ? "bg-red-500" :
                                patient.urgency === 'medium' ? "bg-amber-500" : "bg-blue-500"
                        )} />

                        <div className="ml-3">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <img src={patient.avatar} alt={patient.name} className="w-6 h-6 rounded-full bg-[#27272a]" />
                                    <div>
                                        <p className="text-sm font-medium text-[#f4f4f5] leading-tight">{patient.name}</p>
                                        <p className="text-[10px] text-[#a1a1aa]">{patient.procedure}</p>
                                    </div>
                                </div>
                                {patient.urgency === 'high' && (
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" title="Urgência Alta" />
                                )}
                            </div>

                            <div className="space-y-1.5 mb-3">
                                <div className="flex items-center gap-1.5 text-[10px] text-[#71717a]">
                                    <Calendar size={12} />
                                    <span>{patient.constraints}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-[#71717a]">
                                    <Clock size={12} />
                                    <span>Espera: {patient.waitTime}</span>
                                </div>
                            </div>

                            {/* Actions overlay on hover (Magic Match style) */}
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#27272a]/50">
                                <button
                                    onClick={() => handleNotify(patient.name)}
                                    className="flex-1 text-[10px] bg-[#27272a] hover:bg-[#3b82f6] hover:text-white text-[#a1a1aa] py-1.5 rounded transition-colors"
                                >
                                    Notificar
                                </button>
                                <button className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded">
                                    <MoreHorizontal size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Icon helper
function TrendingUpIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
    )
}
