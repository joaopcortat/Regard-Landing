import { useState } from 'react';
import {
    AlertTriangle, ChevronDown, ChevronRight,
    Package, Plus, Syringe, Download, Minus

} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Batch {
    id: string;
    code: string;
    quantity: number;
    expiryDate: string;
    isExpiringSoon?: boolean;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: 'toxin' | 'filler' | 'bio' | 'disposable';
    totalStock: number;
    minStock: number;
    unitCost: number;
    batches: Batch[];
}

const INITIAL_STOCK: Product[] = [
    {
        id: '1',
        name: 'Dysport 500U',
        brand: 'Galderma',
        category: 'toxin',
        totalStock: 8,
        minStock: 10,
        unitCost: 1250,
        batches: [
            { id: 'b1', code: 'Lote A293', quantity: 3, expiryDate: '15 Fev, 2026', isExpiringSoon: true },
            { id: 'b2', code: 'Lote B991', quantity: 5, expiryDate: '10 Out, 2026' }
        ]
    },
    {
        id: '2',
        name: 'Restylane Lift',
        brand: 'Galderma',
        category: 'filler',
        totalStock: 15,
        minStock: 5,
        unitCost: 980,
        batches: [
            { id: 'b3', code: 'Lote C112', quantity: 15, expiryDate: '20 Dez, 2026' }
        ]
    },
    {
        id: '3',
        name: 'Botox 100U',
        brand: 'Allergan',
        category: 'toxin',
        totalStock: 2,
        minStock: 5,
        unitCost: 1100,
        batches: [
            { id: 'b4', code: 'Lote X550', quantity: 2, expiryDate: '01 Mar, 2026', isExpiringSoon: true }
        ]
    },
    {
        id: '4',
        name: 'Sculptra',
        brand: 'Galderma',
        category: 'bio',
        totalStock: 12,
        minStock: 8,
        unitCost: 1600,
        batches: [
            { id: 'b5', code: 'Lote S221', quantity: 12, expiryDate: '15 Mai, 2027' }
        ]
    }
];

export function StockList() {
    const [products, setProducts] = useState<Product[]>(INITIAL_STOCK);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDecreaseStock = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();

        // Find batch to decrease (mock: first batch)
        if (product.totalStock <= 0) {
            toast.error("Estoque vazio!");
            return;
        }

        setProducts(prev => prev.map(p => {
            if (p.id === product.id) {
                const newTotal = p.totalStock - 1;
                // Check critical level
                if (newTotal <= p.minStock / 2) {
                    toast.error(`Alerta: Estoque Crítico de ${p.name}!`, {
                        description: `Restam apenas ${newTotal} unidades.`
                    });
                } else {
                    toast("Saída registrada", {
                        description: `${p.name} - 1 unidade removida.`,
                        icon: <Minus size={16} className="text-amber-500" />
                    });
                }

                // Mock decreasing first batch logic
                const newBatches = [...p.batches];
                if (newBatches[0].quantity > 0) newBatches[0].quantity -= 1;

                return { ...p, totalStock: newTotal, batches: newBatches };
            }
            return p;
        }));
    };

    const handleAddStock = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        setProducts(prev => prev.map(p => {
            if (p.id === product.id) {
                toast.success("Entrada registrada", {
                    description: `${p.name} - +1 unidade adicionada.`
                });
                // Mock adding to first batch
                const newBatches = [...p.batches];
                newBatches[0].quantity += 1;
                return { ...p, totalStock: p.totalStock + 1, batches: newBatches };
            }
            return p;
        }));
    };

    return (
        <div className="rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase text-[#71717a] bg-[#18181b]">
                        <tr>
                            <th className="w-10 px-4 py-4"></th>
                            <th className="px-6 py-4 font-medium">Produto</th>
                            <th className="px-6 py-4 font-medium">Categoria</th>
                            <th className="px-6 py-4 font-medium text-center">Nível de Estoque</th>
                            <th className="px-6 py-4 font-medium text-right">Custo Unit.</th>
                            <th className="px-6 py-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272a]">
                        {products.map(product => (
                            <>
                                <tr
                                    key={product.id}
                                    className="hover:bg-[#18181b] transition-colors group cursor-pointer"
                                    onClick={() => toggleExpand(product.id)}
                                >
                                    <td className="px-4 py-4 text-center text-[#71717a]">
                                        {expandedId === product.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-[#27272a] flex items-center justify-center text-[#a1a1aa] border border-[#3f3f46]">
                                                {product.category === 'toxin' || product.category === 'filler' ? <Syringe size={18} /> : <Package size={18} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{product.name}</p>
                                                <p className="text-xs text-[#52525b]">{product.brand}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <CategoryBadge category={product.category} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <StockLevelBar total={product.totalStock} min={product.minStock} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm text-[#f4f4f5] tabular-nums">R$ {product.unitCost}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => handleAddStock(e, product)}
                                                className="rounded-lg p-2 text-[#a1a1aa] hover:bg-[#27272a] hover:text-emerald-500 transition-colors"
                                                title="Adicionar"
                                            >
                                                <Plus size={18} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDecreaseStock(e, product)}
                                                className="rounded-lg p-2 text-[#a1a1aa] hover:bg-[#27272a] hover:text-amber-500 transition-colors"
                                                title="Baixar / Uso"
                                            >
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedId === product.id && (
                                    <tr className="bg-[#18181b]/50">
                                        <td colSpan={6} className="px-6 py-4 shadow-inner">
                                            <div className="ml-14 space-y-3">
                                                <h4 className="text-xs font-semibold text-[#71717a] uppercase tracking-wider flex items-center gap-2">
                                                    Rastreabilidade de Lote (FEFO)
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {product.batches.map(batch => (
                                                        <div key={batch.id} className={cn(
                                                            "rounded-lg border p-3 flex items-center justify-between",
                                                            batch.isExpiringSoon ? "bg-red-500/5 border-red-500/20" : "bg-[#121214] border-[#27272a]"
                                                        )}>
                                                            <div>
                                                                <p className="text-sm font-medium text-white">{batch.code}</p>
                                                                <p className={cn("text-xs font-medium mt-0.5", batch.isExpiringSoon ? "text-red-400" : "text-[#71717a]")}>
                                                                    Val: {batch.expiryDate} {batch.isExpiringSoon && "(Crítico)"}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="text-right">
                                                                    <p className="text-xs text-[#52525b]">Qtd</p>
                                                                    <p className="text-sm font-bold text-white tabular-nums">{batch.quantity}</p>
                                                                </div>
                                                                {batch.isExpiringSoon && (
                                                                    <AlertTriangle size={16} className="text-red-500" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="pt-2">
                                                    <button className="flex items-center gap-1 text-xs font-medium text-[#3b82f6] hover:text-[#60a5fa] transition-colors">
                                                        <Plus size={14} /> Adicionar Novo Lote
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function CategoryBadge({ category }: { category: string }) {
    const styles = {
        toxin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        filler: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        bio: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        disposable: "bg-zinc-800 text-zinc-400 border-zinc-700"
    };

    // @ts-ignore
    const style = styles[category] || styles.disposable;
    const label = { toxin: 'Toxina', filler: 'Preenchedor', bio: 'Bioestimulador', disposable: 'Descartável' }[category] || category;

    return (
        <span className={cn("inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium", style)}>
            {label}
        </span>
    );
}

function StockLevelBar({ total, min }: { total: number, min: number }) {
    const percentage = Math.min((total / (min * 2)) * 100, 100);
    const isLow = total <= min;
    const isCritical = total <= min / 2;

    let color = "bg-emerald-500";
    if (isCritical) color = "bg-red-500";
    else if (isLow) color = "bg-amber-500";

    return (
        <div className="flex flex-col gap-1.5 w-32 mx-auto">
            <div className="flex justify-between text-xs">
                <span className={cn("font-medium", isLow ? "text-amber-500" : "text-emerald-500")}>
                    {total} un
                </span>
                <span className="text-[#52525b]">Min: {min}</span>
            </div>
            <div className="h-1.5 w-full bg-[#27272a] rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all", color)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
