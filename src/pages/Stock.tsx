import { AlertCircle, Archive, PackageCheck, ShoppingCart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { StockList } from '@/components/stock/StockList';
import { cn } from '@/lib/utils';

export function Stock() {
    return (
        <Layout>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Estoque & Farmácia</h1>
                        <p className="text-sm text-[#a1a1aa]">Gestão de ativos de alto valor</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181b] px-4 py-2 text-sm font-medium text-[#f4f4f5] hover:bg-[#27272a] transition-colors">
                            <Archive size={16} className="text-[#a1a1aa]" />
                            Histórico
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb] shadow-lg shadow-blue-500/20 transition-all">
                            <PackageCheck size={16} />
                            Consumo Rápido
                        </button>
                    </div>
                </div>

                {/* SECTION 1: INVENTORY HUD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InventoryCard
                        label="Valor em Estoque"
                        value="R$ 47.950,00"
                        subtext="Ativos biológicos e insumos"
                        icon={Archive}
                        color="emerald"
                    />
                    <InventoryCard
                        label="Itens Críticos"
                        value="3 Produtos"
                        subtext="Estoque baixo ou validade próxima"
                        icon={AlertCircle}
                        color="red"
                        highlight
                    />
                    <InventoryCard
                        label="Previsão de Compra"
                        value="R$ 15.200,00"
                        subtext="Necessário para repor mês atual"
                        icon={ShoppingCart}
                        color="blue"
                    />
                </div>

                {/* SECTION 2: SMART SHELF */}
                <StockList />
            </div>
        </Layout>
    );
}

function InventoryCard({ label, value, subtext, icon: Icon, color, highlight }: any) {
    const colors = {
        emerald: "text-emerald-500 bg-emerald-500/10",
        red: "text-red-500 bg-red-500/10",
        blue: "text-blue-500 bg-blue-500/10",
    };

    // @ts-ignore
    const colorClass = colors[color] || colors.emerald;

    return (
        <div className={cn(
            "rounded-xl border p-6 relative overflow-hidden transition-all hover:shadow-lg hover:shadow-black/20",
            highlight ? "bg-[#121214] border-red-900/40" : "bg-[#121214] border-[#27272a]"
        )}>
            {highlight && (
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y-[-8px] rounded-full bg-red-500/5 blur-3xl"></div>
            )}

            <div className="flex items-start justify-between mb-4 relative z-10">
                <p className="text-sm font-medium text-[#a1a1aa]">{label}</p>
                <div className={cn("p-2 rounded-lg", colorClass)}>
                    <Icon size={18} />
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white tabular-nums tracking-tight mb-1">{value}</h3>
                <p className="text-xs text-[#52525b]">{subtext}</p>
            </div>
        </div>
    );
}
