import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { TrendingUp, ArrowRight, User, CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { MotionCard, StaggerContainer, StaggerItem } from '../components/ui/MotionComponents';
import { PremiumChart } from '../components/dashboard/PremiumChart';
import { InsightsFeed } from '../components/dashboard/InsightsFeed';
import { Skeleton } from '../components/ui/Skeleton';
import { cn } from '@/lib/utils';

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Flow Counts State
    const [flowCounts, setFlowCounts] = useState({
        scheduled: 14,
        confirmed: 12,
        reception: 3,
        procedure: 2,
        finished: 7
    });

    // Waiting List State
    const [waitingList, setWaitingList] = useState([
        { id: '1', name: 'Fernanda V.', time: '18 min', status: 'delayed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda' },
        { id: '2', name: 'Carlos E.', time: '5 min', status: 'good', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
        { id: '3', name: 'Mariana C.', time: '2 min', status: 'good', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana' }
    ]);

    const handleCheckIn = (id: string, name: string) => {
        // Optimistic update
        setWaitingList(prev => prev.filter(p => p.id !== id));
        setFlowCounts(prev => ({
            ...prev,
            reception: prev.reception - 1,
            procedure: prev.procedure + 1
        }));

        toast.success(`Check-in realizado: ${name}`, {
            description: "Paciente encaminhado para sala.",
            icon: <CheckCircle2 className="text-emerald-500" />
        });
    };

    return (
        <Layout>
            <div className="space-y-8 relative">
                {/* Glow Effect Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-medium tracking-tight text-white">Bem-vindo, Dr. Silva</h2>
                        <p className="text-sm text-[#a1a1aa] mt-1">
                            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                    </div>
                </div>

                {/* 1. TOP: THE VITAL SIGNS (Minimalist Metrics) */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {isLoading ? (
                        Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
                    ) : (
                        <StaggerContainer className="contents">
                            <StaggerItem>
                                <MetricCard
                                    title="Faturamento Hoje"
                                    value="R$ 14.250"
                                    sub="Meta: R$ 20k"
                                />
                            </StaggerItem>
                            <StaggerItem>
                                <MetricCard
                                    title="Ocupação da Agenda"
                                    value="92%"
                                    sub="4 horários livres"
                                    visual={<div className="h-10 w-10 rounded-full border-2 border-[#3b82f6] border-t-transparent opacity-80" />}
                                />
                            </StaggerItem>
                            <StaggerItem>
                                <MetricCard
                                    title="Ticket Médio/Dia"
                                    value="R$ 1.250"
                                    icon={TrendingUp}
                                    sub="+15% vs. ontem"
                                />
                            </StaggerItem>
                            <StaggerItem>
                                <MetricCard
                                    title="Status da Espera"
                                    value={`${waitingList.length} Pacientes`}
                                    alert={waitingList.some(p => p.status === 'delayed') ? "1 em atraso (>15min)" : undefined}
                                />
                            </StaggerItem>
                        </StaggerContainer>
                    )}
                </div>

                {/* 2. DASHBOARD CHART (New Section) */}
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                    <MotionCard className="lg:col-span-2 rounded-xl border border-[#27272a] bg-[#121214] p-6 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-base font-medium text-white">Performance Financeira</h3>
                            <select className="bg-[#18181b] border border-[#27272a] text-xs text-[#a1a1aa] rounded-lg px-2 py-1">
                                <option>Últimos 7 dias</option>
                                <option>Este Mês</option>
                            </select>
                        </div>
                        {isLoading ? <Skeleton className="h-[300px] w-full" /> : <PremiumChart />}
                    </MotionCard>

                    {/* 2b. MIDDLE: THE CARE FLOW (Moved to side or keep full width? Let's keep full width below chart for now as implemented previously, or move it here. Let's keep the user's Flow component below for now, it was full width) */}
                    {/* Let's actually put the concierge here to balance the chart */}

                    {/* 4. SIDE GRID (Right 1/3): INTELLIGENCE FEED */}
                    <div className="space-y-6">
                        <InsightsFeed />

                        <MotionCard className="rounded-xl border border-[#27272a] bg-[#121214] p-6 h-full">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-base font-medium text-white">Concierge & Alertas</h3>
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                            </div>

                            <div className="space-y-4">
                                {waitingList.length === 0 ? (
                                    <div className="text-center py-8 text-[#52525b] text-sm">
                                        Recepção vazia.
                                    </div>
                                ) : (
                                    <StaggerContainer>
                                        {waitingList.map(patient => (
                                            <StaggerItem key={patient.id} className="mb-4 last:mb-0">
                                                <WaitingItem
                                                    {...patient}
                                                    onCheckIn={() => handleCheckIn(patient.id, patient.name)}
                                                />
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>
                                )}
                            </div>
                        </MotionCard>
                    </div>
                </div>

                {/* 3. MIDDLE: THE CARE FLOW */}
                <div className="relative rounded-xl border border-[#27272a] bg-[#121214] p-6 backdrop-blur-md">
                    <h3 className="mb-6 text-sm font-medium text-[#a1a1aa]">Fluxo do Dia</h3>
                    <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-[#27272a]" />

                        <FlowStep label="Agendados" count={flowCounts.scheduled} status="done" />
                        <FlowStep label="Confirmados" count={flowCounts.confirmed} status="done" />
                        <FlowStep label="Na Recepção" count={flowCounts.reception} status="current" />
                        <FlowStep label="Em Procedimento" count={flowCounts.procedure} status="active" />
                        <FlowStep label="Finalizados" count={flowCounts.finished} status="pending" />
                    </div>
                </div>

                {/* Main Content Grid - Last Section */}
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-4 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">Próximos Atendimentos</h3>
                        </div>

                        <MotionCard className="rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
                            <div className="divide-y divide-[#27272a]">
                                <AppointmentRow
                                    time="14:30"
                                    patient="Fernanda Vasconcelos"
                                    badges={[{ label: '⭐ VIP', type: 'vip' }]}
                                    procedure="Harmonização Facial"
                                    room="Sala 1 - Laser"
                                    status="Na Recepção"
                                />
                                <AppointmentRow
                                    time="15:15"
                                    patient="Ricardo Mendes"
                                    badges={[{ label: '⚠️ Risco', type: 'risk' }]}
                                    procedure="Bioestimulador"
                                    room="Sala 2 - Injetáveis"
                                    status="Confirmado"
                                />
                                <AppointmentRow
                                    time="16:00"
                                    patient="Mariana Costa"
                                    badges={[]}
                                    procedure="Botox Full Face"
                                    room="Sala 1 - Laser"
                                    status="Confirmado"
                                />
                                <AppointmentRow
                                    time="16:45"
                                    patient="Dr. Thiago Silva"
                                    badges={[{ label: '⭐ VIP', type: 'vip' }]}
                                    procedure="Protocolo Capilar"
                                    room="Sala 3 - Terapia"
                                    status="Agendado"
                                />
                            </div>
                            <button className="w-full py-3 text-sm text-[#a1a1aa] hover:bg-[#18181b] transition-colors border-t border-[#27272a]">
                                Ver agenda completa
                            </button>
                        </MotionCard>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

// --- Subcomponents ---

function MetricCard({ title, value, sub, icon: Icon, visual, alert }: any) {
    return (
        <MotionCard className="relative overflow-hidden rounded-xl border border-[#27272a] bg-[#121214] p-5 shadow-sm transition-all hover:border-[#3f3f46]">
            {/* Subtle Top Highlight for 3D feel */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/5" />

            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-[#a1a1aa]">{title}</p>
                    <p className="text-2xl font-medium tracking-tight text-[#f4f4f5] tabular-nums">{value}</p>
                </div>
                {Icon && <div className="p-2 rounded-lg bg-[#27272a]/50"><Icon className="text-[#3b82f6]" size={20} strokeWidth={1.5} /></div>}
                {visual}
            </div>
            {(sub || alert) && (
                <div className="mt-4 flex items-center gap-2 text-xs">
                    {alert ? (
                        <span className="text-rose-500 font-medium bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">{alert}</span>
                    ) : (
                        <span className="text-[#52525b]">{sub}</span>
                    )}
                </div>
            )}
        </MotionCard>
    );
}

function FlowStep({ label, count, status }: any) {
    const isDone = status === 'done'; // Past
    const isCurrent = status === 'current'; // Active focus
    const isActive = status === 'active'; // Present but not detailed focus here? Or just styled differently
    // Actually, let's map: done -> filled, current/active -> highlighted, pending -> dim

    // Custom styling logic
    let dotClass = "bg-[#27272a] border-[#27272a] text-[#71717a]";
    let textClass = "text-[#71717a]";

    if (isDone || isCurrent || isActive) {
        dotClass = "bg-[#18181b] border-[#3b82f6] text-[#f4f4f5] shadow-[0_0_10px_rgba(59,130,246,0.3)]";
        textClass = "text-[#f4f4f5]";
    }

    if (status === 'active') { // Specifically "Em Procedimento"
        dotClass = "bg-[#3b82f6] border-[#3b82f6] text-white";
    }

    return (
        <div className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer">
            <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                dotClass
            )}>
                <span className="text-sm font-medium">{count}</span>
            </div>
            <span className={cn("text-xs font-medium transition-colors", textClass)}>{label}</span>
        </div>
    );
}

function AppointmentRow({ time, patient, badges, procedure, room, status }: any) {
    return (
        <div className="flex items-center justify-between p-4 transition-colors hover:bg-[#18181b] group">
            <div className="flex items-center gap-6">
                <span className="w-12 text-sm font-medium text-[#f4f4f5] tabular-nums">{time}</span>

                <div className="w-10 h-10 rounded-full bg-[#27272a] flex items-center justify-center text-[#a1a1aa]">
                    <User size={18} />
                </div>

                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#f4f4f5]">{patient}</span>
                        {badges.map((badge: any) => (
                            <span key={badge.label} className={cn(
                                "rounded px-1.5 py-0.5 text-[10px] font-medium border",
                                badge.type === 'vip'
                                    ? "border-blue-900/50 bg-blue-500/10 text-blue-500"
                                    : "border-amber-900/50 bg-amber-500/10 text-amber-500"
                            )}>
                                {badge.label}
                            </span>
                        ))}
                    </div>
                    <p className="text-xs text-[#a1a1aa]">{procedure}</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="text-right">
                    <p className="text-xs font-medium text-[#f4f4f5]">{room}</p>
                    <p className="text-xs text-[#a1a1aa]">Dr. Silva</p>
                </div>

                <button className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#121214] px-3 py-1.5 text-xs text-[#f4f4f5] hover:bg-[#27272a] transition-colors">
                    <span>{status}</span>
                    <ArrowRight size={12} className="text-[#a1a1aa]" />
                </button>
            </div>
        </div>
    );
}

function WaitingItem({ name, time, status, avatar, onCheckIn }: any) {
    const isDelayed = status === 'delayed';
    return (
        <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-[#18181b]">
            <div className="flex items-center gap-3">
                <img src={avatar} alt={name} className="h-8 w-8 rounded-full bg-[#27272a]" />
                <div>
                    <p className="text-sm font-medium text-[#f4f4f5]">{name}</p>
                    <p className={cn(
                        "text-xs font-medium",
                        isDelayed ? "text-amber-500 animate-pulse" : "text-green-500"
                    )}>
                        Espera: {time}
                    </p>
                </div>
            </div>
            <button
                onClick={onCheckIn}
                className="rounded-lg p-1.5 text-[#3b82f6] hover:bg-blue-500/10 transition-colors"
                title="Realizar Check-in"
            >
                <CheckCircle2 size={16} />
            </button>
        </div>
    );
}
