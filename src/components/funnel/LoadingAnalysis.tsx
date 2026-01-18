import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Search, BrainCircuit } from 'lucide-react';

export function LoadingAnalysis({ onComplete }: { onComplete: () => void }) {
    const [status, setStatus] = useState("Conectando aos servidores...");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const steps = [
            { msg: "Analisando estrutura da clínica...", time: 1000 },
            { msg: "Calculando ineficiências de agenda...", time: 2500 },
            { msg: "Projetando cenário de receita com IA...", time: 4000 },
            { msg: "Gerando relatório de performance...", time: 5500 },
        ];

        // Status updates
        steps.forEach(step => {
            setTimeout(() => setStatus(step.msg), step.time);
        });

        // Progress Bar
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Complete shortly after 100%
                    return 100;
                }
                return prev + 1; // Approx 60ms * 100 = 6s total
            });
        }, 60);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-indigo-950/20 z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full z-0"></div>

            <div className="relative z-10 w-full max-w-md text-center space-y-8">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin direction-reverse"></div>
                    <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-medium text-white tracking-tight">
                        Processando seus dados
                    </h2>

                    <div className="h-12 flex items-center justify-center">
                        <motion.div
                            key={status}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-indigo-300 font-mono text-sm flex items-center gap-2"
                        >
                            <Loader2 className="w-3 h-3 animate-spin" />
                            {status}
                        </motion.div>
                    </div>

                    {/* Matrix-like Progress Bar */}
                    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute top-0 right-0 bottom-0 w-full bg-white/20 animate-pulse"></div>
                        </motion.div>
                    </div>
                    <div className="text-right text-xs text-slate-500 font-mono">
                        {progress}% COMPLETE
                    </div>
                </div>

                {/* Simulated Console Log */}
                <div className="mt-8 text-left p-4 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px] text-green-500/80 h-32 overflow-hidden flex flex-col justify-end">
                    <div className="opacity-50">Checking historical params... OK</div>
                    <div className="opacity-60">Optimizing scheduler nodes... OK</div>
                    <div className="opacity-70">Calculating LTV projection...</div>
                    <div className="opacity-80">Scanning for revenue leaks... FOUND</div>
                    <div className="animate-pulse">_</div>
                </div>
            </div>
        </div>
    );
}
