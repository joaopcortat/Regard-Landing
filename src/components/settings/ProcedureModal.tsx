import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Receipt, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProtocolBuilder } from "./ProtocolBuilder";
import { CostAnalysisCard } from "./CostAnalysisCard";

interface ProcedureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ProcedureModal({ isOpen, onClose }: ProcedureModalProps) {
    // Basic Info State
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);


    // Financial Config State
    const [cost, setCost] = useState<number>(0); // Now driven by Protocol
    const [taxRate, setTaxRate] = useState<number>(10); // %
    const [commissionRate, setCommissionRate] = useState<number>(30); // %

    // UI State
    const [activeTab, setActiveTab] = useState<'basic' | 'protocol'>('basic');

    // Handler for Protocol Builder
    const handleProtocolCostUpdate = (total: number) => {
        setCost(total);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 m-auto w-full max-w-5xl h-[600px] bg-[#09090b] border border-[#27272a] rounded-2xl shadow-2xl z-50 overflow-hidden flex"
                    >
                        {/* LEFT: MAIN CONTENT (TABS) */}
                        <div className="flex-1 flex flex-col min-w-0">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[#27272a]">
                                <div>
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Calculator size={22} className="text-[#3b82f6]" />
                                        Novo Procedimento
                                    </h2>
                                    <p className="text-xs text-zinc-500 mt-1">Configure preço, custos e automação.</p>
                                </div>
                            </div>

                            {/* Tabs Navigation */}
                            <div className="flex border-b border-[#27272a]">
                                <button
                                    onClick={() => setActiveTab('basic')}
                                    className={cn(
                                        "flex animate-colors items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                                        activeTab === 'basic'
                                            ? "border-[#3b82f6] text-white bg-[#3b82f6]/5"
                                            : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-[#27272a]/50"
                                    )}
                                >
                                    <ScrollText size={16} />
                                    Informações Básicas
                                </button>
                                <button
                                    onClick={() => setActiveTab('protocol')}
                                    className={cn(
                                        "flex animate-colors items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                                        activeTab === 'protocol'
                                            ? "border-emerald-500 text-white bg-emerald-500/5"
                                            : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-[#27272a]/50"
                                    )}
                                >
                                    <Receipt size={16} />
                                    Ficha Técnica (Custo)
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                {activeTab === 'basic' ? (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-2xl">
                                        <div>
                                            <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Nome do Procedimento</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 text-white text-sm focus:border-[#3b82f6] outline-none transition-colors placeholder:text-zinc-700"
                                                placeholder="Ex: Harmonização Facial Full Face"
                                                autoFocus
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Preço de Venda (R$)</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-3 text-zinc-500 text-sm">R$</span>
                                                    <input
                                                        type="number"
                                                        value={price || ""}
                                                        onChange={(e) => setPrice(Number(e.target.value))}
                                                        className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-3 py-3 text-white text-sm focus:border-[#3b82f6] outline-none transition-colors placeholder:text-zinc-700 font-mono"
                                                        placeholder="0,00"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Duração (min)</label>
                                                <input
                                                    type="number"
                                                    className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 text-white text-sm focus:border-[#3b82f6] outline-none transition-colors placeholder:text-zinc-700"
                                                    placeholder="30"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#27272a]">
                                            <div>
                                                <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Impostos (%)</label>
                                                <input
                                                    type="number"
                                                    value={taxRate}
                                                    onChange={(e) => setTaxRate(Number(e.target.value))}
                                                    className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-[#a1a1aa] mb-1.5 block">Comissão (%)</label>
                                                <input
                                                    type="number"
                                                    value={commissionRate}
                                                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                                                    className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="h-full">
                                        <ProtocolBuilder onTotalCostChange={handleProtocolCostUpdate} />
                                    </motion.div>
                                )}
                            </div>

                            {/* Footer Buttons */}
                            <div className="p-6 border-t border-[#27272a] bg-[#121214] flex justify-between items-center">
                                <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                                    Cancelar
                                </button>
                                <button className="px-6 py-2.5 text-sm font-medium bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl shadow-lg shadow-blue-500/10 active:scale-95 transition-all">
                                    Salvar Procedimento
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: REAL-TIME ANALYSIS (Fixed Width) */}
                        <div className="w-[320px] flex-shrink-0">
                            <CostAnalysisCard
                                price={price}
                                cost={cost}
                                taxRate={taxRate}
                                commissionRate={commissionRate}
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
