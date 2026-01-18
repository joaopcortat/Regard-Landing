import { motion } from 'framer-motion';

import { ProfitChart } from './ProfitChart';

export function OutcomeSection() {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-2 md:order-1"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                        Impacto Clínico
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                        Sua clínica mais organizada, <br />
                        <span className="text-cadran-blue">seus pacientes mais saudáveis.</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                        Quando a gestão financeira opera em piloto automático, você recupera o ativo mais valioso da medicina: o tempo de dedicação ao paciente.
                    </p>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 md:order-2 relative"
                >
                    {/* Chart Container */}
                    <div className="relative rounded-xl shadow-2xl group h-[400px]">
                        <ProfitChart />

                        {/* Floating Badge - "Efficiency" */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2, duration: 0.6 }}
                            className="absolute -right-8 top-1/3 bg-[#18181b] p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-semibold uppercase">Eficiência</p>
                                <p className="text-white font-bold text-lg">+32%</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
