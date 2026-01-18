import { useState } from 'react';
import { QuizStep } from './QuizStep';
import { LoadingAnalysis } from './LoadingAnalysis';
import { RestrictedReport } from './RestrictedReport';
import { CadranLogo } from '../brand/CadranLogo';

interface FunnelControllerProps {
    onClose: () => void;
    initialView?: 'quiz' | 'report';
}

export function FunnelController({ onClose, initialView = 'quiz' }: FunnelControllerProps) {
    const [step, setStep] = useState(0);
    const [view, setView] = useState<'quiz' | 'loading' | 'report'>(initialView);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const questions = [
        {
            id: 'role',
            question: "Qual seu papel principal na clínica?",
            options: [
                { label: "Sou dono/sócio", value: "owner" },
                { label: "Sou gestor administrativo", value: "manager" },
                { label: "Sou médico (sem gestão)", value: "doctor" },
            ]
        },
        {
            id: 'size',
            question: "Qual o tamanho da sua equipe?",
            options: [
                { label: "1 a 5 pessoas", value: "1-5" },
                { label: "6 a 20 pessoas", value: "6-20" },
                { label: "Mais de 20 pessoas", value: "20+" },
            ]
        },
        {
            id: 'tools',
            question: "Como você gerencia sua clínica hoje?",
            options: [
                { label: "Software médico + Planilhas", value: "erp_excel" },
                { label: "Apenas Software médico", value: "erp_only" },
                { label: "Papel e Planilhas", value: "manual" },
            ]
        },
        {
            id: 'pain',
            question: "Qual seu maior desafio hoje?",
            options: [
                { label: "No-show (Faltas de pacientes)", value: "no_show" },
                { label: "Financeiro desorganizado", value: "financial" },
                { label: "Atendimento lento/manual", value: "service" },
            ]
        }
    ];

    const handleAnswer = (value: string) => {
        const currentQ = questions[step];
        setAnswers(prev => ({ ...prev, [currentQ.id]: value }));

        if (step < questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setView('loading');
        }
    };

    if (view === 'loading') {
        return <LoadingAnalysis onComplete={() => setView('report')} />;
    }

    if (view === 'report') {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col">
                <div className="p-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium tracking-tight">Cadran</span>
                    </div>
                    {/* Optional: <button onClick={onClose} className="text-slate-500 hover:text-white">Sair</button> */}
                </div>
                <div className="flex-1 flex items-center">
                    <RestrictedReport onRestart={onClose} answers={answers} />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#030712] flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern mask-image-gradient pointer-events-none opacity-40"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <header className="p-6 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium tracking-tight">Cadran</span>
                </div>
                <button onClick={onClose} className="text-sm text-slate-500 hover:text-white transition-colors">
                    Cancelar
                </button>
            </header>

            <main className="flex-1 flex items-center justify-center pb-20 relative z-10">
                <QuizStep
                    question={questions[step].question}
                    options={questions[step].options}
                    onSelect={handleAnswer}
                    stepIndex={step + 1}
                    totalSteps={questions.length}
                />
            </main>
        </div>
    );
}
