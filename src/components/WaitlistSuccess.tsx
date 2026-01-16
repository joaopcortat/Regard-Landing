import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Instagram } from 'lucide-react';


interface WaitlistSuccessProps {
    userName: string;
    userEmail: string;
}

export function WaitlistSuccess({ userName, userEmail }: WaitlistSuccessProps) {
    const [status, setStatus] = useState<'loading' | 'reveal'>('loading');

    useEffect(() => {
        const timer = setTimeout(() => setStatus('reveal'), 2500); // 2.5s Processing simulation
        return () => clearTimeout(timer);
    }, []);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    // Shine effect moving opposite to rotation
    const shineX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const shineY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = event.clientX - rect.left;
        const mouseYVal = event.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[500px] text-center perspective-1000">
            {status === 'loading' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-t-2 border-l-2 border-blue-500 rounded-full animate-spin" />
                        <div className="absolute inset-2 border-r-2 border-b-2 border-blue-500/30 rounded-full animate-[spin_1s_reverse_infinite]" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-mono text-blue-400 tracking-widest uppercase animate-pulse">Processando Perfil</h3>
                        <p className="text-zinc-500 text-sm">Analisando faturamento e métricas...</p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                    className="w-full flex flex-col items-center"
                >
                    <motion.div
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full max-w-[380px] aspect-[1.586/1] rounded-2xl bg-[#080808] border border-white/10 shadow-2xl overflow-hidden group cursor-pointer mb-10"
                    >
                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

                        {/* Holographic Edge */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50 pointer-events-none" />

                        {/* Interactive Shine */}
                        <motion.div
                            style={{
                                background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15), transparent 60%)`
                            }}
                            className="absolute inset-0 pointer-events-none z-10"
                        />

                        {/* Card Content */}
                        <div className="relative z-20 h-full p-6 flex flex-col justify-between select-none">
                            <div className="flex justify-between items-start">
                                <img src="/logo-icon.png" className="w-8 h-8 object-contain opacity-90 mix-blend-screen" alt="Regard" />
                                <div className="text-[10px] text-zinc-500 font-mono border border-zinc-800 px-2 py-0.5 rounded">BETA ACCESS</div>
                            </div>

                            <div className="space-y-1 text-left">
                                <label className="text-[8px] tracking-[0.2em] text-zinc-500 uppercase">Member Name</label>
                                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-widest uppercase truncate shadow-black drop-shadow-md">
                                    {userName || "CONVIDADO"}
                                </h3>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="text-left">
                                    <div className="text-[8px] tracking-[0.2em] text-zinc-500 uppercase">Valid Thru</div>
                                    <div className="text-xs font-mono text-zinc-300">12/26</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[8px] tracking-[0.2em] text-zinc-500 uppercase">Waitlist ID</div>
                                    <div className="text-sm font-mono text-blue-400">#WAIT-{Math.floor(Math.random() * 9000) + 1000}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-6 max-w-sm">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-white">Solicitação em Análise</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Devido à alta demanda, processamos acessos em lotes de faturamento. Fique atento ao seu <strong>{userEmail}</strong> e <strong>WhatsApp</strong>.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/5 w-full">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 text-center">Quer prioridade na fila?</p>
                            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/20">
                                <Instagram size={18} /> Seguir @regard.md
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
