import { useState, useEffect } from 'react';
import {
    Clock, ChevronRight, History, Pill, Image as ImageIcon,
    Printer, Send, FileText, ChevronLeft,
    Search, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function ConsultationPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('history');
    const [elapsedTime, setElapsedTime] = useState('12:30');
    const [slashMenuOpen, setSlashMenuOpen] = useState(false);
    const [editorContent, setEditorContent] = useState('');

    // Mock Timer
    useEffect(() => {
        const interval = setInterval(() => {
            // Just a mock update logic for demo
            setElapsedTime(prev => {
                const [min, sec] = prev.split(':').map(Number);
                let newSec = sec + 1;
                let newMin = min;
                if (newSec === 60) { newSec = 0; newMin++; }
                return `${newMin.toString().padStart(2, '0')}:${newSec.toString().padStart(2, '0')}`;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setEditorContent(val);
        if (val.endsWith('/')) {
            setSlashMenuOpen(true);
        } else {
            setSlashMenuOpen(false);
        }
    };

    const insertTemplate = (text: string) => {
        setEditorContent(prev => prev.replace('/', '') + text);
        setSlashMenuOpen(false);
        toast.info("Template inserido", { icon: <FileText size={16} /> });
    };

    return (
        <div className="flex h-screen bg-[#09090b] overflow-hidden font-sans">

            {/* 1. CENTER: ZEN CANVAS */}
            <main className="flex-1 flex flex-col relative h-full transition-all duration-300">

                {/* Header (Zen) */}
                <header className="h-16 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4">
                        <button className="p-2 -ml-2 text-[#71717a] hover:text-white transition-colors rounded-lg hover:bg-[#18181b]">
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center gap-3">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda" className="w-8 h-8 rounded-full bg-[#27272a]" alt="Avatar" />
                            <div>
                                <h1 className="text-sm font-semibold text-white">Fernanda Vasconcellos, 32</h1>
                                <p className="text-xs text-[#a1a1aa]">Retorno de 15 dias (Botox)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
                            <Clock size={14} className="text-[#3b82f6] animate-pulse" />
                            <span className="text-xs font-mono">{elapsedTime}</span>
                        </div>
                        <button
                            onClick={() => toast.success("Atendimento finalizado!")}
                            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Finalizar Atendimento
                        </button>
                    </div>
                </header>

                {/* The Paper (Editor) */}
                <div className="flex-1 overflow-y-auto flex justify-center p-8 relative">
                    <div className="w-full max-w-3xl bg-[#121214] min-h-[800px] h-fit shadow-2xl shadow-black/50 rounded-xl p-12 border border-[#27272a] relative">
                        {/* Editor Date */}
                        <p className="text-xs font-medium text-[#52525b] uppercase tracking-wider mb-8">
                            14 de Janeiro de 2026 • 15:30
                        </p>

                        <textarea
                            value={editorContent}
                            onChange={handleEditorChange}
                            placeholder="Comece a digitar a evolução..."
                            className="w-full h-full bg-transparent border-none focus:ring-0 text-[#d4d4d8] text-lg leading-relaxed placeholder:text-[#3f3f46] resize-none font-serif outline-none"
                            style={{ minHeight: '600px' }}
                            autoFocus
                        />

                        {/* Slash Menu Sim */}
                        <AnimatePresence>
                            {slashMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-32 left-12 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl w-64 overflow-hidden z-20"
                                >
                                    <div className="p-2">
                                        <p className="px-2 py-1 text-[10px] font-medium text-[#52525b] uppercase">Templates</p>
                                        <button onClick={() => insertTemplate("paciente relata melhora significativa...")} className="w-full text-left px-2 py-1.5 text-sm text-[#a1a1aa] hover:bg-[#27272a] hover:text-white rounded flex items-center gap-2">
                                            <FileText size={14} /> Anamnese Padrão
                                        </button>
                                        <button onClick={() => insertTemplate("# Procedimento: Botox Full Face\n- Região: Glabela (20U)\n- Região: Testa (10U)")} className="w-full text-left px-2 py-1.5 text-sm text-[#a1a1aa] hover:bg-[#27272a] hover:text-white rounded flex items-center gap-2">
                                            <FileText size={14} /> Botox Full Face
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* AI Widget (Bottom Center) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex items-center gap-3 px-4 py-2 bg-[#09090b]/90 backdrop-blur-xl border border-[#27272a] rounded-full shadow-2xl shadow-blue-900/10">
                        {/* Waveform Animation */}
                        <div className="flex items-center gap-0.5 h-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [4, 12, 4] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                    className="w-0.5 bg-[#3b82f6] rounded-full"
                                />
                            ))}
                        </div>
                        <span className="text-xs font-medium text-[#e4e4e7]">Cadran AI ouvindo...</span>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="absolute bottom-6 right-8 flex gap-3 z-20">
                    <button className="p-3 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6] transition-colors shadow-lg">
                        <Printer size={18} />
                    </button>
                    <button className="p-3 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6] transition-colors shadow-lg">
                        <Send size={18} />
                    </button>
                </div>

            </main>

            {/* 3. SIDE KICK (Right Sidebar) */}
            <aside
                className={cn(
                    "bg-[#121214] border-l border-[#27272a] transition-all duration-300 flex flex-col",
                    sidebarOpen ? "w-80" : "w-12 border-none bg-transparent"
                )}
            >
                {/* Toggle */}
                <div className={cn("flex items-center p-4 border-b border-[#27272a]", !sidebarOpen && "justify-center border-none p-2 mt-2")}>
                    {sidebarOpen ? (
                        <>
                            <h2 className="text-xs font-bold text-[#71717a] uppercase tracking-wider flex-1">Auxiliar</h2>
                            <button onClick={() => setSidebarOpen(false)} className="text-[#52525b] hover:text-white"><ChevronRight size={16} /></button>
                        </>
                    ) : (
                        <button onClick={() => setSidebarOpen(true)} className="text-[#a1a1aa] hover:text-white bg-[#18181b] p-2 rounded-lg border border-[#27272a]"><ChevronLeft size={16} /></button>
                    )}
                </div>

                {sidebarOpen && (
                    <>
                        {/* Tabs */}
                        <div className="flex border-b border-[#27272a]">
                            <button
                                onClick={() => setActiveTab('history')}
                                className={cn("flex-1 py-3 text-xs font-medium transition-colors border-b-2", activeTab === 'history' ? "text-[#3b82f6] border-[#3b82f6] bg-[#3b82f6]/5" : "text-[#71717a] border-transparent hover:text-[#d4d4d8]")}
                            >
                                <History size={14} className="mx-auto mb-1" />
                                Histórico
                            </button>
                            <button
                                onClick={() => setActiveTab('rx')}
                                className={cn("flex-1 py-3 text-xs font-medium transition-colors border-b-2", activeTab === 'rx' ? "text-[#3b82f6] border-[#3b82f6] bg-[#3b82f6]/5" : "text-[#71717a] border-transparent hover:text-[#d4d4d8]")}
                            >
                                <Pill size={14} className="mx-auto mb-1" />
                                Receita
                            </button>
                            <button
                                onClick={() => setActiveTab('images')}
                                className={cn("flex-1 py-3 text-xs font-medium transition-colors border-b-2", activeTab === 'images' ? "text-[#3b82f6] border-[#3b82f6] bg-[#3b82f6]/5" : "text-[#71717a] border-transparent hover:text-[#d4d4d8]")}
                            >
                                <ImageIcon size={14} className="mx-auto mb-1" />
                                Imagens
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {activeTab === 'history' && (
                                <div className="space-y-6 relative">
                                    <div className="absolute left-2 top-0 bottom-0 w-px bg-[#27272a]" />
                                    {[1, 2].map(i => (
                                        <div key={i} className="relative pl-6">
                                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#18181b] border-2 border-[#3f3f46] z-10" />
                                            <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a]">
                                                <p className="text-xs text-[#52525b] mb-1">10 Dez 2025</p>
                                                <p className="text-sm text-[#e4e4e7] font-medium">Aplicação de Toxina Botulínica</p>
                                                <p className="text-xs text-[#a1a1aa] mt-2 line-clamp-2">Paciente queixou-se de rugas na região da testa. Aplicado 50U de Dysport.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'rx' && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525b]" />
                                        <input type="text" placeholder="Buscar medicamento..." className="w-full bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#3b82f6] placeholder:text-[#52525b]" />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-[#52525b] uppercase tracking-wider">Em uso</p>
                                        <div className="flex flex-col gap-2">
                                            <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a] flex justify-between items-start group hover:border-[#3b82f6] transition-colors cursor-pointer">
                                                <div>
                                                    <p className="text-sm text-[#e4e4e7] font-medium">Dipirona Monohidratada</p>
                                                    <p className="text-xs text-[#a1a1aa]">500mg • 1cp a cada 6h</p>
                                                </div>
                                                <button className="text-[#a1a1aa] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Plus size={16} className="rotate-45" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'images' && (
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-[#27272a] rounded-xl h-32 flex flex-col items-center justify-center text-[#52525b] hover:border-[#71717a] hover:bg-[#18181b] transition-all cursor-pointer">
                                        <ImageIcon size={24} className="mb-2 opacity-50" />
                                        <span className="text-xs">Arraste fotos aqui</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
