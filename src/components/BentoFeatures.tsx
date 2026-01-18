import { motion } from 'framer-motion';
import { Bot, LineChart, Users, Zap, MessageCircle } from 'lucide-react';


export function BentoFeatures() {
    return (
        <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Tudo o que sua clínica precisa. <br />
                        <span className="text-gray-500">Em um único lugar.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">

                    {/* Feature 1: AI Insights (Large) */}
                    <div className="md:col-span-4 md:row-span-1 bg-[#0A0A0A] rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Zap size={120} className="text-blue-500" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                                    <Bot className="text-blue-400" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Insights de I.A.</h3>
                                <p className="text-gray-400 max-w-sm">
                                    Nossa inteligência artificial analisa seus dados 24/7 e sugere ações para aumentar sua margem de lucro.
                                </p>
                            </div>

                            {/* Visual: Simulated Chat/Insight */}
                            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm transform group-hover:translate-x-2 transition-transform">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-mono text-blue-300">OPORTUNIDADE DETECTADA</span>
                                </div>
                                <p className="text-sm text-gray-300">
                                    "Reduza o tempo ocioso da Sala 2 nas terças-feiras para aumentar o faturamento em ~12%."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: WhatsApp Agent (Tall) */}
                    <div className="md:col-span-2 md:row-span-2 bg-[#0A0A0A] rounded-3xl border border-white/5 p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors flex flex-col">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                            <MessageCircle className="text-green-400" size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Agente 24/7</h3>
                        <p className="text-sm text-gray-400 mb-8">
                            Atendimento automatizado via WhatsApp. Agende, confirme e tire dúvidas dos pacientes automaticamente.
                        </p>

                        {/* Visual: Chat Interface */}
                        <div className="flex-1 bg-[#050505] rounded-xl border border-white/5 p-4 flex flex-col gap-3 relative overflow-hidden">
                            <div className="absolute inset-0 bg-green-500/5 blur-xl" />
                            <ChatMessage text="Olá! Gostaria de agendar uma consulta." align="right" />
                            <ChatMessage text="Claro! Tenho horários disponíveis para amanhã às 14h e 16h." align="left" />
                            <ChatMessage text="14h está ótimo." align="right" />
                            <ChatMessage text="Confirmado! Dra. Ana aguarda você." align="left" />
                        </div>
                    </div>

                    {/* Feature 3: Metrics (Medium) */}
                    <div className="md:col-span-2 md:row-span-1 bg-[#0A0A0A] rounded-3xl border border-white/5 p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                            <LineChart className="text-purple-400" size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Métricas Totais</h3>
                        <p className="text-sm text-gray-400">
                            LTV, CAC, NPS, Taxa de Ocupação e mais, calculados em tempo real.
                        </p>
                    </div>

                    {/* Feature 4: Profit Simulator (Medium) */}
                    <div className="md:col-span-2 md:row-span-1 bg-[#0A0A0A] rounded-3xl border border-white/5 p-6 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <Zap className="text-orange-400" size={20} /> {/* Reusing Zap icon meant for simulator/decision */}
                            </div>
                            <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-500/20">NOVO</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Simulador de Lucro</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Projete cenários e tome decisões baseadas em dados financeiros.
                        </p>
                        {/* Visual Slider Mock */}
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-orange-500"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "70%" }}
                                transition={{ duration: 1.5 }}
                            />
                        </div>
                    </div>

                    {/* Feature 5: Team Management (Stacked with Simulator in layout logic if needed, but here simple grid) */}
                    {/* Wait, the grid math: 
                        Row 1: 4 (AI) + 2 (WhatsApp top half) = 6 cols
                        Row 2: 2 (Metrics) + 2 (Simulator) + 2 (WhatsApp bottom half ... wait, WhatsApp is row-span-2, col-span-2. 
                        So Row 1 takes 4 cols then WhatsApp takes 2 cols and spans down.
                        Row 2 needs to fill 4 cols.
                        Metrics (2) + Simulator (2) = 4 cols.
                        Total 6 cols. 
                        Wait, where's Team Management?
                        Ah, I need to fit 5 items.
                        Let's adjust layout:
                        Row 1: AI (3), WhatsApp (3 row span 2)
                        Row 2: Metrics (3)... no
                        Let's do:
                        Row 1: AI (4), WhatsApp (2 row span 2)
                        Row 2: Metrics (2), Simulator (2) ... wait, missing items.
                        Let's add a third row or adjust spans.
                        Let's try:
                        Row 1: AI (3), Team (3)
                        Row 2: WhatsApp (2), Metrics (2), Simulator (2)
                        Total 6 cols wide.
                    */}

                </div>

                {/* Visual Fix: Adding the missing 5th card as a separate flex container below or redesign grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Feature 5: Team Management */}
                    <div className="md:col-start-2 bg-[#0A0A0A] rounded-3xl border border-white/5 p-6 relative overflow-hidden group hover:border-pink-500/30 transition-colors text-center">
                        <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
                            <Users className="text-pink-400" size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Gestão de Equipe</h3>
                        <p className="text-sm text-gray-400">
                            Controle de comissões, escalas e performance individual de cada profissional.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

function ChatMessage({ text, align }: { text: string, align: 'left' | 'right' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`
                max-w-[80%] rounded-2xl px-3 py-2 text-xs
                ${align === 'right'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-zinc-800 text-gray-300 rounded-tl-sm'
                }
            `}>
                {text}
            </div>
        </motion.div>
    );
}
