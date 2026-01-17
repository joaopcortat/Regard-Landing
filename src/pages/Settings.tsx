import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building, Clock, Stethoscope, Armchair, Puzzle,
    Upload, Plus, CheckCircle2, MessageSquare,
    PenLine, GripVertical, Trash2, Save
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ProcedureModal } from '@/components/settings/ProcedureModal';
import { SpecialtySetup } from '@/components/settings/SpecialtySetup';
import { WhatsappConnectivity } from '@/components/settings/WhatsappConnectivity';
import { AutomationRules } from '@/components/settings/AutomationRules';

export function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Perfil da Clínica', icon: Building },
        { id: 'specialty', label: 'Especialidade', icon: Stethoscope },
        { id: 'procedures', label: 'Procedimentos', icon: CheckCircle2 },
        { id: 'rooms', label: 'Salas & Ativos', icon: Armchair },
        { id: 'hours', label: 'Horários', icon: Clock },
        { id: 'communication', label: 'Comunicação (IA)', icon: MessageSquare },
        { id: 'integrations', label: 'Integrações', icon: Puzzle },
    ];

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-8rem)]">
                {/* LEFT: Navigation */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-1">
                        <h2 className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                            Configurações
                        </h2>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                                    activeTab === tab.id
                                        ? "bg-[#27272a] text-white shadow-sm"
                                        : "text-[#a1a1aa] hover:bg-[#18181b] hover:text-white"
                                )}
                            >
                                <tab.icon size={18} strokeWidth={1.5} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* RIGHT: Content Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#121214] border border-[#27272a] rounded-xl overflow-hidden min-h-[600px]"
                        >
                            {activeTab === 'profile' && <ClinicProfile />}
                            {activeTab === 'specialty' && <SpecialtySetup />}
                            {activeTab === 'specialty' && <SpecialtySetup />}
                            {activeTab === 'procedures' && <ProceduresTab />}
                            {activeTab === 'rooms' && <RoomsTab />}
                            {activeTab === 'communication' && <AutomationRules />}
                            {activeTab === 'integrations' && <WhatsappConnectivity />}
                            {activeTab === 'hours' && <ComingSoon />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    );
}

// --- TAB A: CLINIC PROFILE ---
function ClinicProfile() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-6">
                <div>
                    <h3 className="text-xl font-medium text-white">Identidade da Clínica</h3>
                    <p className="text-sm text-[#a1a1aa] mt-1">Defina como seus pacientes veem sua marca.</p>
                </div>
                <button
                    onClick={() => toast.success("Alterações salvas!")}
                    className="flex items-center gap-2 bg-[#f4f4f5] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                >
                    <Save size={16} /> Salvar
                </button>
            </div>

            {/* Logo Upload */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-[#f4f4f5]">Logo da Clínica</label>
                <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-[#18181b] border-2 border-dashed border-[#3f3f46] flex flex-col items-center justify-center text-[#71717a] hover:border-[#71717a] hover:bg-[#27272a] transition-all cursor-pointer group">
                        <Upload size={20} className="mb-2 group-hover:text-white" />
                        <span className="text-[10px] uppercase font-bold">Upload</span>
                    </div>
                    <div className="text-sm text-[#71717a]">
                        <p>Recomendado: 500x500px, PNG transparente.</p>
                        <p>Será usado em orçamentos e no portal do paciente.</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#f4f4f5]">Nome da Clínica</label>
                    <input
                        type="text"
                        defaultValue="Cadran Clinic"
                        className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#f4f4f5]">CNPJ</label>
                    <input
                        type="text"
                        placeholder="00.000.000/0001-00"
                        className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                </div>
            </div>

            {/* Accent Color */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-[#f4f4f5]">Cor de Destaque (Accent)</label>
                <div className="flex gap-4">
                    {['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'].map(color => (
                        <div key={color} className="relative group cursor-pointer">
                            <div
                                className="w-10 h-10 rounded-full border border-[#27272a] transition-transform group-hover:scale-110"
                                style={{ backgroundColor: color }}
                            />
                            {color === '#3b82f6' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <CheckCircle2 size={16} className="text-white drop-shadow-md" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-[#52525b]">Isso define a cor principal de botões e gráficos.</p>
            </div>
        </div>
    );
}

// --- TAB B: PROCEDURES ---
function ProceduresTab() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Data
    const procedures = [
        { id: 1, name: 'Toxina Botulínica (3 Regiões)', price: 'R$ 1.200', duration: '30 min', color: 'bg-purple-500' },
        { id: 2, name: 'Preenchimento Labial (1ml)', price: 'R$ 1.400', duration: '45 min', color: 'bg-pink-500' },
        { id: 3, name: 'Bioestimulador (Sculptra)', price: 'R$ 2.800', duration: '60 min', color: 'bg-emerald-500' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="p-8 border-b border-[#27272a] flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-medium text-white">Menu de Procedimentos</h3>
                    <p className="text-sm text-[#a1a1aa] mt-1">Gerencie o que aparece na sua agenda e em orçamentos.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#3b82f6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors shadow-lg shadow-blue-900/20"
                >
                    <Plus size={18} /> Novo Procedimento
                </button>
            </div>

            <div className="p-8">
                <div className="rounded-xl border border-[#27272a] overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#18181b] text-[#71717a] font-medium uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Duração</th>
                                <th className="px-6 py-4">Preço Base</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a]">
                            {procedures.map((proc) => (
                                <tr key={proc.id} className="hover:bg-[#18181b] transition-colors group">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${proc.color}`} />
                                        {proc.name}
                                    </td>
                                    <td className="px-6 py-4 text-[#a1a1aa]">{proc.duration}</td>
                                    <td className="px-6 py-4 text-[#f4f4f5]">{proc.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-[#27272a] rounded-lg text-[#a1a1aa] hover:text-white transition-colors">
                                                <PenLine size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProcedureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

// --- TAB C: ROOMS & ASSETS ---
function RoomsTab() {
    const assets = [
        { id: 1, name: 'Sala 1 - Injetáveis', type: 'Room', status: 'Active' },
        { id: 2, name: 'Sala 2 - Laser', type: 'Room', status: 'Active' },
        { id: 3, name: 'Ultraformer III', type: 'Device', status: 'Maintenance' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="p-8 border-b border-[#27272a] flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-medium text-white">Salas & Ativos</h3>
                    <p className="text-sm text-[#a1a1aa] mt-1">Recursos físicos que ocupam agenda.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#27272a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3f3f46] transition-colors border border-[#3f3f46]">
                    <Plus size={18} /> Adicionar
                </button>
            </div>

            <div className="p-8 grid gap-4">
                {assets.map(asset => (
                    <div key={asset.id} className="flex items-center justify-between p-4 rounded-xl border border-[#27272a] bg-[#18181b] hover:border-[#3f3f46] transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-[#27272a] text-[#a1a1aa]">
                                {asset.type === 'Room' ? <Armchair size={20} /> : <GripVertical size={20} />}
                            </div>
                            <div>
                                <h4 className="font-medium text-white">{asset.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-[#71717a]">{asset.type === 'Room' ? 'Sala de Atendimento' : 'Equipamento'}</span>
                                    {asset.status === 'Maintenance' && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Manutenção</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button className="p-2 text-[#a1a1aa] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-[#52525b]">
            <Clock size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Em breve</p>
            <p className="text-sm">Módulo em desenvolvimento.</p>
        </div>
    );
}
