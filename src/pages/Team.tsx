import { useState } from 'react';
import { Shield, Users, UserPlus } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { TeamMetrics } from '@/components/team/TeamMetrics';
import { TeamGrid } from '@/components/team/TeamGrid';
import { PermissionsMatrix } from '@/components/team/PermissionsMatrix';
import { cn } from '@/lib/utils';

export function Team() {
    const [activeTab, setActiveTab] = useState<'talent' | 'permissions'>('talent');

    return (
        <Layout>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Equipe & Performance</h1>
                        <p className="text-sm text-[#a1a1aa]">Gestão de talentos e excelência clínica</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="flex items-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb] shadow-lg shadow-blue-500/20 transition-all"
                        >
                            <UserPlus size={16} />
                            Convidar Membro
                        </button>
                    </div>
                </div>

                {/* Performance HUD (Always Visible) */}
                <TeamMetrics />

                {/* Tabs */}
                <div className="flex border-b border-[#27272a]">
                    <TabButton
                        active={activeTab === 'talent'}
                        onClick={() => setActiveTab('talent')}
                        label="Talentos"
                        icon={Users}
                    />
                    <TabButton
                        active={activeTab === 'permissions'}
                        onClick={() => setActiveTab('permissions')}
                        label="Permissões & Acesso"
                        icon={Shield}
                    />
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'talent' ? <TeamGrid /> : <PermissionsMatrix />}
                </div>
            </div>
        </Layout>
    );
}

function TabButton({ active, onClick, label, icon: Icon }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors",
                active
                    ? "border-[#3b82f6] text-white"
                    : "border-transparent text-[#71717a] hover:border-[#27272a] hover:text-[#a1a1aa]"
            )}
        >
            <Icon size={16} className={cn("transition-colors", active ? "text-[#3b82f6]" : "text-[#52525b] group-hover:text-[#a1a1aa]")} />
            {label}
        </button>
    );
}
