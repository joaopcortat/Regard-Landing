import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { ProfitChart } from './ProfitChart';

export function HeroReplica() {
    return (
        <section className="relative min-h-[110vh] flex flex-col items-center pt-32 px-4 overflow-hidden bg-[#050505]">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-cadran-blue/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">



                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
                >
                    Gestão por <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Instrumentos</span>, <br />
                    não por intuição.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg text-gray-400 max-w-2xl mb-12 leading-relaxed"
                >
                    A diligência técnica da medicina aplicada à saúde da sua empresa clínica.
                    Estanque perdas de receita com inteligência automatizada do seu fluxo.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-center gap-6 mb-20"
                >
                    <button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-[0_0_40px_-5px_rgba(37,99,235,0.5)] transition-all hover:scale-105">
                        Entrar na Lista de Espera
                    </button>
                    <button className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                            <Play size={14} className="fill-current ml-0.5" />
                        </div>
                        <span className="text-sm font-medium">Ver Demo Explicativo</span>
                    </button>
                </motion.div>

                {/* Dashboard Visual - The "Instrument" */}
                <motion.div
                    initial={{ opacity: 0, rotateX: 20, y: 100 }}
                    animate={{ opacity: 1, rotateX: 10, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-4xl perspective-[2000px] group"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* The Dashboard Card */}
                    <div className="relative aspect-[16/10] bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 transform transition-transform duration-700 hover:rotate-x-0 hover:scale-[1.02]">

                        {/* Top Bar */}
                        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-4 bg-[#0F0F0F]">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                            </div>
                            <div className="h-2 w-32 bg-zinc-800 rounded-full" />
                        </div>

                        {/* Content Area - Using PofitChart as the main visual */}
                        <div className="p-6 h-[calc(100%-2.5rem)] bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
                            <ProfitChart />
                        </div>

                        {/* Floating Cards (Overlay) */}
                        <motion.div
                            className="absolute bottom-8 right-8 w-64 p-4 rounded-xl bg-[#0F0F0F]/90 backdrop-blur-xl border border-blue-500/20 shadow-2xl z-20"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-1.5 rounded-lg bg-blue-500/20">
                                    <ArrowRight size={14} className="text-blue-400" />
                                </div>
                                <span className="text-xs font-semibold text-white">Insights AI</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed">
                                Detectamos uma variação de +15% no faturamento projetado para o próximo trimestre.
                            </p>
                        </motion.div>

                        {/* Glow Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-500/5 pointer-events-none mix-blend-screen" />
                    </div>

                    {/* Reflection/Glow under the dashboard */}
                    <div className="absolute -inset-4 bg-blue-600/20 blur-[100px] -z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                </motion.div>

            </div>
        </section>
    );
}
