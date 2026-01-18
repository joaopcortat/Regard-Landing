import { Check, Sparkles, TrendingUp, Users, CreditCard, Activity, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroAura({ onStart, onWaitlist }: { onStart: () => void, onWaitlist: () => void }) {
    return (
        <section className="pt-32 pb-20 md:pt-48 md:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-medium mb-8 hover:bg-indigo-500/15 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                IA de Triagem 2.0 Disponível
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-50 max-w-4xl mb-6 leading-[1.1]">
                O sistema operacional do <br className="hidden md:block" />
                <span className="text-gradient">médico gestor</span>.
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mb-10 font-light leading-relaxed">
                Elimine planilhas e mensagens perdidas. Centralize agendamento, financeiro e IA preditiva em uma única interface inteligente.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-10">
                <button onClick={onStart} className="w-full sm:w-auto bg-slate-50 text-slate-950 px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group cursor-pointer">
                    Iniciar Diagnóstico Gratuito
                    <div className="w-4 h-4 group-hover:translate-x-1 transition-transform">→</div>
                </button>
                <button onClick={onWaitlist} className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-medium text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200 transition-colors bg-slate-900/30 backdrop-blur-sm cursor-pointer">
                    Entrar na Lista de Espera
                </button>
            </div>

            {/* Dashboard Visualization */}
            <div className="mt-20 w-full max-w-5xl relative animate-float">
                {/* Glow behind dashboard */}
                <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl rounded-xl opacity-50"></div>

                <div className="absolute -right-4 top-10 bg-slate-900/90 border border-slate-700/50 p-3 rounded-lg shadow-xl z-20 flex gap-3 items-center backdrop-blur-md animate-float-delayed hidden md:flex">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-medium text-slate-200">Agendamento Confirmado</div>
                        <div className="text-[10px] text-slate-400">Via WhatsApp AI • Agora mesmo</div>
                    </div>
                </div>

                <div className="absolute -left-6 bottom-20 bg-slate-900/90 border border-slate-700/50 p-3 rounded-lg shadow-xl z-20 flex gap-3 items-center backdrop-blur-md animate-float hidden md:flex" style={{ animationDelay: '2s' }}>
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-medium text-slate-200">Oportunidade Detectada</div>
                        <div className="text-[10px] text-slate-400">+R$ 4.5k em recuperações</div>
                    </div>
                </div>

                <div className="relative rounded-xl border border-slate-800 bg-[#0B1121] shadow-2xl overflow-hidden ring-1 ring-white/10">
                    {/* Header of Mockup */}
                    <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2 bg-slate-900/50 justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono">dashboard.cadran.app</div>
                    </div>

                    {/* Body of Mockup */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Column: Metrics */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="text-left">
                                    <h3 className="text-slate-100 font-medium text-sm">Receita Líquida</h3>
                                    <p className="text-xs text-slate-500">Tempo Real</p>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">
                                    <TrendingUp className="w-3 h-3" />
                                    +12.5%
                                </div>
                            </div>

                            <div className="h-48 flex items-end justify-between gap-2 px-2 pb-2 border-b border-slate-800/50">
                                <Bar height="45%" delay="0s" indigo />
                                <Bar height="65%" delay="0.1s" indigo />
                                <Bar height="55%" delay="0.2s" indigo />
                                <Bar height="85%" delay="0.3s" indigo />
                                <Bar height="70%" delay="0.4s" indigo />
                                <Bar height="92%" delay="0.5s" solid />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <MetricCard icon={<Users className="w-3 h-3" />} label="Ativos" value="1,248" />
                                <MetricCard icon={<CreditCard className="w-3 h-3" />} label="Ticket" value="R$ 450" />
                                <MetricCard icon={<Activity className="w-3 h-3" />} label="Ocupação" value="88%" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/20 to-slate-900/50 border border-indigo-500/20 relative overflow-hidden group hover:border-indigo-500/40 transition-colors text-left">
                                <div className="flex items-center gap-2 mb-3">
                                    <BrainCircuit className="w-4 h-4 text-indigo-400" />
                                    <span className="text-xs font-medium text-indigo-300">Sugestão da IA</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Detectamos 3 horários vagos amanhã. O paciente <span className="text-white font-medium">Carlos M.</span> está na lista de espera.
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <button className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors">Agendar</button>
                                    <button className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors">Ignorar</button>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/50 text-left">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-medium text-slate-400">Agenda Médica</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 border-b border-slate-800/50 pb-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">AS</div>
                                        <div className="text-xs text-slate-300">Dr. André Silva</div>
                                        <div className="ml-auto text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded">Em consulta</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">MP</div>
                                        <div className="text-xs text-slate-300">Dra. Maria P.</div>
                                        <div className="ml-auto text-[10px] text-slate-500">14:00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Bar({ height, delay, indigo, solid }: { height: string, delay: string, indigo?: boolean, solid?: boolean }) {
    const bgClass = solid ? "bg-indigo-500" : "bg-indigo-600";
    const shadowClass = solid ? "shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "shadow-[0_0_10px_rgba(79,70,229,0.3)]";

    return (
        <div className="w-full bg-indigo-500/5 rounded-t-sm relative group hover:bg-indigo-500/10 transition-colors h-full">
            <div
                className={`absolute bottom-0 w-full rounded-t-sm animate-bar ${bgClass} ${shadowClass}`}
                style={{ animationDelay: delay, '--target-height': height } as React.CSSProperties}
            ></div>
        </div>
    );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-colors text-left">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">{icon} {label}</div>
            <div className="text-xl text-slate-100 font-semibold tracking-tight">{value}</div>
        </div>
    );
}
