import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PatientSummary {
    id: string;
    name: string;
    avatar?: string;
    lastVisit: string; // e.g. "Há 2 meses"
    nextVisit?: string;
    status: 'treatment' | 'maintenance' | 'discharged';
}

const MOCK_PATIENTS: PatientSummary[] = [
    {
        id: '1',
        name: 'Fernanda Vasconcellos',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda',
        lastVisit: 'Há 2 semanas',
        nextVisit: '14 Jan',
        status: 'treatment'
    },
    {
        id: '2',
        name: 'Ricardo Mendes',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo',
        lastVisit: 'Há 5 dias',
        nextVisit: '15 Jan',
        status: 'treatment'
    },
    {
        id: '3',
        name: 'Mariana Costa',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
        lastVisit: 'Há 3 meses',
        status: 'maintenance'
    },
    {
        id: '4',
        name: 'Carlos Eduardo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        lastVisit: 'Há 6 meses',
        status: 'discharged'
    }
];

interface PatientListProps {
    onSelect: (id: string) => void;
    selectedId: string | null;
}

export function PatientList({ onSelect, selectedId }: PatientListProps) {
    const [search, setSearch] = useState('');

    const filtered = MOCK_PATIENTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex w-96 flex-col border-r border-[#27272a] bg-[#09090b]">
            <div className="p-4 border-b border-[#27272a]">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-[#52525b]" size={16} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, CPF..."
                        className="w-full rounded-lg border border-[#27272a] bg-[#121214] py-2 pl-9 pr-3 text-sm text-white placeholder:text-[#52525b] focus:border-[#3b82f6] focus:outline-none transition-colors"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <button className="flex items-center gap-1 text-xs font-medium text-[#a1a1aa] hover:text-white transition-colors">
                        <Filter size={12} /> Filtros
                    </button>
                    <span className="text-xs text-[#52525b]">{filtered.length} Pacientes</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filtered.map(patient => (
                    <div
                        key={patient.id}
                        onClick={() => onSelect(patient.id)}
                        className={cn(
                            "group flex cursor-pointer items-center gap-4 px-4 py-4 transition-colors hover:bg-[#121214]",
                            selectedId === patient.id ? "bg-[#121214] border-l-2 border-[#3b82f6]" : "border-l-2 border-transparent"
                        )}
                    >
                        <div className="relative">
                            <img src={patient.avatar} alt={patient.name} className="h-10 w-10 rounded-full bg-[#27272a]" />
                            {patient.status === 'treatment' && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#09090b]" />}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h4 className={cn("truncate text-sm font-medium transition-colors", selectedId === patient.id ? "text-white" : "text-[#d4d4d8] group-hover:text-white")}>
                                {patient.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                                <p className="text-xs text-[#71717a]">
                                    {patient.nextVisit ? `Próx: ${patient.nextVisit}` : `Últ: ${patient.lastVisit}`}
                                </p>
                                {patient.status === 'treatment' && (
                                    <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-500 hidden xl:inline-block">
                                        Ativo
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
