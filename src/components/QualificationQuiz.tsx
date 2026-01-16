import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Calendar, DollarSign, Package, Users, Check } from 'lucide-react';
import { cn } from '../utils';
import { WaitlistSuccess } from './WaitlistSuccess';


interface QualificationQuizProps {
    isOpen: boolean;
    onClose: () => void;
}

import { useWaitlist } from '../hooks/useWaitlist';

export function QualificationQuiz({ isOpen, onClose }: QualificationQuizProps) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        clinicName: '',
        userName: '',
        revenue: '',
        painPoint: '',
        email: '',
        whatsapp: ''
    });
    const [shake, setShake] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { submitLead, isLoading } = useWaitlist();

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setStep(0);
            setSubmitted(false);
            setFormData({
                clinicName: '',
                userName: '',
                revenue: '',
                painPoint: '',
                email: '',
                whatsapp: ''
            });
        }
    }, [isOpen]);



    // ... inside QualificationQuiz ...

    const handleNext = async () => {
        // Validation logic
        let isValid = true;
        if (step === 0 && (!formData.clinicName || !formData.userName)) isValid = false;
        if (step === 3 && (!formData.email || !formData.whatsapp)) isValid = false;

        if (!isValid) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        if (step < 3) {
            setStep(step + 1);
        } else {
            // Submit logic using the new hook
            console.log("Submitting via useWaitlist...", formData);

            const result = await submitLead({
                name: formData.userName,
                email: formData.email,
                whatsapp: formData.whatsapp,
                quizData: {
                    clinicName: formData.clinicName,
                    revenue: formData.revenue,
                    painPoint: formData.painPoint,
                    source: 'landing_quiz' // Extra metadata example
                }
            });

            if (!result.success) {
                alert(result.error);
                return;
            }

            setSubmitted(true);
        }
    };

    const handleSelection = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Auto-advance
        setTimeout(() => {
            if (step < 3) setStep(step + 1);
        }, 300);
    };

    const progress = ((step + 1) / 4) * 100;

    const variants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md"
            />

            {/* Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Progress Bar (Only show if not submitted) */}
                {!submitted && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                        <motion.div
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        />
                    </div>
                )}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center relative">
                    {submitted ? (
                        <WaitlistSuccess userName={formData.userName} userEmail={formData.email} />
                    ) : (
                        <AnimatePresence mode="wait" initial={false}>
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="w-full flex-1 flex flex-col justify-center space-y-8"
                                >
                                    <div>
                                        <h3 className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2">Fase 1: Identidade</h3>
                                        <h2 className="text-3xl font-bold text-white">Quem está no comando?</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400 ml-1">Nome da Clínica</label>
                                            <input
                                                type="text"
                                                autoFocus
                                                value={formData.clinicName}
                                                onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                                                className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
                                                placeholder="Ex: Instituto Valois"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400 ml-1">Seu Nome Completo</label>
                                            <input
                                                type="text"
                                                value={formData.userName}
                                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                                className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
                                                placeholder="Ex: Dr. João Pedro"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNext}
                                        className="w-full py-4 bg-white text-black font-bold rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                                    >
                                        Continuar <ChevronRight size={18} />
                                    </motion.button>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="w-full flex-1 flex flex-col justify-center space-y-8"
                                >
                                    <div>
                                        <h3 className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2">Fase 2: Escala</h3>
                                        <h2 className="text-3xl font-bold text-white">Volume atual da operação</h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { label: "Até R$ 50k", value: "tier1", style: "border-white/5 opacity-60" },
                                            { label: "R$ 50k - R$ 150k", value: "tier2", style: "border-white/10" },
                                            { label: "R$ 150k - R$ 300k", value: "tier3", style: "border-white/20 bg-white/[0.02]" },
                                            { label: "Acima de R$ 300k", value: "tier4", style: "border-amber-500/50 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.1)] text-amber-100" },
                                        ].map((option) => (
                                            <motion.button
                                                key={option.value}
                                                onClick={() => handleSelection('revenue', option.value)}
                                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                                                whileTap={{ scale: 0.98 }}
                                                className={cn(
                                                    "w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group",
                                                    option.style,
                                                    formData.revenue === option.value ? "border-blue-500 bg-blue-500/10" : ""
                                                )}
                                            >
                                                <span className="font-medium text-lg">{option.label}</span>
                                                {formData.revenue === option.value && <Check className="text-blue-500" size={20} />}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="w-full flex-1 flex flex-col justify-center space-y-8"
                                >
                                    <div>
                                        <h3 className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2">Fase 3: Diagnóstico</h3>
                                        <h2 className="text-3xl font-bold text-white">Onde dói mais?</h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { id: 'agenda', text: 'Agenda / No-Show', icon: Calendar },
                                            { id: 'finance', text: 'Controle Financeiro', icon: DollarSign },
                                            { id: 'stock', text: 'Estoque / Perdas', icon: Package },
                                            { id: 'team', text: 'Gestão de Equipe', icon: Users },
                                        ].map((item) => (
                                            <motion.button
                                                key={item.id}
                                                onClick={() => handleSelection('painPoint', item.id)}
                                                whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.4)" }}
                                                whileTap={{ scale: 0.95 }}
                                                className={cn(
                                                    "aspect-square rounded-2xl border border-white/10 bg-[#111] flex flex-col items-center justify-center gap-4 p-4 transition-all hover:bg-[#161616]",
                                                    formData.painPoint === item.id ? "border-blue-500 bg-blue-500/5" : ""
                                                )}
                                            >
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                                    <item.icon className={formData.painPoint === item.id ? "text-blue-500" : "text-zinc-400"} size={24} />
                                                </div>
                                                <span className="text-sm font-medium text-center text-zinc-300">{item.text}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="w-full flex-1 flex flex-col justify-center space-y-8"
                                >
                                    <div>
                                        <h3 className="text-green-500 text-xs font-bold tracking-widest uppercase mb-2">Fase Final: Protocolo</h3>
                                        <h2 className="text-3xl font-bold text-white">Onde enviamos seu acesso?</h2>
                                        <p className="text-zinc-500 text-sm mt-2">Nossa equipe de concierge entrará em contato em até 24h se o perfil for aprovado.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400 ml-1">Seu melhor e-mail corporativo</label>
                                            <input
                                                type="email"
                                                autoFocus
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white placeholder-zinc-700 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all font-medium"
                                                placeholder="doutor@clinica.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400 ml-1">WhatsApp (com DDD)</label>
                                            <input
                                                type="tel"
                                                value={formData.whatsapp}
                                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white placeholder-zinc-700 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all font-medium"
                                                placeholder="(11) 99999-9999"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNext}
                                        disabled={isLoading}
                                        className="w-full py-4 bg-green-500 text-black font-bold rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Processando...
                                            </>
                                        ) : (
                                            "Solicitar Análise de Perfil"
                                        )}
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
