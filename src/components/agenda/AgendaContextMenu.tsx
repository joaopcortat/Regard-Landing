import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, DollarSign, XCircle, FileText, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    danger?: boolean;
    colorClass?: string;
}

function MenuItem({ icon: Icon, label, onClick, danger, colorClass }: MenuItemProps) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-md group",
                danger
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-[#a1a1aa] hover:bg-[#27272a] hover:text-white"
            )}
        >
            <Icon size={16} className={cn("transition-colors", colorClass || (danger ? "text-red-400" : "text-[#71717a] group-hover:text-white"))} />
            <span className="font-medium">{label}</span>
        </button>
    );
}

interface AgendaContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onAction: (action: string) => void;
}

export function AgendaContextMenu({ x, y, onClose, onAction }: AgendaContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleClick); // Close on right-click elsewhere
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleClick);
        };
    }, [onClose]);

    // Adjust position if out of bounds (simple clamp)
    const styleY = y + 200 > window.innerHeight ? y - 200 : y;
    const styleX = x + 200 > window.innerWidth ? x - 200 : x;

    return (
        <div
            style={{ top: styleY, left: styleX }}
            className="fixed z-50 pointer-events-auto"
        >
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="w-56 bg-[#18181b]/95 backdrop-blur-xl border border-[#27272a] rounded-xl shadow-2xl overflow-hidden p-1.5 ring-1 ring-black/50"
            >
                <div className="px-2 py-1.5 mb-1 border-b border-[#27272a]/50">
                    <p className="text-[10px] uppercase font-bold text-[#52525b] tracking-wider">Ações Rápidas</p>
                </div>

                <MenuItem
                    icon={CheckCircle2}
                    label="Realizar Check-in"
                    onClick={() => onAction('check_in')}
                    colorClass="text-emerald-500"
                />
                <MenuItem
                    icon={DollarSign}
                    label="Receber Pagamento"
                    onClick={() => onAction('pay')}
                    colorClass="text-blue-500"
                />
                <MenuItem
                    icon={FileText}
                    label="Ver Prontuário"
                    onClick={() => onAction('profile')}
                />

                <div className="my-1 border-t border-[#27272a]/50" />

                <MenuItem
                    icon={XCircle}
                    label="Cancelar Agendamento"
                    onClick={() => onAction('cancel')}
                    danger
                />
            </motion.div>
        </div>
    );
}
