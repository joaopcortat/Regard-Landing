

export function FooterAura() {
    return (
        <footer className="border-t border-slate-900 bg-[#020617] py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-medium tracking-tight">Cadran</span>
                </div>

                <div className="flex gap-6 text-xs text-slate-500">
                    <a href="#" className="hover:text-slate-300 transition-colors">Termos</a>
                    <a href="#" className="hover:text-slate-300 transition-colors">Privacidade</a>
                    <a href="#" className="hover:text-slate-300 transition-colors">Suporte</a>
                </div>

                <p className="text-xs text-slate-600">© 2024 Cadran Health Technologies.</p>
            </div>
        </footer>
    );
}
