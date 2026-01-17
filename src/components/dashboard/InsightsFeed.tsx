import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle, Clock, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Insight {
    id: string;
    type: 'opportunity' | 'warning' | 'operational';
    title: string;
    description: string;
    actionLabel: string;
    actionType: 'stock' | 'team' | 'inbox';
    highlight: string;
}

const MOCK_INSIGHTS: Insight[] = [
    {
        id: '1',
        type: 'opportunity',
        title: 'Receita em Potencial',
        description: "A demanda por 'Bioestimulador' subiu 20% este mês, mas seu estoque dura apenas mais 3 dias.",
        actionLabel: 'Repor Estoque',
        actionType: 'stock',
        highlight: 'trending-up'
    },
    {
        id: '2',
        type: 'warning',
        title: 'Performance da Equipe',
        description: "A taxa de retorno do Dr. Pedro caiu para 15% (Média da clínica: 40%).",
        actionLabel: 'Ver Detalhes',
        actionType: 'team',
        highlight: 'alert'
    },
    {
        id: '3',
        type: 'operational',
        title: 'Eficiência Operacional',
        description: "Sua recepção está levando 12min para responder no WhatsApp. O ideal é < 5min.",
        actionLabel: 'Ver Conversas',
        actionType: 'inbox',
        highlight: 'clock'
    }
];

export function InsightsFeed() {
    const [insights, setInsights] = useState(MOCK_INSIGHTS);

    const handleDismiss = (id: string) => {
        setInsights(prev => prev.filter(i => i.id !== id));
        toast("Insight arquivado", {
            description: "Você pode acessá-lo depois em Relatórios.",
            duration: 2000
        });
    };

    const handleAction = (insight: Insight) => {
        // Simulate action
        setInsights(prev => prev.filter(i => i.id !== insight.id));

        // Celebration Toast
        if (insight.type === 'opportunity') {
            toast.success("Ótima decisão! 🚀", {
                description: "Pedido de reposição iniciado. Monitorando resultados..."
            });
        } else if (insight.type === 'warning') {
            toast.info("Abrindo Painel de Equipe", {
                description: "Focando nos dados do Dr. Pedro..."
            });
        } else {
            toast.message("Abrindo Inbox", {
                description: "Filtrando conversas não lidas..."
            });
        }
    };

    if (insights.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-white">
                    <div className="relative">
                        <Sparkles size={16} className="text-purple-400" />
                        <div className="absolute inset-0 bg-purple-500 blur-[8px] opacity-50 animate-pulse" />
                    </div>
                    <h3 className="text-sm font-semibold tracking-wide">Cadran Intelligence</h3>
                </div>
                <span className="text-xs text-zinc-500">{insights.length} oportunidades encontradas hoje</span>
            </div>

            {/* Cards Feed */}
            <div className="grid gap-3">
                <AnimatePresence mode='popLayout'>
                    {insights.map((insight) => (
                        <InsightCard
                            key={insight.id}
                            insight={insight}
                            onDismiss={() => handleDismiss(insight.id)}
                            onAction={() => handleAction(insight)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

function InsightCard({ insight, onDismiss, onAction }: { insight: Insight, onDismiss: () => void, onAction: () => void }) {
    // Coding Logic
    const config = {
        opportunity: {
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            glow: "shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        },
        warning: {
            icon: AlertTriangle,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            glow: "shadow-[0_0_15px_rgba(245,158,11,0.1)]"
        },
        operational: {
            icon: Clock,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            glow: "shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        }
    }[insight.type];

    const Icon = config.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={cn(
                "relative group rounded-xl border p-4 backdrop-blur-md transition-all",
                "bg-[#121214]/80 hover:bg-[#18181b]",
                config.border,
                config.glow
            )}
        >
            {/* Dismiss Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onDismiss(); }}
                className="absolute right-3 top-3 p-1 rounded-md text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100"
            >
                <X size={14} />
            </button>

            <div className="flex gap-4">
                {/* Icon Column */}
                <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", config.bg, config.color)}>
                    <Icon size={20} />
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <h4 className={cn("text-sm font-medium", config.color)}>{insight.title}</h4>
                        {insight.type === 'opportunity' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                                HOT
                            </span>
                        )}
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed pr-6">
                        {insight.description}
                    </p>

                    <div className="pt-3 flex items-center gap-3">
                        <button
                            onClick={onAction}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600",
                                "group/btn"
                            )}
                        >
                            {insight.actionLabel}
                            <ArrowRight size={12} className="text-zinc-500 group-hover/btn:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
