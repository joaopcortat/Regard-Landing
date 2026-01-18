import { motion } from 'framer-motion';
import { ProfitChart } from './ProfitChart';
import { Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export function MedicalHero() {
    return (
        <section className="relative min-h-screen flex flex-col pt-32 pb-20 px-6 overflow-hidden bg-[#09090b]">

            {/* Ambient Background - Surgical Blue/Cyan Glows */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">

                {/* Text Content (Left) */}
                <div className="flex flex-col items-start">

                    {/* Badge: "New Clinical Standard" */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm mb-8"
                    >
                        <Activity size={14} className="text-blue-400" />
                        <span className="text-[11px] font-mono tracking-widest text-blue-300 uppercase">Novo Padrão Clínico</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
                    >
                        Gestão por <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-glow">
                            Instrumentos.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-lg mb-10 leading-relaxed"
                    >
                        A <span className="text-white font-medium">precisão cirúrgica</span> aplicada ao financeiro da sua clínica.
                        Diagnostique perdas, monitore sinais vitais de receita e opere com dados reais.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 group">
                            <span>Agendar Diagnóstico</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="h-12 px-8 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-2">
                            <ShieldCheck size={16} />
                            <span>Ver Procedimentos</span>
                        </button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-12 pt-8 border-t border-white/5 w-full flex items-center gap-8"
                    >
                        <div>
                            <p className="text-2xl font-bold text-white">R$ 45M+</p>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider">Auditados</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">120+</p>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider">Clínicas High-Ticket</p>
                        </div>
                    </motion.div>
                </div>

                {/* Monitor Visual (Right) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative group"
                >
                    {/* Monitor Frame */}
                    <div className="relative rounded-2xl bg-[#09090b] border border-zinc-800 p-2 shadow-2xl monitor-glow">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1/3 bg-zinc-800 rounded-b-full opacity-50" />

                        {/* Internal Bezel */}
                        <div className="rounded-xl overflow-hidden border border-white/5 bg-black relative h-[450px]">
                            <ProfitChart />

                            {/* Overlay Lines (Medical UI) */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-emerald-500 font-mono">SYSTEM NORMAL</span>
                                </div>
                                <div className="absolute bottom-4 left-4 text-[10px] text-zinc-600 font-mono">
                                    CADRAN.OS v2.4 // VITALS
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -z-10 -right-10 -top-10 text-[200px] leading-none font-bold text-white/[0.02] select-none">
                        +
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
