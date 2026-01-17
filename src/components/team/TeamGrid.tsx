import { Mail, MoreHorizontal, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    roleType: 'doctor' | 'reception' | 'esthetician' | 'manager';
    avatar: string;
    status: 'online' | 'busy' | 'offline';
    stats: {
        label: string;
        value: string;
    }[];
}

const TEAM_DATA: TeamMember[] = [
    {
        id: '1',
        name: 'Dr. Thiago M.',
        role: 'Sócio / Dermatologista',
        roleType: 'doctor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thiago',
        status: 'online',
        stats: [
            { label: 'Ticket Médio', value: 'R$ 2.450' },
            { label: 'NPS Pessoal', value: '98/100' }
        ]
    },
    {
        id: '4',
        name: 'Dra. Ana Silva',
        role: 'Biomédica Esteta',
        roleType: 'doctor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana2',
        status: 'busy',
        stats: [
            { label: 'Ticket Médio', value: 'R$ 1.800' },
            { label: 'Retenção', value: '75%' }
        ]
    },
    {
        id: '2',
        name: 'Ana Clara',
        role: 'Concierge / Recepção',
        roleType: 'reception',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
        status: 'online',
        stats: [
            { label: 'Tempo Resp.', value: '2 min' },
            { label: 'Conversão', value: '32%' }
        ]
    },
    {
        id: '3',
        name: 'Carla Dias',
        role: 'Esteticista',
        roleType: 'esthetician',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla',
        status: 'offline',
        stats: [
            { label: 'Avaliações', value: '4.9 ⭐' },
            { label: 'Volume', value: '45/mês' }
        ]
    }
];

export function TeamGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {TEAM_DATA.map(member => (
                <TalentCard key={member.id} member={member} />
            ))}

            {/* Invite Card */}
            <button className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[#27272a] bg-[#121214]/50 p-6 transition-all hover:bg-[#121214] hover:border-[#3f3f46] group">
                <div className="h-16 w-16 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] group-hover:text-white group-hover:bg-[#27272a] transition-colors">
                    <Mail size={24} />
                </div>
                <div className="text-center">
                    <h3 className="text-sm font-medium text-white">Convidar Novo Talento</h3>
                    <p className="text-xs text-[#52525b] mt-1">Enviar convite por e-mail</p>
                </div>
            </button>
        </div>
    );
}

function TalentCard({ member }: { member: TeamMember }) {
    const statusColors = {
        online: "bg-emerald-500",
        busy: "bg-amber-500",
        offline: "bg-zinc-500"
    };

    return (
        <div className="rounded-xl border border-[#27272a] bg-[#121214] p-6 relative group overflow-hidden">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex gap-4">
                    <div className="relative">
                        <img src={member.avatar} alt={member.name} className="h-14 w-14 rounded-full bg-[#18181b] border border-[#27272a]" />
                        <span className={cn("absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#121214]", statusColors[member.status])} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-sm text-[#a1a1aa]">{member.role}</p>
                    </div>
                </div>
                <button className="text-[#52525b] hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Custom Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                {member.stats.map(stat => (
                    <div key={stat.label} className="bg-[#18181b] rounded-lg p-3 border border-[#27272a]">
                        <p className="text-xs text-[#71717a] mb-1">{stat.label}</p>
                        <p className="text-sm font-semibold text-[#f4f4f5]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 relative z-10">
                <button className="flex-1 rounded-lg border border-[#27272a] bg-[#18181b] py-2 text-xs font-medium text-[#f4f4f5] hover:bg-[#27272a] transition-colors">
                    Ver Perfil
                </button>
                <div className="flex gap-2">
                    <button className="rounded-lg border border-[#27272a] bg-[#18181b] p-2 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors">
                        <Mail size={16} />
                    </button>
                    <button className="rounded-lg border border-[#27272a] bg-[#18181b] p-2 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors">
                        <Phone size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
