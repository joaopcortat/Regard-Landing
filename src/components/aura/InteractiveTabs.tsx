import { useState } from 'react';
import { MessageSquare, BarChart3, Users, Lock, Bot, Bell, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function InteractiveTabs() {
    const [activeTab, setActiveTab] = useState<'triagem' | 'financeiro' | 'retencao'>('triagem');

    return (
        <section id="features" className="py-32 bg-slate-950 border-y border-white/5 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">A Inteligência Cadran</h2>
                    <p className="text-slate-400 text-lg font-light">
                        Módulos integrados que conversam entre si para criar um ecossistema de alta performance.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    {/* Left: Enhanced Navigation */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        <TabButton
                            active={activeTab === 'triagem'}
                            onClick={() => setActiveTab('triagem')}
                            icon={<MessageSquare className="w-5 h-5" />}
                            title="Triagem Inteligente"
                            subtitle="Atendimento 24/7 com NLP avançado"
                            colorClass="indigo"
                        />
                        <TabButton
                            active={activeTab === 'financeiro'}
                            onClick={() => setActiveTab('financeiro')}
                            icon={<BarChart3 className="w-5 h-5" />}
                            title="Controle Financeiro"
                            subtitle="DRE automatizado e repasses"
                            colorClass="emerald"
                        />
                        <TabButton
                            active={activeTab === 'retencao'}
                            onClick={() => setActiveTab('retencao')}
                            icon={<Users className="w-5 h-5" />}
                            title="Fidelização Ativa"
                            subtitle="Reativação de base ociosa"
                            colorClass="amber"
                        />
                    </div>

                    {/* Right: Content Display Window */}
                    <div className="lg:col-span-8 h-[500px] relative">
                        <div className="absolute inset-0 bg-slate-900/40 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm overflow-hidden flex flex-col">
                            {/* Window Chrome */}
                            <div className="h-10 bg-[#0B1121] border-b border-slate-800 flex items-center px-4 gap-3 select-none">
                                <div className="flex gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                                </div>
                                <div className="ml-4 px-3 py-1 bg-slate-800/50 rounded-md text-[10px] text-slate-500 font-mono border border-slate-700/50 flex items-center gap-2">
                                    <Lock className="w-3 h-3" /> app.cadran.health/workspace
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 relative p-6 bg-[#020617]">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'triagem' && <TriagemContent key="triagem" />}
                                    {activeTab === 'financeiro' && <FinanceiroContent key="financeiro" />}
                                    {activeTab === 'retencao' && <RetencaoContent key="retencao" />}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TabButton({ active, onClick, icon, title, subtitle, colorClass }: any) {
    const activeBg = active ? 'bg-slate-900/60' : 'hover:bg-slate-900/60';
    const activeBorder = active ? 'border-l-indigo-500' : 'border-l-transparent';
    // Manual border implementation via style or class trick as per aura design? 
    // Aura design uses absolute pseudo element for border. Using inline logic here.

    let colorStyles = "";
    if (colorClass === 'indigo') colorStyles = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/20";
    if (colorClass === 'emerald') colorStyles = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/20";
    if (colorClass === 'amber') colorStyles = "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/20";

    return (
        <button onClick={onClick} className={`relative w-full text-left p-5 rounded-xl border border-transparent ${activeBg} flex items-center gap-4 group transition-all duration-300 overflow-hidden`}>
            {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-indigo-500 rounded-r-md transition-all"></div>}

            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_-3px_rgba(0,0,0,0)] ${colorStyles}`}>
                {icon}
            </div>
            <div>
                <div className="text-sm font-semibold text-slate-100 group-hover:text-white">{title}</div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">{subtitle}</div>
            </div>
        </button>
    )
}

function TriagemContent() {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
            <div className="max-w-md mx-auto w-full h-full flex flex-col justify-between">
                <div className="text-center mb-6">
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">Hoje</div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-full border border-indigo-500/20">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
                        Cadran AI Assistant
                    </div>
                </div>

                <div className="space-y-6 flex-1 overflow-hidden">
                    <ChatBubble align="right" delay={0}>
                        Preciso marcar um retorno com o Dr. Lucas. Minha enxaqueca voltou.
                    </ChatBubble>

                    <ChatBubble align="left" delay={0.2} isBot>
                        Sinto muito por isso, Ana. O Dr. Lucas tem um horário amanhã às <strong>14:30</strong> ou quinta às <strong>09:00</strong>. Qual prefere?
                        <div className="mt-2 flex gap-2">
                            <span className="text-[10px] py-1 px-2 bg-slate-700 rounded text-slate-300 cursor-pointer hover:bg-slate-600 border border-slate-600">Amanhã 14:30</span>
                            <span className="text-[10px] py-1 px-2 bg-slate-700 rounded text-slate-300 cursor-pointer hover:bg-slate-600 border border-slate-600">Quinta 09:00</span>
                        </div>
                    </ChatBubble>

                    <ChatBubble align="right" delay={0.8}>
                        Amanhã às 14:30 está ótimo.
                    </ChatBubble>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 ml-12">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    Agendado e sincronizado com ERP
                </div>
            </div>
        </motion.div>
    );
}

function ChatBubble({ children, align, delay, isBot }: any) {
    const isRight = align === 'right';
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className={`flex ${isRight ? 'justify-end' : 'justify-start'} gap-3`}
        >
            {!isRight && isBot && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
                    <Bot className="w-4 h-4 text-white" />
                </div>
            )}

            <div className={`
                ${isRight ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'} 
                text-sm py-2.5 px-4 rounded-2xl shadow-lg max-w-[85%] leading-relaxed
            `}>
                {children}
            </div>

            {isRight && <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex-shrink-0"></div>}
        </motion.div>
    )
}

function FinanceiroContent() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h4 className="text-slate-100 font-medium text-lg">Performance Financeira</h4>
                    <p className="text-xs text-slate-500">Comparativo Semestral</p>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">Receita</div>
                    <div className="px-3 py-1 rounded bg-slate-800/50 border border-slate-700/50 text-xs text-slate-500">Despesas</div>
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-4 px-2 relative">
                {/* Visual Bars Mock */}
                {[40, 55, 45, 70, 60].map((h, i) => (
                    <div key={i} className="w-full flex flex-col justify-end items-center gap-2 z-10 group h-full">
                        <div className="w-full bg-emerald-500/20 rounded-sm relative overflow-hidden group-hover:bg-emerald-500/30 transition-colors" style={{ height: `${h}%` }}>
                            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-emerald-600/50 to-transparent"></div>
                        </div>
                    </div>
                ))}
                <div className="w-full flex flex-col justify-end items-center gap-2 z-10 group h-full">
                    <div className="relative w-full h-[85%] rounded-sm bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-slate-700 shadow-xl whitespace-nowrap">
                            R$ 142k
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function RetencaoContent() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-[#0B1121] rounded-xl border border-slate-800 shadow-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <Bell className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <h4 className="text-slate-100 font-semibold text-sm">Oportunidade de Reativação</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            Identificamos <span className="text-amber-400 font-medium">45 pacientes</span> sem retorno há 6 meses. Potencial de receita: <span class="text-slate-200">R$ 18.500</span>.
                        </p>
                    </div>
                </div>

                <div className="mt-6 p-3 bg-slate-900/50 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                        Preview da Mensagem
                    </div>
                    <p className="text-xs text-slate-300 italic">
                        "Olá [Nome], notamos que faz tempo desde seu último check-up. O Dr. André tem horários especiais esta semana..."
                    </p>
                </div>

                <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-amber-900/20">
                        Enviar Campanha
                    </button>
                    <button className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-2.5 rounded-lg transition-colors border border-slate-700">
                        Editar
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
