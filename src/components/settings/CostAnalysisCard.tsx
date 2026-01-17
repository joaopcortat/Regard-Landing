import { AlertTriangle, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';


interface CostAnalysisCardProps {
    price: number;
    cost: number;
    taxRate: number;
    commissionRate: number;
}

export function CostAnalysisCard({ price, cost, taxRate, commissionRate }: CostAnalysisCardProps) {
    const taxes = price * (taxRate / 100);
    const commission = price * (commissionRate / 100);
    const totalDeductions = cost + taxes + commission;
    const netProfit = price - totalDeductions;
    const margin = price > 0 ? (netProfit / price) * 100 : 0;

    // Health Logic
    const getHealth = () => {
        if (margin < 20) return { color: "text-rose-500", bg: "bg-rose-500", border: "border-rose-500", label: "Margem Crítica", icon: AlertTriangle };
        if (margin < 35) return { color: "text-amber-500", bg: "bg-amber-500", border: "border-amber-500", label: "Atenção", icon: AlertTriangle };
        return { color: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500", label: "Saudável", icon: CheckCircle2 };
    };

    const health = getHealth();

    const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="h-full bg-[#121214] border-l border-[#27272a] p-6 flex flex-col">
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <TrendingUp size={16} className="text-blue-500" />
                    Análise Financeira
                </h3>
                <p className="text-xs text-zinc-500 mt-1">Raio-X do lucro real por procedimento.</p>
            </div>

            {/* The Big Number */}
            <div className="mb-8 p-4 rounded-xl bg-[#18181b] border border-[#27272a] relative overflow-hidden group">
                <div className={cn("absolute top-0 inset-x-0 h-1", health.bg)} />
                <p className="text-xs text-zinc-400 mb-1 uppercase tracking-wider">Lucro Líquido Real</p>
                <div className="flex items-baseline gap-2">
                    <span className={cn("text-3xl font-bold tracking-tight", health.color)}>
                        {fmt(netProfit)}
                    </span>
                    <span className="text-sm text-zinc-500 font-medium">
                        ({margin.toFixed(1)}%)
                    </span>
                </div>

                <div className={cn("inline-flex items-center gap-1.5 mt-3 px-2 py-1 rounded text-[10px] font-bold uppercase", health.bg + "/10", health.color)}>
                    <health.icon size={12} />
                    {health.label}
                </div>
            </div>

            {/* The Waterfall */}
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">Preço de Venda</span>
                    <span className="text-white font-medium">{fmt(price)}</span>
                </div>

                <div className="h-px bg-[#27272a]" />

                <div className="space-y-3">
                    <CostRow label="Imp. e Taxas" value={taxes} percent={taxRate} color="text-amber-500" />
                    <CostRow label="Comissão Médica" value={commission} percent={commissionRate} color="text-blue-500" />
                    <CostRow label="Custo Material (CMV)" value={cost} percent={price > 0 ? (cost / price) * 100 : 0} color="text-rose-500" highlight />
                </div>
            </div>

            {/* Insight */}
            <div className="mt-8 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 flex gap-3 text-xs text-blue-400">
                <Info size={16} className="flex-shrink-0 mt-0.5" />
                <p>
                    {margin < 20
                        ? "Sua margem está baixa. Considere rever o preço ou negociar insumos."
                        : "Sua margem está excelente. Você tem espaço para investir em marketing."}
                </p>
            </div>
        </div>
    );
}

function CostRow({ label, value, percent, color, highlight }: any) {
    const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", color.replace('text-', 'bg-'))} />
                <span className={cn("text-xs text-zinc-400", highlight && "text-zinc-200 font-medium")}>{label}</span>
            </div>
            <div className="text-right">
                <div className={cn("text-xs font-medium", color)}>{fmt(value)}</div>
                <div className="text-[10px] text-zinc-600">{percent.toFixed(1)}%</div>
            </div>
        </div>
    );
}
