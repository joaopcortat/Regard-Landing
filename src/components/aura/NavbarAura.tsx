

export function NavbarAura({ onStart }: { onStart: () => void }) {
    return (
        <nav className="fixed w-full z-50 top-0 border-b border-slate-800/50 bg-[#030712]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-slate-100 font-medium tracking-tight text-lg">Cadran</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#features" className="hover:text-slate-100 transition-colors">Soluções</a>
                    <a href="#simulator" className="hover:text-slate-100 transition-colors">Simulador</a>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={onStart} className="text-xs font-medium bg-slate-100 text-slate-900 px-4 py-2 rounded-full hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer">
                        Iniciar Diagnóstico
                    </button>
                </div>
            </div>
        </nav>
    );
}
