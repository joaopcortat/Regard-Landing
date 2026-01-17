import { LayoutDashboard, Calendar, Users, Wallet, Box, Stethoscope, Settings, MessageSquare, TrendingUp, Receipt, Heart, Activity, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Logo } from '../brand/Logo';
import { NavLink } from 'react-router-dom';


interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const menuItems = [
        { label: 'Visão Geral', icon: LayoutDashboard, path: '/' },
        { label: 'Agenda', icon: Calendar, path: '/agenda' },
        { label: 'Mensagens', icon: MessageSquare, path: '/mensagens' },
        { label: 'Pacientes', icon: Users, path: '/pacientes' },
        { label: 'Care', icon: Heart, path: '/care' },
        { label: 'Captação', icon: TrendingUp, path: '/captacao' },
        { label: 'Financeiro', icon: Wallet, path: '/financeiro' },
        { label: 'Orçamentos', icon: Receipt, path: '/orcamentos' },
        { label: 'Simulador', icon: Activity, path: '/simulador' },
        { label: 'Estoque', icon: Box, path: '/estoque' },
    ];

    const footerItems = [
        { label: 'Equipe', icon: Stethoscope, path: '/equipe' },
        { label: 'Configurações', icon: Settings, path: '/configuracoes' },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-screen w-64 border-r border-[#27272a] bg-[#09090b] transition-transform duration-300 lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Brand */}
                    <div className="p-6 flex items-center justify-between">
                        <Logo />
                        {/* Mobile Close Button */}
                        <button onClick={onClose} className="lg:hidden text-[#a1a1aa] hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Main Menu */}
                    <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                onClick={() => onClose?.()} // Close sidebar on mobile navigation
                                className={({ isActive }) => cn(
                                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-[#18181b] text-white shadow-sm border border-[#27272a]"
                                        : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]/50"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon
                                            size={18}
                                            strokeWidth={1.5}
                                            className={cn("transition-colors", isActive ? "text-[#3b82f6]" : "text-[#71717a] group-hover:text-white")}
                                        />
                                        <span className="flex-1">{item.label}</span>
                                        {isActive && <div className="absolute left-0 w-1 h-5 bg-[#3b82f6] rounded-r-full" />}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer Group */}
                    <div className="mt-auto space-y-1 pt-6 pb-6 px-3 border-t border-[#27272a]">
                        {footerItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                onClick={() => onClose?.()}
                                className={({ isActive }) => cn(
                                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-[#18181b] text-white"
                                        : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]/50"
                                )}
                            >
                                <item.icon size={18} strokeWidth={1.5} className="text-[#71717a]" />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}
