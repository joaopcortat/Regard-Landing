import { motion } from 'framer-motion';
import { Shield, Zap, Brain, Eye } from 'lucide-react';
import React, { useRef, useState } from 'react';

// Spotlight Card Component
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            className={`relative rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity: isFocused ? 1 : 0,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

export function BentoFeatures() {
    return (
        <section className="py-32 px-6 relative">
            <div className="max-w-6xl mx-auto mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
                >
                    Arquitetura de Alta Performance
                </motion.h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {/* Card 1: Large */}
                <SpotlightCard className="md:col-span-2 row-span-1">
                    <div className="p-8 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                            <Brain className="text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Inteligência Preditiva</h3>
                            <p className="text-zinc-400">O Regard prevê cancelamentos e preenche lacunas automaticamente. Nossa IA aprende os padrões da sua clínica.</p>
                        </div>
                        <div className="h-32 mt-4 bg-gradient-to-r from-blue-500/5 to-transparent rounded-lg border border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        </div>
                    </div>
                </SpotlightCard>

                {/* Card 2 */}
                <SpotlightCard className="md:col-span-1">
                    <div className="p-8 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                            <Zap className="text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Velocidade Extrema</h3>
                            <p className="text-zinc-400">Tempo de resposta instantâneo. Zero latência.</p>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Card 3 */}
                <SpotlightCard className="md:col-span-1">
                    <div className="p-8 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                            <Shield className="text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Dados Blindados</h3>
                            <p className="text-zinc-400">Criptografia de ponta a ponta. Seus pacientes, seguros.</p>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Card 4: Large */}
                <SpotlightCard className="md:col-span-2">
                    <div className="p-8 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                            <Eye className="text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Visão 360º</h3>
                            <p className="text-zinc-400">Dashboard unificado. Marketing, Financeiro e Clínico em uma única tela.</p>
                        </div>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
}
