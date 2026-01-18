import { Copyright } from 'lucide-react';

export function TrustFooter() {
    return (
        <footer className="py-12 border-t border-white/5 bg-[#050505] relative overflow-hidden">
            {/* Footer Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-2xl font-bold text-white tracking-tight">CADRAN</span>
                    <p className="text-sm text-gray-500 font-medium">Ecossistema do Médico Gestor</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5">
                    <Copyright size={14} className="text-gray-500" />
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Originality 2025</span>
                </div>
            </div>
        </footer>
    );
}
