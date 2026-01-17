import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, Gift, X, Bot, Wand2, Play, Pause, Eye, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// --- TYPES ---
interface Rule {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    icon: any;
    color: string;
    trigger: string;
    action: string;
    aiResponse: boolean; // Does AI handle replies?
}

// --- MOCK PRESETS ---
const PRESETS: Rule[] = [
    {
        id: 'confirm',
        title: 'Confirmação de Agenda',
        description: 'Envia lembrete e processa resposta automática.',
        isActive: true,
        icon: Calendar,
        color: 'bg-blue-500',
        trigger: '24h antes da consulta',
        action: 'Enviar WhatsApp',
        aiResponse: true
    },
    {
        id: 'noshow',
        title: 'Recuperação de Ausência',
        description: 'Tenta reagendar pacientes que faltaram.',
        isActive: false,
        icon: MessageSquare,
        color: 'bg-amber-500',
        trigger: 'Status muda para "Faltou"',
        action: 'Aguardar 2h e Enviar Msg',
        aiResponse: true
    },
    {
        id: 'birthday',
        title: 'Aniversariante VIP',
        description: 'Mimo automático para encantar pacientes.',
        isActive: true,
        icon: Gift,
        color: 'bg-rose-500',
        trigger: 'Aniversário (09:00)',
        action: 'Enviar Voucher R$100',
        aiResponse: false
    }
];

export function AutomationRules() {
    const [rules, setRules] = useState(PRESETS);
    const [editingRule, setEditingRule] = useState<Rule | null>(null);

    const toggleRule = (id: string) => {
        setRules(rules.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
        const rule = rules.find(r => r.id === id);
        if (rule) {
            toast(rule.isActive ? "Regra pausada." : "Regra ativada!", {
                icon: rule.isActive ? <Pause size={14} /> : <Play size={14} className="text-emerald-500" />
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#121214]">
            {/* Header */}
            <div className="p-8 border-b border-[#27272a] flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-medium text-white flex items-center gap-2">
                        <Bot size={20} className="text-purple-500" />
                        Automação Inteligente
                    </h3>
                    <p className="text-sm text-[#a1a1aa] mt-1">Configure como a Cadran conversa com seus pacientes.</p>
                </div>
            </div>

            {/* List */}
            <div className="p-8 grid gap-4">
                {rules.map(rule => (
                    <div key={rule.id} className="group relative bg-[#18181b] border border-[#27272a] rounded-xl p-5 hover:border-[#3f3f46] transition-all flex items-center justify-between">
                        {/* Left: Icon & Info */}
                        <div className="flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center bg-[#27272a] group-hover:bg-[#3f3f46] transition-colors", rule.isActive ? "text-white" : "text-[#52525b]")}>
                                <rule.icon size={24} className={rule.isActive ? rule.color.replace('bg-', 'text-') : ""} />
                            </div>
                            <div>
                                <h4 className={cn("font-medium transition-colors", rule.isActive ? "text-white" : "text-[#71717a]")}>{rule.title}</h4>
                                <p className="text-xs text-[#a1a1aa] mt-0.5">{rule.description}</p>

                                {/* Logic Badge */}
                                <div className="flex items-center gap-2 mt-2 text-[10px] uppercase font-bold tracking-wider text-[#52525b]">
                                    <span className="bg-[#27272a] px-1.5 py-0.5 rounded border border-[#3f3f46]">{rule.trigger}</span>
                                    <MoveRight size={10} />
                                    <span className="bg-[#27272a] px-1.5 py-0.5 rounded border border-[#3f3f46]">{rule.action}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-4">
                            {rule.aiResponse && (
                                <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase">
                                    <Wand2 size={10} />
                                    AI Powered
                                </div>
                            )}

                            <div className="h-8 w-px bg-[#27272a] mx-2" />

                            <button
                                onClick={() => setEditingRule(rule)}
                                className="px-3 py-1.5 text-xs font-medium text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded-lg transition-colors"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => toggleRule(rule.id)}
                                className={cn(
                                    "relative w-11 h-6 rounded-full transition-colors flex items-center px-1 border",
                                    rule.isActive ? "bg-emerald-500 border-emerald-600" : "bg-[#27272a] border-[#3f3f46]"
                                )}
                            >
                                <motion.div
                                    layout
                                    className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"
                                    animate={{ x: rule.isActive ? 20 : 0 }}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Logic Editor Modal */}
            <AnimatePresence>
                {editingRule && (
                    <LogicEditor rule={editingRule} onClose={() => setEditingRule(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}


// --- SUB-COMPONENT: LOGIC EDITOR ---
function LogicEditor({ rule, onClose }: { rule: Rule, onClose: () => void }) {
    const [message, setMessage] = useState("Olá [Nome], tudo bem? Sua consulta está confirmada para [Data] às [Horario]. Posso confirmar?");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-[#09090b] border border-[#27272a] w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl flex overflow-hidden"
            >
                {/* LEFT: Config */}
                <div className="flex-1 flex flex-col min-w-0 border-r border-[#27272a]">
                    <div className="p-6 border-b border-[#27272a] flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className={cn("w-2 h-2 rounded-full", rule.color.replace('bg-', 'bg-'))} />
                                <span className={cn("text-xs font-bold uppercase tracking-wider", rule.color.replace('bg-', 'text-'))}>{rule.title}</span>
                            </div>
                            <h2 className="text-xl font-bold text-white">Editor de Fluxo</h2>
                        </div>
                        <button onClick={onClose} className="text-[#a1a1aa] hover:text-white"><X size={20} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Trigger Section */}
                        <section className="space-y-3">
                            <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                <span className="text-zinc-500 font-mono">01</span> Gatilho (Trigger)
                            </h4>
                            <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-[#a1a1aa] flex justify-between items-center">
                                <span>{rule.trigger}</span>
                                <span className="text-xs bg-[#27272a] px-2 py-1 rounded">Sistema</span>
                            </div>
                        </section>

                        {/* Action Section */}
                        <section className="space-y-3">
                            <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                <span className="text-zinc-500 font-mono">02</span> Mensagem
                            </h4>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full h-32 bg-[#18181b] border border-[#27272a] rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none resize-none leading-relaxed"
                            />
                            <div className="flex flex-wrap gap-2">
                                {['[Nome]', '[Data]', '[Horario]', '[Medico]'].map(chip => (
                                    <button key={chip} className="px-2 py-1 rounded bg-[#27272a] border border-[#3f3f46] text-[10px] text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors">
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* AI Logic Section (Only if enabled) */}
                        {rule.aiResponse && (
                            <section className="space-y-3">
                                <h4 className="text-sm font-medium text-purple-400 flex items-center gap-2">
                                    <Wand2 size={14} /> Inteligência Artificial
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded-lg">
                                        <div>
                                            <p className="text-xs text-white font-medium mb-0.5">Se paciente responder confirmar...</p>
                                            <p className="text-[10px] text-[#52525b]">Keywords: Sim, Confirmado, Ok, Pode ser</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                                            <Calendar size={12} />
                                            Mudar Status: Confirmado
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-[#18181b] border border-[#27272a] rounded-lg">
                                        <div>
                                            <p className="text-xs text-white font-medium mb-0.5">Se paciente quiser remarcar...</p>
                                            <p className="text-[10px] text-[#52525b]">Keywords: Não, Mudar, Cancelar</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                            <Bot size={12} />
                                            Alertar Recepção
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="p-4 border-t border-[#27272a] flex justify-between items-center bg-[#121214]">
                        <button className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-2">
                            <Eye size={16} /> Testar no meu número
                        </button>
                        <button onClick={onClose} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                            Salvar Alterações
                        </button>
                    </div>
                </div >

                {/* RIGHT: Phone Preview */}
                < div className="w-[320px] bg-[#000] p-4 flex flex-col items-center justify-center border-l border-[#27272a] relative" >
                    <div className="w-full h-full bg-[#0c1816] rounded-2xl overflow-hidden border border-[#27272a] flex flex-col">
                        {/* WhatsApp Header */}
                        <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-[#27272a]">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">R</div>
                            <div>
                                <p className="text-sm text-white font-medium leading-none">Cadran Clinic</p>
                                <p className="text-[10px] text-[#8696a0] mt-1">Conta Comercial</p>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10 space-y-3">
                            {/* Message Bubble */}
                            <div className="bg-[#202c33] p-2.5 rounded-lg rounded-tl-none max-w-[90%] self-start shadow-sm border border-[#27272a]/50">
                                <p className="text-sm text-[#d1d7db] whitespace-pre-wrap leading-relaxed">
                                    {message
                                        .replace('[Nome]', 'Ana')
                                        .replace('[Data]', '15/05')
                                        .replace('[Horario]', '14:30')
                                        .replace('[Medico]', 'Dr. Silva')
                                    }
                                </p>
                                <p className="text-[10px] text-[#8696a0] text-right mt-1">10:05</p>
                            </div>
                        </div>
                    </div>
                </div >
            </motion.div >
        </div >
    );
}
