import { Minus, Plus, Receipt, CreditCard, ChevronRight } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

interface BudgetItem {
    id: number;
    name: string;
    price: number;
    qty: number;
}

interface BudgetReceiptProps {
    items: BudgetItem[];
    onRemove: (id: number) => void;
    onUpdateQty: (id: number, delta: number) => void;
}

export function BudgetReceipt({ items, onRemove, onUpdateQty }: BudgetReceiptProps) {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discount = 0; // Future feature
    const total = subtotal - discount;
    const installments = 12;
    const installmentValue = total / installments;

    return (
        <div className="flex flex-col h-full bg-[#121214] border-l border-[#27272a] shadow-2xl relative">
            {/* Header */}
            <div className="p-6 border-b border-[#27272a] bg-[#121214]/95 backdrop-blur z-10">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-[#27272a] flex items-center justify-center text-[#e4e4e7]">
                        <Receipt size={16} />
                    </div>
                    <span className="font-semibold text-white">Plano Financeiro</span>
                </div>
                <p className="text-xs text-[#a1a1aa] pl-11">Dr. Silva • CRM 12345</p>
            </div>

            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#52525b] space-y-3">
                        <CreditCard size={32} strokeWidth={1.5} className="opacity-20" />
                        <p className="text-sm font-medium">Nenhum procedimento</p>
                        <p className="text-xs text-center max-w-[200px]">Selecione regiões no mapa ou adicione protocolos.</p>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col gap-2 p-3 rounded-lg bg-[#18181b] border border-[#27272a] group"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-medium text-[#e4e4e7] leading-tight max-w-[70%]">{item.name}</span>
                                    <span className="text-sm font-bold text-white tabular-nums">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.qty)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center gap-2 bg-[#27272a] rounded-md p-0.5">
                                        <button
                                            onClick={() => onUpdateQty(item.id, -1)}
                                            className="p-1 hover:bg-[#3f3f46] rounded text-[#a1a1aa] hover:text-white transition-colors"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-xs font-medium w-4 text-center text-[#e4e4e7] tabular-nums">{item.qty}</span>
                                        <button
                                            onClick={() => onUpdateQty(item.id, 1)}
                                            className="p-1 hover:bg-[#3f3f46] rounded text-[#a1a1aa] hover:text-white transition-colors"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="text-[10px] text-rose-500 hover:bg-rose-500/10 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Footer / Totals */}
            <div className="mt-auto p-6 bg-[#09090b] border-t border-[#27272a]">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-[#a1a1aa]">
                        <span>Subtotal</span>
                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</span>
                    </div>
                    {/* Discount row could go here */}
                </div>

                <div className="flex justify-between items-end mb-6">
                    <span className="text-sm font-medium text-white">Total</span>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-white tracking-tight block">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                        </span>
                    </div>
                </div>

                <div className="bg-[#18181b] rounded-lg p-3 border border-[#27272a] mb-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[#a1a1aa]">12x sem juros</span>
                        <span className="font-medium text-emerald-500">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(installmentValue)}
                        </span>
                    </div>
                </div>

                <button className="w-full py-3 bg-[#e4e4e7] hover:bg-white text-black font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Gerar Orçamento
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
