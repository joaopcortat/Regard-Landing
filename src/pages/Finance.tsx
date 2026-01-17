import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, PieChart, Activity, Download } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

export function Finance() {
    return (
        <Layout>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Inteligência Financeira</h1>
                        <p className="text-sm text-[#a1a1aa]">Visão estratégica de lucros e comissões</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181b] px-4 py-2 text-sm font-medium text-[#f4f4f5] hover:bg-[#27272a] transition-colors">
                            <Download size={16} className="text-[#a1a1aa]" />
                            Exportar Relatório
                        </button>
                    </div>
                </div>

                {/* SECTION 1: CASH FLOW HUD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        label="Receita Realizada"
                        value="R$ 124.500,00"
                        trend="+12% vs mês anterior"
                        trendColor="text-emerald-500"
                        icon={DollarSign}
                    />
                    <MetricCard
                        label="A Receber (Projetado)"
                        value="R$ 42.800,00"
                        subtext="Baseado na agenda confirmada"
                        icon={TrendingUp}
                        highlight
                    />
                    <MetricCard
                        label="Lucro Estimado"
                        value="R$ 68.200,00"
                        subtext="Margem Líquida: 54%"
                        icon={Activity}
                        isProfit
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* SECTION 2: SPLIT ENGINE (2/3 width) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
                            <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Repasse Médico (Split Engine)</h2>
                                <span className="text-xs font-medium text-[#a1a1aa] bg-[#27272a] px-2 py-1 rounded">Jan/2026</span>
                            </div>
                            <div className="p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase text-[#71717a] bg-[#18181b]">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Profissional</th>
                                            <th className="px-6 py-4 font-medium text-right">Volume Produzido</th>
                                            <th className="px-6 py-4 font-medium text-center">% Combinado</th>
                                            <th className="px-6 py-4 font-medium text-right">A Pagar</th>
                                            <th className="px-6 py-4 font-medium text-right">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#27272a]">
                                        <SplitRow
                                            name="Dr. Lucas M."
                                            role="Dermatologista"
                                            avatar="L"
                                            volume="R$ 85.000,00"
                                            percentage={40}
                                            payout="R$ 34.000,00"
                                        />
                                        <SplitRow
                                            name="Dra. Ana Silva"
                                            role="Biomédica"
                                            avatar="A"
                                            volume="R$ 32.400,00"
                                            percentage={30}
                                            payout="R$ 9.720,00"
                                        />
                                        <SplitRow
                                            name="Dr. Pedro S."
                                            role="Cirurgião"
                                            avatar="P"
                                            volume="R$ 112.000,00"
                                            percentage={50}
                                            payout="R$ 56.000,00"
                                        />
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 bg-[#18181b]/50 border-t border-[#27272a] text-center">
                                <button className="text-sm font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors">
                                    Ver todos os repasses →
                                </button>
                            </div>
                        </div>

                        {/* SECTION 4: RECENT TRANSACTIONS */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-white px-1">Últimas Transações</h2>
                            <div className="rounded-xl border border-[#27272a] bg-[#121214] p-2 space-y-1">
                                <TransactionRow
                                    title="Pagamento - Lote Botox (Galderma)"
                                    date="Hoje, 14:30"
                                    amount="- R$ 12.450,00"
                                    type="expense"
                                />
                                <TransactionRow
                                    title="Recebimento - Harmonização (Mariana S.)"
                                    date="Hoje, 11:15"
                                    amount="+ R$ 4.500,00"
                                    type="income"
                                />
                                <TransactionRow
                                    title="Recebimento - Consulta (Carlos E.)"
                                    date="Ontem, 16:40"
                                    amount="+ R$ 450,00"
                                    type="income"
                                />
                                <TransactionRow
                                    title="Conta de Energia - Dez/25"
                                    date="12 Jan"
                                    amount="- R$ 1.200,00"
                                    type="expense"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: PROFITABILITY RADAR (1/3 Width) */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-[#27272a] bg-[#121214] p-6 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <PieChart size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Radar de Lucro</h2>
                                    <p className="text-xs text-[#a1a1aa]">Margem real por procedimento</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <ProfitBar
                                    label="Consulta Particular"
                                    margin={100}
                                    revenue="R$ 12k"
                                    color="bg-emerald-500"
                                />
                                <ProfitBar
                                    label="Bioestimulador"
                                    margin={65}
                                    revenue="R$ 45k"
                                    color="bg-emerald-500"
                                />
                                <ProfitBar
                                    label="Toxina Botulínica"
                                    margin={40}
                                    revenue="R$ 52k"
                                    color="bg-emerald-500/80"
                                />
                                <ProfitBar
                                    label="Fios de PDO"
                                    margin={35}
                                    revenue="R$ 18k"
                                    color="bg-emerald-500/60"
                                />
                                <ProfitBar
                                    label="Laser (Locação)"
                                    margin={20}
                                    revenue="R$ 8k"
                                    color="bg-amber-500"
                                />
                            </div>

                            <div className="mt-8 rounded-lg bg-[#18181b] p-4 border border-[#27272a]">
                                <h4 className="text-xs font-semibold uppercase text-[#71717a] mb-2">Insight do Mês</h4>
                                <p className="text-sm text-[#d4d4d8] leading-relaxed">
                                    <span className="text-emerald-500 font-medium">Consultas Particulares</span> representam apenas 10% da receita, mas 25% do lucro líquido. Considere aumentar a disponibilidade de agenda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function MetricCard({ label, value, subtext, trend, trendColor, icon: Icon, isProfit }: any) {
    return (
        <div className={cn(
            "rounded-xl border p-6 relative overflow-hidden group transition-all hover:shadow-lg hover:shadow-black/20",
            isProfit ? "bg-gradient-to-br from-[#121214] to-[#062c1b] border-emerald-900/30" : "bg-[#121214] border-[#27272a]"
        )}>
            {isProfit && <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 translate-y-[-10px] rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>}

            <div className="flex items-start justify-between mb-4 relative z-10">
                <p className="text-sm font-medium text-[#a1a1aa]">{label}</p>
                <div className={cn("p-2 rounded-lg", isProfit ? "bg-emerald-500/10 text-emerald-500" : "bg-[#18181b] text-[#71717a]")}>
                    <Icon size={18} />
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white tabular-nums tracking-tight mb-1">{value}</h3>
                {trend && (
                    <p className={cn("text-xs font-medium flex items-center gap-1", trendColor)}>
                        <TrendingUp size={12} /> {trend}
                    </p>
                )}
                {subtext && <p className="text-xs text-[#52525b]">{subtext}</p>}
            </div>
        </div>
    );
}

function SplitRow({ name, role, avatar, volume, percentage, payout }: any) {
    return (
        <tr className="hover:bg-[#18181b] transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#27272a] flex items-center justify-center text-xs font-bold text-[#a1a1aa] border border-[#3f3f46]">
                        {avatar}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{name}</p>
                        <p className="text-xs text-[#52525b]">{role}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <span className="text-sm text-[#f4f4f5] tabular-nums">{volume}</span>
            </td>
            <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center rounded-md bg-[#27272a] px-2 py-1 text-xs font-medium text-[#a1a1aa] ring-1 ring-inset ring-white/5">
                    {percentage}%
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <span className="text-sm font-bold text-[#f4f4f5] tabular-nums">{payout}</span>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="text-xs font-medium text-[#3b82f6] hover:text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity">
                    Detalhes
                </button>
            </td>
        </tr>
    );
}

function TransactionRow({ title, date, amount, type }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#18181b] transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "p-2 rounded-full flex items-center justify-center",
                    type === 'income' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                )}>
                    {type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
                <div>
                    <h4 className="text-sm font-medium text-[#f4f4f5] group-hover:text-white transition-colors">{title}</h4>
                    <p className="text-xs text-[#52525b]">{date}</p>
                </div>
            </div>
            <span className={cn(
                "text-sm font-medium tabular-nums",
                type === 'income' ? "text-emerald-500" : "text-red-500"
            )}>
                {amount}
            </span>
        </div>
    );
}

function ProfitBar({ label, margin, revenue, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-[#f4f4f5]">{label} (R$ {revenue})</span>
                <span className="text-sm font-bold text-emerald-500">{margin}% Margem</span>
            </div>
            <div className="h-2 w-full bg-[#18181b] rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full", color)}
                    style={{ width: `${margin}%` }}
                />
            </div>
        </div>
    );
}
