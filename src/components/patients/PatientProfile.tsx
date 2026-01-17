import { useState } from 'react';
import {
    MessageCircle, Image as ImageIcon, Star, Banknote, Clock, Paperclip, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function PatientProfile({ patientId }: { patientId?: string | null }) {
    console.log(patientId);
    // Mock Data Fetching based on ID
    // In real app, useQuery hook
    const patient = {
        name: 'Fernanda Vasconcellos',
        age: 34,
        occupation: 'Advogada',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda',
        since: '2023',
        ltv: 'R$ 45.200',
        score: {
            label: 'VIP',
            type: 'vip', // vip, risk, neutral
            icon: Star
        },
        financial: {
            open: 0,
            total: 45200,
            status: 'good'
        },
        tags: ['Botox', 'Bioestimulador', 'Ultraformer']
    };

    const [activeTab, setActiveTab] = useState<'timeline' | 'financial' | 'media'>('timeline');

    return (
        <div className="flex-1 flex flex-col bg-[#09090b] min-w-0">
            {/* 1. Header (Identity & Value) */}
            <div className="border-b border-[#27272a] bg-[#09090b] p-8">
                <div className="flex items-start justify-between">
                    <div className="flex gap-6">
                        <div className="relative">
                            <img src={patient.avatar} alt={patient.name} className="h-24 w-24 rounded-full bg-[#18181b] border-2 border-[#27272a]" />
                            <div className="absolute -bottom-2 -right-2 rounded-lg border border-[#27272a] bg-[#121214] p-1.5 shadow-lg">
                                <patient.score.icon size={16} className="text-amber-400 fill-amber-400/20" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{patient.name}</h1>
                                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-500">
                                    {patient.score.label}
                                </span>
                            </div>
                            <p className="text-sm text-[#a1a1aa]">{patient.age} anos • {patient.occupation} • Desde {patient.since}</p>

                            <div className="flex items-center gap-2 pt-2">
                                {patient.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-[#18181b] px-2 py-1 text-xs font-medium text-[#add5d5] ring-1 ring-inset ring-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                            <p className="text-xs font-medium uppercase tracking-wider text-[#71717a]">LTV (Investimento)</p>
                            <p className="text-xl font-bold text-emerald-500">{patient.ltv}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="rounded-lg border border-[#27272a] bg-[#18181b] p-2 text-[#a1a1aa] hover:border-emerald-500/50 hover:text-emerald-500 transition-all">
                                <MessageCircle size={18} />
                            </button>
                            <button className="rounded-lg border border-[#27272a] bg-[#18181b] p-2 text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white transition-all">
                                <ImageIcon size={18} />
                            </button>
                            <button className="rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 hover:bg-[#2563eb] transition-all">
                                Nova Consulta
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Navigation Tabs */}
            <div className="flex border-b border-[#27272a] px-8">
                <TabButton
                    active={activeTab === 'timeline'}
                    onClick={() => setActiveTab('timeline')}
                    label="Linha do Tempo"
                    icon={Clock}
                />
                <TabButton
                    active={activeTab === 'financial'}
                    onClick={() => setActiveTab('financial')}
                    label="Financeiro"
                    icon={Banknote}
                />
                <TabButton
                    active={activeTab === 'media'}
                    onClick={() => setActiveTab('media')}
                    label="Arquivos & Fotos"
                    icon={Paperclip}
                />
            </div>

            {/* 3. Content Area */}
            <div className="flex-1 overflow-y-auto bg-[#09090b] p-8">
                {activeTab === 'timeline' && <TimelineTab />}
                {activeTab === 'financial' && <FinancialTab />}
                {activeTab === 'media' && <div className="text-[#71717a] text-sm text-center py-20">Nenhum arquivo anexado recente.</div>}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, label, icon: Icon }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors",
                active
                    ? "border-[#3b82f6] text-white"
                    : "border-transparent text-[#71717a] hover:border-[#27272a] hover:text-[#a1a1aa]"
            )}
        >
            <Icon size={16} className={cn("transition-colors", active ? "text-[#3b82f6]" : "text-[#52525b] group-hover:text-[#a1a1aa]")} />
            {label}
        </button>
    );
}

function TimelineTab() {
    const events = [
        { date: '12 Jan, 2026', title: 'Botox Full Face', type: 'procedure', desc: 'Aplicação Dysport 50U. Retorno em 15 dias.', doctor: 'Dr. Ana Silva' },
        { date: '10 Nov, 2025', title: 'Consulta de Avaliação', type: 'consultation', desc: 'Queixa de linhas finas na glabela. Plano de tratamento montado.', doctor: 'Dr. Ana Silva' },
        { date: '05 Out, 2025', title: 'Foto Anexada', type: 'media', desc: 'Antes e Depois - Protocolo 1', doctor: 'Sistema' },
        { date: '20 Set, 2025', title: 'Peeling Químico', type: 'procedure', desc: 'Sessão 3/3 realizada.', doctor: 'Dr. Pedro Santos' },
    ];

    return (
        <div className="max-w-3xl space-y-8">
            {events.map((event, idx) => (
                <div key={idx} className="relative pl-8 group">
                    {/* Vertical Line */}
                    {idx !== events.length - 1 && (
                        <div className="absolute left-[11px] top-8 h-full w-[2px] bg-[#27272a] group-hover:bg-[#3f3f46] transition-colors" />
                    )}

                    {/* Node */}
                    <div className={cn(
                        "absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-[#09090b] flex items-center justify-center bg-[#27272a]",
                        event.type === 'procedure' ? "bg-purple-500/20 text-purple-500 ring-1 ring-purple-500/50" :
                            event.type === 'consultation' ? "bg-blue-500/20 text-blue-500 ring-1 ring-blue-500/50" :
                                "bg-zinc-800 text-zinc-400"
                    )}>
                        <div className={cn("h-1.5 w-1.5 rounded-full", event.type === 'procedure' ? "bg-purple-500" : event.type === 'consultation' ? "bg-blue-500" : "bg-zinc-500")} />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-white">{event.title}</h3>
                            <span className="text-xs text-[#71717a]">{event.date}</span>
                        </div>
                        <p className="text-sm text-[#a1a1aa] leading-relaxed">{event.desc}</p>
                        <div className="flex items-center gap-2 pt-1">
                            <div className="h-5 w-5 rounded-full bg-[#27272a] flex items-center justify-center text-[10px] text-[#a1a1aa] border border-[#3f3f46]">
                                {event.doctor === 'Sistema' ? 'S' : event.doctor.charAt(4)}
                            </div>
                            <span className="text-xs text-[#52525b]">{event.doctor}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function FinancialTab() {
    return (
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
            <div className="rounded-xl border border-[#27272a] bg-[#121214] p-6">
                <h3 className="text-sm font-medium text-[#a1a1aa] mb-4">Em Aberto</h3>
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-500">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">R$ 0,00</p>
                        <p className="text-xs text-emerald-500">Nada pendente</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border-[#27272a] border bg-[#121214] p-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y-[-8px] rounded-full bg-emerald-500/5 blur-3xl"></div>
                <h3 className="text-sm font-medium text-[#a1a1aa] mb-4">Histórico (LTV)</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-[#27272a] pb-2">
                        <span className="text-[#f4f4f5]">2025</span>
                        <span className="font-medium text-emerald-500">R$ 22.400</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-[#27272a] pb-2">
                        <span className="text-[#f4f4f5]">2024</span>
                        <span className="font-medium text-emerald-500">R$ 15.100</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[#f4f4f5]">2023</span>
                        <span className="font-medium text-emerald-500">R$ 7.700</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


