import { useState, useEffect } from 'react';
import { Search, Trash2, Package } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

// Mock Inventory Database
const INVENTORY_DB = [
    { id: '1', name: 'Botox (Toxina Botulínica) 100U', unit: 'Frasco', cost: 600.00 },
    { id: '2', name: 'Dysport 500U', unit: 'Frasco', cost: 1200.00 },
    { id: '3', name: 'Ác. Hialurônico Restylane 1ml', unit: 'Seringa', cost: 450.00 },
    { id: '4', name: 'Seringa 1ml BD', unit: 'Unidade', cost: 1.50 },
    { id: '5', name: 'Agulha 30G', unit: 'Unidade', cost: 0.80 },
    { id: '6', name: 'Luva Nitrílica (Par)', unit: 'Par', cost: 1.20 },
    { id: '7', name: 'Gaze Estéril (Pacote)', unit: 'Pacote', cost: 0.50 },
    { id: '8', name: 'Lidocaína Pomada', unit: 'Aplicação', cost: 5.00 },
];

export interface ProtocolItem {
    id: string; // unique ID for the row
    inventoryId: string;
    name: string;
    unit: string;
    unitCost: number;
    quantity: number;
    totalCost: number;
}

interface ProtocolBuilderProps {
    onTotalCostChange: (total: number) => void;
}

export function ProtocolBuilder({ onTotalCostChange }: ProtocolBuilderProps) {
    const [items, setItems] = useState<ProtocolItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Calculate total whenever items change
    useEffect(() => {
        const total = items.reduce((acc, item) => acc + item.totalCost, 0);
        onTotalCostChange(total);
    }, [items, onTotalCostChange]);

    const handleAddItem = (inventoryItem: typeof INVENTORY_DB[0]) => {
        const newItem: ProtocolItem = {
            id: Math.random().toString(36).substr(2, 9),
            inventoryId: inventoryItem.id,
            name: inventoryItem.name,
            unit: inventoryItem.unit,
            unitCost: inventoryItem.cost,
            quantity: 1,
            totalCost: inventoryItem.cost
        };
        setItems([...items, newItem]);
        setSearchTerm('');
        setIsSearching(false);
    };

    const handleUpdateQuantity = (id: string, newQty: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: newQty,
                    totalCost: newQty * item.unitCost
                };
            }
            return item;
        }));
    };

    const handleRemove = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    const filteredInventory = INVENTORY_DB.filter(i =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !items.some(existing => existing.inventoryId === i.id)
    );

    return (
        <div className="h-full flex flex-col">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-white mb-2">Ficha Técnica (Insumos)</h3>
                <p className="text-xs text-zinc-500 mb-4">
                    Adicione os materiais consumidos neste procedimento para calcular o custo exato.
                </p>

                {/* Search Bar */}
                <div className="relative z-20">
                    <Search className="absolute left-3 top-2.5 text-zinc-500" size={14} />
                    <input
                        type="text"
                        placeholder="Buscar item no estoque... (ex: Botox, Seringa)"
                        className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-[#3b82f6] outline-none placeholder:text-zinc-600"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setIsSearching(true); }}
                        onFocus={() => setIsSearching(true)}
                        onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                    />

                    {/* Dropdown Results */}
                    <AnimatePresence>
                        {isSearching && searchTerm.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto"
                            >
                                {filteredInventory.length === 0 ? (
                                    <div className="p-3 text-xs text-zinc-500 text-center">Nenhum item encontrado.</div>
                                ) : (
                                    filteredInventory.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleAddItem(item)}
                                            className="w-full text-left p-2 hover:bg-[#27272a] flex items-center justify-between group transition-colors"
                                        >
                                            <span className="text-sm text-zinc-300 group-hover:text-white">{item.name}</span>
                                            <span className="text-xs text-zinc-500">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.cost)} / {item.unit}
                                            </span>
                                        </button>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Protocol List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                {items.length === 0 ? (
                    <div className="h-40 flex flex-col items-center justify-center border border-dashed border-[#27272a] rounded-xl bg-[#121214]/50">
                        <Package size={24} className="text-zinc-700 mb-2" />
                        <p className="text-sm text-zinc-500">Nenhum insumo adicionado.</p>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {items.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center gap-3 p-3 bg-[#18181b] border border-[#27272a] rounded-lg group"
                            >
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-zinc-200">{item.name}</div>
                                    <div className="text-[10px] text-zinc-500">
                                        Custo Unit: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.unitCost)}
                                    </div>
                                </div>

                                {/* Quantity Control */}
                                <div className="flex items-center gap-2 bg-[#121214] rounded px-2 py-1 border border-[#27272a]">
                                    <input
                                        type="number"
                                        min="0.1"
                                        step="0.1"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                                        className="w-12 bg-transparent text-right text-sm text-white focus:outline-none"
                                    />
                                    <span className="text-[10px] text-zinc-500 select-none pb-0.5">{item.unit}s</span>
                                </div>

                                <div className="w-20 text-right text-sm font-medium text-[#f4f4f5]">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.totalCost)}
                                </div>

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="p-1.5 text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Automation Toggle */}
            <div className="mt-4 pt-4 border-t border-[#27272a]">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-9 h-5 bg-[#27272a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </div>
                    <div>
                        <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Baixa automática de estoque</span>
                        <p className="text-[10px] text-zinc-500">Deduzir itens ao finalizar atendimento.</p>
                    </div>
                </label>
            </div>
        </div>
    );
}
