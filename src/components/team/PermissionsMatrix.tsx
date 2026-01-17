import { Check, X } from 'lucide-react';


const ROLES = ['Admin/Sócio', 'Gerente', 'Médico', 'Recepção'];
const PERMISSIONS = [
    { label: 'Ver Faturamento', access: [true, true, false, false] },
    { label: 'Editar Agenda', access: [true, true, true, true] },
    { label: 'Ver Prontuários', access: [true, true, true, false] },
    { label: 'Cadastrar Produtos', access: [true, true, false, false] },
    { label: 'Configurações do Sistema', access: [true, false, false, false] },
    { label: 'Relatórios de Marketing', access: [true, true, false, false] },
];

export function PermissionsMatrix() {
    return (
        <div className="rounded-xl border border-[#27272a] bg-[#121214] overflow-hidden">
            <div className="p-6 border-b border-[#27272a]">
                <h2 className="text-lg font-semibold text-white">Matriz de Acesso (RBAC)</h2>
                <p className="text-xs text-[#a1a1aa]">Controle granular de permissões por cargo</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase text-[#71717a] bg-[#18181b]">
                        <tr>
                            <th className="px-6 py-4 font-medium w-1/3">Permissão</th>
                            {ROLES.map(role => (
                                <th key={role} className="px-6 py-4 font-medium text-center">{role}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272a]">
                        {PERMISSIONS.map((perm, idx) => (
                            <tr key={idx} className="hover:bg-[#18181b] transition-colors group">
                                <td className="px-6 py-4 font-medium text-[#f4f4f5]">{perm.label}</td>
                                {perm.access.map((hasAccess, roleIdx) => (
                                    <td key={roleIdx} className="px-6 py-4 text-center">
                                        <div className="flex justify-center">
                                            {hasAccess ? (
                                                <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Check size={14} />
                                                </div>
                                            ) : (
                                                <div className="h-6 w-6 rounded-full bg-[#27272a] flex items-center justify-center text-[#52525b]">
                                                    <X size={14} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-[#18181b]/50 border-t border-[#27272a] text-center">
                <button className="text-sm font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors">
                    Gerenciar Cargos Personalizados →
                </button>
            </div>
        </div>
    );
}
