import { motion } from 'framer-motion';
import { ShieldCheck, UserCog, Share2, BarChart3 } from 'lucide-react';

export function Ecosystem() {
    return (
        <section className="py-32 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">O Sistema Operacional da sua Clínica</h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Uma suíte completa de ferramentas financeiras que elimina o trabalho manual e blinda seu faturamento contra erros e glosas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {/* Card 1: Hemostasia Financeira (Large - 4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-4 md:row-span-2 relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-cadran-blue/50 transition-colors duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cadran-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-lg bg-cadran-blue/10 flex items-center justify-center mb-6 text-cadran-blue">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Hemostasia Financeira</h3>
                                <p className="text-gray-400 leading-relaxed max-w-md">
                                    IA que audita 100% das guias TISS contra depósitos bancários, detectando glosas invisíveis antes que se tornem prejuízo consolidado.
                                </p>
                            </div>

                            {/* Feature Image - Audit */}
                            <div className="mt-8 relative h-48 rounded-xl border border-white/5 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src="/images/feature-audit.png"
                                    alt="Interface de Auditoria"
                                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1530] via-transparent to-transparent" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Split de Pagamentos (Medium - 2 cols, 1 row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-cadran-purple/50 transition-colors duration-500"
                    >
                        <div className="w-10 h-10 rounded-lg bg-cadran-purple/10 flex items-center justify-center mb-4 text-cadran-purple">
                            <UserCog size={20} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Split Cirúrgico</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Automatize o repasse médico com precisão centesimal. Transparência total sem planilhas.
                        </p>
                        <div className="h-32 rounded-lg overflow-hidden relative border border-white/5">
                            <img
                                src="/images/feature-schedule.png"
                                alt="Gestão de Equipes"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Card 3: Interoperabilidade (Small - 1 col, 1 row... adjusting layout to fit 6 grid cols properly) */}
                    {/* Let's actually adjust positioning. 
              Row 1: Card 1 (4 cols), Card 2 (2 cols) -> Wait, Card 1 spans 2 rows. 
              Row 1: Card 1 (4 cols, 2 rows) -> Occupies left side.
              Row 1 (Right): Card 2 (2 cols).
              Row 2 (Right): Split into Card 3 and Card 4? 
              Let's do Card 3 and Card 4 side-by-side in the remaining space of row 2 (col 5 and 6).
          */}

                    {/* Card 3: Interoperabilidade */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1 relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-white/30 transition-colors duration-500"
                    >
                        <Share2 size={24} className="text-gray-300 mb-4" />
                        <h3 className="font-bold mb-1">Integração</h3>
                        <p className="text-gray-500 text-xs">
                            Middleware conectável ao Feegow/iClinic.
                        </p>
                    </motion.div>

                    {/* Card 4: Sinais Vitais */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-1 relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-green-500/30 transition-colors duration-500"
                    >
                        <BarChart3 size={24} className="text-green-400 mb-4" />
                        <h3 className="font-bold mb-1">Sinais Vitais</h3>
                        <p className="text-gray-500 text-xs mb-3">
                            Dashboard preditivo de caixa real.
                        </p>
                        <div className="h-24 rounded-lg overflow-hidden relative border border-white/5">
                            <img
                                src="/images/feature-analytics.png"
                                alt="Analytics"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
