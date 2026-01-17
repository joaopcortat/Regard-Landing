import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    Heart, Clock, CheckCircle2, MoreHorizontal,
    Zap, MessageCircle, ChevronRight,
    Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CarePage() {
    const [activeTemplate, setActiveTemplate] = useState("botox");

    return (
        <Layout>
            <div className="flex flex-col h-[calc(100vh-6rem)] gap-6">

                {/* SECTION 1: ACTIVE JOURNEYS DASHBOARD */}
                <ActiveJourneysFeed />

                {/* SECTION 2: JOURNEY BUILDER */}
                <div className="flex-1 flex gap-6 min-h-0">

                    {/* LEFT: Templates & Triggers */}
                    <div className="w-80 flex flex-col gap-6">
                        <div className="p-6 bg-[#121214] border border-[#27272a] rounded-xl flex-1 flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-white mb-1">Templates Inteligentes</h3>
                                <p className="text-xs text-[#a1a1aa]">Protocolos "Gold Standard" prontos para usar.</p>
                            </div>

                            <div className="space-y-3">
                                <TemplateCard
                                    label="Pós-Botox"
                                    steps="3 etapas"
                                    active={activeTemplate === 'botox'}
                                    onClick={() => setActiveTemplate('botox')}
                                />
                                <TemplateCard
                                    label="Pós-Preenchimento Labial"
                                    steps="2 etapas"
                                    active={activeTemplate === 'lips'}
                                    onClick={() => setActiveTemplate('lips')}
                                />
                                <TemplateCard
                                    label="Bioestimulador"
                                    steps="1 etapa"
                                    active={activeTemplate === 'bio'}
                                    onClick={() => setActiveTemplate('bio')}
                                />
                            </div>

                            <div className="mt-auto pt-6 border-t border-[#27272a]">
                                <button className="w-full py-2 bg-[#27272a] text-sm font-medium text-white rounded-lg hover:bg-[#3f3f46] transition-colors border border-[#3f3f46]">
                                    + Criar Nova Jornada
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Visual Journey Flow */}
                    <div className="flex-1 bg-[#121214] border border-[#27272a] rounded-xl relative overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-[#27272a] bg-[#121214]/95 backdrop-blur z-10 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                                    {activeTemplate === 'botox' && 'Jornada Pós-Botox'}
                                    {activeTemplate === 'lips' && 'Jornada Labial'}
                                    {activeTemplate === 'bio' && 'Jornada Bioestimulador'}
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">Ativo</span>
                                </h3>
                                <p className="text-xs text-[#a1a1aa]">Edite as mensagens e tempos de envio.</p>
                            </div>
                            <button
                                onClick={() => toast.success("Simulando envio da primeira etapa...", {
                                    description: "📱 WhatsApp enviado para Fernanda: 'Oi, tudo bem? Lembre-se de não deitar...'"
                                })}
                                className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <Play size={14} fill="currentColor" /> Simular Jornada
                            </button>
                        </div>

                        {/* FLOW CANVAS */}
                        <div className="flex-1 overflow-y-auto p-12 relative">
                            {/* Background Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

                            <div className="max-w-xl mx-auto flex flex-col items-center pb-20">
                                {/* START NODE */}
                                <TriggerNode label="Procedimento Finalizado: Toxina Botulínica" icon={Zap} />

                                <ConnectorLine />

                                {/* STEP 1 */}
                                <DelayNode label="Aguardar 4 horas" />
                                <ConnectorLine short />
                                <ActionNode
                                    title="Alerta de Cuidados Imediatos"
                                    preview="Oi {Paciente}, tudo bem? Lembre-se de não deitar nas próximas 4h e evitar exercícios físicos hoje para garantir..."
                                />

                                <ConnectorLine />

                                {/* STEP 2 */}
                                <DelayNode label="Aguardar 3 dias" />
                                <ConnectorLine short />
                                <ActionNode
                                    title="Check-in de Bem-estar"
                                    preview="Olá! Como está se sentindo? Algum desconforto ou dúvida sobre o pós-procedimento? Estamos aqui..."
                                />

                                {activeTemplate === 'botox' && (
                                    <>
                                        <ConnectorLine />
                                        {/* STEP 3 */}
                                        <DelayNode label="Aguardar 15 dias" />
                                        <ConnectorLine short />
                                        <ActionNode
                                            title="Agendamento de Retorno"
                                            preview="Oi {Paciente}, já se passaram 15 dias! Vamos agendar seu retorno para avaliarmos os resultados finais?"
                                            isLast
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

// --- ACTIVE JOURNEYS COMPONENTS ---

// Mock Data for Active Journeys
const activeJourneys = [
    { id: 1, name: "Mariana Costa", day: 2, stage: "Alerta de Inchaço", status: "pending", avatar: "MC" },
    { id: 2, name: "Carlos Eduardo", day: 0, stage: "Cuidados Pós-Imediatos", status: "sent", avatar: "CE" },
    { id: 3, name: "Ana Paula", day: 14, stage: "Agendar Retorno", status: "pending", avatar: "AP" },
    { id: 4, name: "Roberto Silva", day: 5, stage: "Massagem (5/5)", status: "sent", avatar: "RS" },
];

function ActiveJourneysFeed() {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-sm font-semibold text-[#e4e4e7] uppercase tracking-wider flex items-center gap-2">
                    <Heart size={14} className="text-rose-500 fill-rose-500" /> Pacientes em Jornada
                </h2>
                <button className="text-xs text-[#3b82f6] hover:text-[#60a5fa] hover:underline">Ver todos (12)</button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#27272a] scrollbar-track-transparent snap-x">
                {activeJourneys.map((patient) => (
                    <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0 w-72 bg-[#121214] border border-[#27272a] rounded-lg p-3 hover:border-[#3f3f46] transition-colors relative group snap-start"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#27272a] text-xs font-bold text-[#e4e4e7] flex items-center justify-center border border-[#3f3f46]">
                                {patient.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{patient.name}</p>
                                <p className="text-[10px] text-[#a1a1aa] flex items-center gap-1">
                                    <Clock size={10} /> Dia {patient.day}
                                </p>
                            </div>
                            {patient.status === 'sent' ? (
                                <div className="text-emerald-500" title="Entregue">
                                    <CheckCircle2 size={14} />
                                </div>
                            ) : (
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" title="Pendente" />
                            )}
                        </div>

                        <div className="bg-[#18181b] rounded border border-[#27272a] p-2">
                            <p className="text-[10px] text-[#71717a] uppercase font-bold mb-0.5">Próximo passo</p>
                            <p className="text-xs text-[#d4d4d8] font-medium truncate">{patient.stage}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}


// --- BUILDER NODE COMPONENTS ---

function TriggerNode({ label, icon: Icon }: any) {
    return (
        <div className="flex flex-col items-center z-10">
            <div className="w-16 h-16 rounded-full bg-[#18181b] border-2 border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center justify-center text-white relative z-10 mb-2">
                <Icon size={24} className="text-[#3b82f6]" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-[#3b82f6] uppercase tracking-wide bg-[#121214] px-2 py-0.5 rounded border border-[#3b82f6]/20">Gatilho</span>
            <p className="text-sm font-medium text-white mt-1">{label}</p>
        </div>
    );
}

function DelayNode({ label }: any) {
    return (
        <div className="flex items-center gap-2 bg-[#18181b] border border-[#27272a] px-3 py-1.5 rounded-full z-10 shadow-lg">
            <Clock size={14} className="text-[#a1a1aa]" />
            <span className="text-xs font-mono text-[#e4e4e7]">{label}</span>
        </div>
    );
}

function ActionNode({ title, preview, isLast }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full bg-[#18181b] border border-[#27272a] rounded-xl p-4 shadow-lg hover:border-[#3b82f6]/50 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all cursor-pointer group z-10 relative"
        >
            {/* Type Badge */}
            <div className="absolute -top-3 left-4 bg-[#27272a] text-[#a1a1aa] text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-[#3f3f46] flex items-center gap-1">
                <MessageCircle size={10} /> WhatsApp
            </div>

            <div className="flex justify-between items-start mb-2 mt-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-[#3b82f6] transition-colors">{title}</h4>
                <MoreHorizontal size={14} className="text-[#52525b] hover:text-white" />
            </div>

            <div className="bg-[#121214] rounded p-2 border border-[#27272a] group-hover:border-[#3f3f46]">
                <p className="text-xs text-[#a1a1aa] font-mono leading-relaxed line-clamp-2">"{preview}"</p>
            </div>

            {isLast && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#27272a] to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-[#27272a]" />
                </div>
            )}
        </motion.div>
    );
}

function ConnectorLine({ short = false }: { short?: boolean }) {
    return (
        <div className={cn("w-0.5 bg-[#27272a]", short ? "h-8" : "h-12")} />
    );
}

function TemplateCard({ label, steps, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full text-left p-4 rounded-lg border transition-all duration-200 group relative overflow-hidden",
                active
                    ? "bg-[#3b82f6]/10 border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                    : "bg-[#18181b] border-[#27272a] hover:bg-[#202024]"
            )}
        >
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h4 className={cn("text-sm font-medium mb-1", active ? "text-[#93c5fd]" : "text-[#e4e4e7]")}>{label}</h4>
                    <p className={cn("text-xs flex items-center gap-1.5", active ? "text-[#60a5fa]" : "text-[#71717a]")}>
                        <Zap size={12} /> {steps}
                    </p>
                </div>
                {active && <ChevronRight size={16} className="text-[#3b82f6]" />}
            </div>
            {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3b82f6]" />}
        </button>
    );
}
