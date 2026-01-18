import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Gradients - Adjusted position for split layout */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-cadran-blue/10 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                {/* Text Content (Left) */}
                <div className="text-left flex flex-col items-start px-4 md:px-0">
                    {/* Knob Bar / Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cadran-blue/20 bg-cadran-blue/5 backdrop-blur-md mb-8 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-cadran-blue animate-pulse" />
                        <span className="text-[10px] font-semibold text-cadran-blue tracking-widest uppercase">Financeiro Sem Erro</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
                    >
                        Gestão por <br />
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">Instrumentos.</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed font-light"
                    >
                        A diligência técnica da medicina aplicada à saúde financeira.
                        Estanque a perda de receita com auditoria automatizada.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        {/* Primary CTA */}
                        <button className="h-12 px-8 rounded-full bg-cadran-blue text-white font-medium shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.7)] hover:-translate-y-1 transition-all duration-300">
                            Entrar na Lista
                        </button>

                        {/* Secondary CTA */}
                        <button className="h-12 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 group">
                            <Play size={14} className="fill-current" />
                            <span>Ver Demo</span>
                        </button>
                    </motion.div>
                </div>

                {/* Visual Content (Right) - Tilted Dashboard */}
                {/* Visual Content (Right) - Image Dashboard */}
                <motion.div
                    initial={{ opacity: 0, rotateX: 20, rotateY: -20, x: 100 }}
                    animate={{ opacity: 1, rotateX: 10, rotateY: -15, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    className="relative perspective-1000 origin-left hidden lg:block group"
                    style={{ perspective: '2000px' }}
                >
                    <div className="relative rounded-xl border border-white/10 bg-[#0a1530] shadow-2xl overflow-hidden aspect-[16/10] transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-y-[-10deg] group-hover:rotate-x-[5deg]">
                        {/* Dashboard Image */}
                        <img
                            src="/images/dashboard-main.png"
                            alt="Dashboard Médico Cadran"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Animated Overlay for "Live Charts" effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />

                        {/* Scanning Line Effect on Hover */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-cadran-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                            initial={{ y: -10, opacity: 0 }}
                            whileHover={{ y: 600, opacity: 1, transition: { duration: 2, repeat: Infinity, ease: "linear" } }}
                        />

                        {/* Pulse Hotspots - simulating interactive/live data */}
                        <div className="absolute top-[30%] left-[25%] w-3 h-3 bg-red-500 rounded-full animate-ping opacity-0 group-hover:opacity-50" />
                        <div className="absolute top-[30%] left-[25%] w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-80" />

                        <div className="absolute top-[50%] right-[20%] w-2 h-2 bg-green-500 rounded-full animate-ping opacity-0 group-hover:opacity-50 delay-700" />
                        <div className="absolute top-[50%] right-[20%] w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-80 delay-700" />

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
