import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Simple fallback for clsx/tailwind-merge if not in utils yet


import { QualificationQuiz } from './components/QualificationQuiz';
import { Key } from 'lucide-react';

export default function LandingPage() {
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
            {/* Qualification Quiz Modal */}
            <QualificationQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

            {/* Floating Premium Access Orb */}
            <motion.button
                onClick={() => setIsQuizOpen(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md flex items-center justify-center group shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:bg-blue-500/20 transition-all duration-300"
            >
                <div className="absolute inset-0 rounded-full border border-blue-500/50 animate-[ping_3s_ease-in-out_infinite] opacity-50" />
                <Key className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
            </motion.button>
            {/* Atmosphere / Lighting */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] mix-blend-overlay" />
            </div>

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 px-6">
                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    className="flex flex-col items-center text-center max-w-4xl mx-auto"
                >
                    {/* Logo Reveal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-12 relative group cursor-default"
                    >
                        <div className="w-24 h-24 mb-6 relative mx-auto">
                            <img
                                src="/logo-icon.png"
                                className="w-full h-full object-contain mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                alt="Regard Logo"
                            />
                            {/* Subtle Glow behind logo */}
                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-lg font-bold tracking-[0.35em] uppercase text-zinc-100"
                        >
                            Regard
                        </motion.h2>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent"
                    >
                        A Inteligência que <br className="hidden md:block" />
                        <span className="text-white">Blinda o seu Lucro.</span>
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 1 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12"
                    >
                        O Sistema Operacional definitivo para clínicas de alta performance. <br />
                        <span className="text-zinc-300">Exclusivo. Seguro. Invisível.</span>
                    </motion.p>

                    {/* Magnetic CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: 0.8 }}
                    >
                        <MagneticButton>
                            <button
                                onClick={() => setIsQuizOpen(true)}
                                className="relative px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium tracking-widest uppercase hover:bg-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Solicitar Acesso
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                </span>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />
                            </button>
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 1: The Problem (Chaos) */}
            <section className="min-h-[80vh] flex items-center justify-center relative py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Text Side */}
                    <FadeIn>
                        <h3 className="text-sm font-bold text-red-500 tracking-widest uppercase mb-4">O Inimigo Invisível</h3>
                        <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-zinc-200">
                            Sua clínica perde <span className="text-white border-b border-red-500/30 pb-1">20% de receita</span> sem você ver.
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Processos fragmentados e agendas ociosas drenam o potencial do seu negócio. Enquanto você foca na excelência clínica, o caos operacional corrói suas margens.
                        </p>
                    </FadeIn>

                    {/* Visual Side (Chaos Abstract) */}
                    <FadeIn delay={0.2} className="relative flex items-center justify-center">
                        <div className="relative w-80 h-80">
                            <div className="absolute inset-0 bg-red-500/5 rounded-full blur-[80px] animate-pulse" />
                            <div className="relative z-10 w-full h-full border border-white/10 rounded-2xl backdrop-blur-sm bg-zinc-900/50 flex items-center justify-center overflow-hidden">
                                {/* Abstract Noise */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150" />
                                <div className="text-center p-8 space-y-4">
                                    <div className="h-2 w-32 bg-zinc-800 rounded mx-auto overflow-hidden">
                                        <div className="h-full bg-red-500/50 w-2/3 animate-[loading_2s_ease-in-out_infinite]" />
                                    </div>
                                    <div className="h-2 w-24 bg-zinc-800 rounded mx-auto" />
                                    <div className="h-2 w-28 bg-zinc-800 rounded mx-auto" />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Section 2: The Solution (Focus) */}
            <section className="min-h-[80vh] flex items-center justify-center relative py-24 border-t border-white/5 bg-gradient-to-b from-[#050505] to-[#0A0A0A]">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
                    {/* Visual Side (Regard Iris) */}
                    <div className="order-2 md:order-1 flex items-center justify-center">
                        <FadeIn className="relative w-80 h-80 flex items-center justify-center group">
                            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[80px] transition-all duration-1000 group-hover:bg-blue-500/20 group-hover:blur-[100px]" />
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative z-10 w-48 h-48 rounded-full border border-blue-500/30 flex items-center justify-center bg-[#050505]/80 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)]"
                            >
                                <img src="/logo-icon.png" className="w-24 h-24 object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                            </motion.div>
                        </FadeIn>
                    </div>

                    {/* Text Side */}
                    <div className="order-1 md:order-2">
                        <FadeIn delay={0.2}>
                            <h3 className="text-sm font-bold text-blue-500 tracking-widest uppercase mb-4">Clareza Absoluta</h3>
                            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
                                Regard traz <span className="text-blue-400">controle total</span>.
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Elimine gargalos com um sistema que pensa antes de você. Da captação inteligente à análise financeira em tempo real. O luxo de ter paz mental.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-zinc-600 text-sm tracking-widest uppercase">
                    &copy; 2026 Regard Systems. Feito para a elite.
                </p>
            </footer>
        </div>
    );
}

// Helper Components

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
}
