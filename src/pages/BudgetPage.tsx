import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { BudgetReceipt } from "@/components/budget/BudgetReceipt";
import { ComposerArea } from "@/components/budget/ComposerArea";
import { motion } from "framer-motion";
import { ChevronDown, Stethoscope, Bone, Activity } from "lucide-react";

export function BudgetPage() {
    const [specialty, setSpecialty] = useState<'dermato' | 'ortho' | 'general'>('dermato');
    const [budgetItems, setBudgetItems] = useState<any[]>([]);

    const addItem = (item: any) => {
        setBudgetItems(prev => {
            const existing = prev.find(i => i.name === item.name);
            if (existing) {
                return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, id: Date.now(), qty: 1 }];
        });
    };

    const removeItem = (id: number) => {
        setBudgetItems(prev => prev.filter(i => i.id !== id));
    };

    const updateQty = (id: number, delta: number) => {
        setBudgetItems(prev => prev.map(i => {
            if (i.id === id) {
                const newQty = Math.max(1, i.qty + delta);
                return { ...i, qty: newQty };
            }
            return i;
        }));
    };

    return (
        <Layout>
            <div className="flex flex-col h-[calc(100vh-6rem)] rounded-xl overflow-hidden border border-[#27272a] shadow-2xl">
                {/* TOOLBAR (Context Switcher) */}
                <div className="h-10 bg-[#121214] border-b border-[#27272a] flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#52525b] uppercase tracking-wider">Modo de Especialidade</span>

                        <div className="relative group">
                            <button className="flex items-center gap-2 text-xs font-medium text-[#e4e4e7] hover:text-white bg-[#18181b] border border-[#27272a] px-2 py-1 rounded transition-colors">
                                {specialty === 'dermato' && <><Stethoscope size={12} className="text-purple-500" /> Dermatologia</>}
                                {specialty === 'ortho' && <><Bone size={12} className="text-blue-500" /> Ortopedia</>}
                                {specialty === 'general' && <><Activity size={12} className="text-emerald-500" /> Clínico Geral</>}
                                <ChevronDown size={12} className="opacity-50" />
                            </button>

                            {/* Dropdown */}
                            <div className="absolute top-full left-0 mt-1 w-40 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl overflow-hidden z-50 hidden group-hover:block pb-1">
                                <div className="px-2 py-1.5 text-[10px] text-[#52525b] uppercase font-bold tracking-wider bg-[#09090b]">Selecionar Contexto</div>
                                <button onClick={() => setSpecialty('dermato')} className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#a1a1aa] hover:text-white hover:bg-[#27272a] text-left">
                                    <Stethoscope size={12} className="text-purple-500" /> Dermatologia
                                </button>
                                <button onClick={() => setSpecialty('ortho')} className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#a1a1aa] hover:text-white hover:bg-[#27272a] text-left">
                                    <Bone size={12} className="text-blue-500" /> Ortopedia
                                </button>
                                <button onClick={() => setSpecialty('general')} className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#a1a1aa] hover:text-white hover:bg-[#27272a] text-left">
                                    <Activity size={12} className="text-emerald-500" /> Clínico Geral
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WORKSPACE Split View */}
                <div className="flex-1 flex overflow-hidden">
                    {/* LEFT: Composer (Map/Canvas) */}
                    <div className="flex-1 relative">
                        <ComposerArea specialty={specialty} onAddItem={addItem} />

                        {/* Contextual Upsell Widget */}
                        <motion.div
                            key={specialty}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-6 left-6 p-4 rounded-xl bg-[#18181b]/90 backdrop-blur border border-[#27272a] max-w-xs shadow-xl pointer-events-none"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Activity size={14} className="text-emerald-500" />
                                <span className="text-xs font-bold text-white uppercase">Sugestão Inteligente</span>
                            </div>
                            <p className="text-xs text-[#a1a1aa]">
                                {specialty === 'dermato' && "Paciente realizou Botox há 6 meses. Sugerir renovação + Skincare Kit."}
                                {specialty === 'ortho' && "Diagnóstico de dor articular. Sugerir pacote de 10 sessões de Fisioterapia."}
                                {specialty === 'general' && "Homem, 45 anos. Sugerir Check-up Cardiológico preventivo."}
                            </p>
                        </motion.div>
                    </div>

                    {/* RIGHT: Receipt Panel */}
                    <div className="w-[380px] flex-shrink-0 z-20">
                        <BudgetReceipt
                            items={budgetItems}
                            onRemove={removeItem}
                            onUpdateQty={updateQty}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
