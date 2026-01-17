import { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, Bone, Brain, Activity, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaceMap, BodyMap, ProtocolCanvas } from "@/components/budget/ComposerArea";
import { toast } from "sonner";

export function SpecialtySetup() {
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const [preLoad, setPreLoad] = useState(true);

    const specialties = [
        {
            id: 'dermato',
            label: 'Dermatologia & Estética',
            icon: Stethoscope,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            hoverBorder: 'hover:border-purple-500'
        },
        {
            id: 'ortho',
            label: 'Ortopedia & Fisioterapia',
            icon: Bone,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            hoverBorder: 'hover:border-blue-500'
        },
        {
            id: 'mental',
            label: 'Saúde Mental',
            icon: Brain,
            color: 'text-pink-500',
            bg: 'bg-pink-500/10',
            border: 'border-pink-500/20',
            hoverBorder: 'hover:border-pink-500'
        },
        {
            id: 'general',
            label: 'Clínica Geral / Multi',
            icon: Activity,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            hoverBorder: 'hover:border-emerald-500'
        }
    ];

    const activePreview = hovered || selected || 'dermato';

    return (
        <div className="flex flex-col lg:flex-row h-full">
            {/* LEFT: SELECTION */}
            <div className="flex-1 p-8 border-r border-[#27272a] overflow-y-auto">
                <div className="mb-8">
                    <h2 className="text-xl font-medium text-white">Qual é o foco da sua clínica?</h2>
                    <p className="text-sm text-[#a1a1aa] mt-1">Isso adapta o visual do orçamento e sugere procedimentos.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-8">
                    {specialties.map((spec) => (
                        <button
                            key={spec.id}
                            onClick={() => setSelected(spec.id)}
                            onMouseEnter={() => setHovered(spec.id)}
                            onMouseLeave={() => setHovered(null)}
                            className={cn(
                                "relative w-full p-4 rounded-xl border flex items-center gap-4 text-left transition-all duration-200 group",
                                selected === spec.id
                                    ? `bg-[#18181b] ${spec.border} ring-1 ring-${spec.color.split('-')[1]}-500`
                                    : "bg-[#18181b] border-[#27272a] hover:bg-[#202024]",
                                spec.hoverBorder
                            )}
                        >
                            <div className={cn("p-3 rounded-lg", spec.bg, spec.color)}>
                                <spec.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className={cn("font-medium transition-colors", selected === spec.id ? "text-white" : "text-[#e4e4e7]")}>
                                    {spec.label}
                                </h3>
                            </div>
                            {selected === spec.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={cn("text-emerald-500")}
                                >
                                    <CheckCircle2 size={20} className="fill-emerald-500/20" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Toggle Pre-load */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
                    <div className="pt-0.5">
                        <input
                            type="checkbox"
                            checked={preLoad}
                            onChange={(e) => setPreLoad(e.target.checked)}
                            className="w-4 h-4 rounded border-[#3f3f46] bg-[#27272a] text-[#3b82f6] focus:ring-offset-0 focus:ring-[#3b82f6]"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white mb-0.5">Carregar procedimentos sugeridos?</p>
                        <p className="text-xs text-[#a1a1aa]">Adicionaremos os 50 itens mais comuns da sua área automaticamente.</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#27272a] flex justify-end">
                    <button
                        onClick={() => toast.success("Ambiente configurado com sucesso!")}
                        disabled={!selected}
                        className="px-6 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        Aplicar Configuração
                    </button>
                </div>
            </div>

            {/* RIGHT: PREVIEW AREA */}
            <div className="w-full lg:w-[480px] bg-[#09090b] relative overflow-hidden flex flex-col items-center justify-center p-8 border-l border-[#27272a]">

                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <div className="mb-6 text-center">
                        <p className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Preview do Orçamento</p>
                        <h3 className="text-lg font-medium text-white truncate">
                            {specialties.find(s => s.id === activePreview)?.label || "Selecione uma área"}
                        </h3>
                    </div>

                    <div className="flex-1 w-full flex items-center justify-center pointer-events-none select-none grayscale-[0.5] opacity-80 scale-90 origin-top">
                        {(activePreview === 'dermato') && <FaceMap onAddItem={() => { }} />}
                        {(activePreview === 'ortho') && <BodyMap onAddItem={() => { }} />}
                        {(activePreview === 'mental' || activePreview === 'general') && <ProtocolCanvas onAddItem={() => { }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
