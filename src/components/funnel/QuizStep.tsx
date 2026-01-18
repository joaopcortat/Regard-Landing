import { motion } from 'framer-motion';

interface Option {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

interface QuizStepProps {
    question: string;
    description?: string;
    options: Option[];
    onSelect: (value: string) => void;
    stepIndex: number;
    totalSteps: number;
}

export function QuizStep({ question, description, options, onSelect, stepIndex, totalSteps }: QuizStepProps) {
    return (
        <div className="w-full max-w-2xl mx-auto px-6">
            <div className="mb-8">
                <div className="flex justify-between text-xs text-slate-500 mb-2 uppercase tracking-widest font-medium">
                    <span>Diagnóstico de Clínica</span>
                    <span>{stepIndex} / {totalSteps}</span>
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stepIndex / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-indigo-500"
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={stepIndex} // Re-animate on step change
                className="space-y-8"
            >
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
                        {question}
                    </h2>
                    {description && (
                        <p className="text-slate-400 text-lg">
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid gap-3">
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSelect(option.value)}
                            className="group relative p-4 rounded-xl border border-slate-700/50 bg-slate-800/20 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 text-left flex items-center gap-4 active:scale-[0.99]"
                        >
                            {option.icon && (
                                <div className="text-slate-400 group-hover:text-indigo-400 transition-colors">
                                    {option.icon}
                                </div>
                            )}
                            <span className="text-slate-200 group-hover:text-white font-medium text-lg">
                                {option.label}
                            </span>
                            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">
                                →
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
